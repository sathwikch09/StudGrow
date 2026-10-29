Add-Type -AssemblyName System.Drawing

function Draw-Sparkle {
    param(
        [System.Drawing.Graphics]$g,
        [float]$cx,
        [float]$cy,
        [float]$size,
        [System.Drawing.Brush]$brush
    )

    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $half = $size / 2.0
    $inner = $size * 0.18

    # 4-pointed star with smooth concave curves
    # Top point, inner right, right point, inner bottom, bottom point, inner left, left point, inner top
    $pts = @(
        [System.Drawing.PointF]::new($cx, $cy - $half),
        [System.Drawing.PointF]::new($cx + $inner, $cy - $inner),
        [System.Drawing.PointF]::new($cx + $half, $cy),
        [System.Drawing.PointF]::new($cx + $inner, $cy + $inner),
        [System.Drawing.PointF]::new($cx, $cy + $half),
        [System.Drawing.PointF]::new($cx - $inner, $cy + $inner),
        [System.Drawing.PointF]::new($cx - $half, $cy),
        [System.Drawing.PointF]::new($cx - $inner, $cy - $inner)
    )

    $path.AddClosedCurve($pts, 0.5)
    $g.FillPath($brush, $path)
}

function Generate-Icon {
    param(
        [int]$size,
        [string]$outputPath,
        [bool]$maskable = $false,
        [bool]$rounded = $true
    )

    $bmp = New-Object System.Drawing.Bitmap($size, $size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $c1 = [System.Drawing.ColorTranslator]::FromHtml("#4338CA") # Deep Indigo
    $c2 = [System.Drawing.ColorTranslator]::FromHtml("#7C3AED") # Vibrant Violet
    $c3 = [System.Drawing.ColorTranslator]::FromHtml("#06B6D4") # Cyan accent

    $rect = New-Object System.Drawing.RectangleF(0, 0, $size, $size)

    if ($maskable) {
        # Maskable must cover full bleed rectangle
        $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
            [System.Drawing.PointF]::new(0, 0),
            [System.Drawing.PointF]::new($size, $size),
            $c1, $c2
        )
        $g.FillRectangle($bgBrush, $rect)

        # Center subtle glow circle
        $glowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(40, 255, 255, 255))
        $g.FillEllipse($glowBrush, [float]($size * 0.15), [float]($size * 0.15), [float]($size * 0.7), [float]($size * 0.7))

        # Main sparkle comfortably inside safe zone (within 70% of size)
        $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
        Draw-Sparkle -g $g -cx ($size * 0.48) -cy ($size * 0.52) -size ($size * 0.46) -brush $whiteBrush

        # Top-right smaller sparkle
        $cyanBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#E0E7FF"))
        Draw-Sparkle -g $g -cx ($size * 0.72) -cy ($size * 0.30) -size ($size * 0.20) -brush $cyanBrush

        # Bottom-left tiny sparkle
        Draw-Sparkle -g $g -cx ($size * 0.28) -cy ($size * 0.72) -size ($size * 0.12) -brush $cyanBrush
    } else {
        # For standard icons: clear background + rounded card
        $g.Clear([System.Drawing.Color]::Transparent)

        $pad = [float]($size * 0.04)
        $cardSize = [float]($size - $pad * 2)
        $radius = [float]($cardSize * 0.22)

        $cardPath = New-Object System.Drawing.Drawing2D.GraphicsPath
        $d = $radius * 2
        $cardPath.AddArc($pad, $pad, $d, $d, 180, 90)
        $cardPath.AddArc($pad + $cardSize - $d, $pad, $d, $d, 270, 90)
        $cardPath.AddArc($pad + $cardSize - $d, $pad + $cardSize - $d, $d, $d, 0, 90)
        $cardPath.AddArc($pad, $pad + $cardSize - $d, $d, $d, 90, 90)
        $cardPath.CloseFigure()

        $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
            [System.Drawing.PointF]::new($pad, $pad),
            [System.Drawing.PointF]::new($pad + $cardSize, $pad + $cardSize),
            $c1, $c2
        )
        $g.FillPath($bgBrush, $cardPath)

        # Subtle inner highlight border
        $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(60, 255, 255, 255), [float]($size * 0.015))
        $g.DrawPath($pen, $cardPath)

        # Center glow
        $glowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(35, 255, 255, 255))
        $g.FillEllipse($glowBrush, [float]($size * 0.2), [float]($size * 0.2), [float]($size * 0.6), [float]($size * 0.6))

        # Main sparkle
        $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
        Draw-Sparkle -g $g -cx ($size * 0.47) -cy ($size * 0.53) -size ($size * 0.50) -brush $whiteBrush

        # Top-right smaller sparkle
        $cyanBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#E0E7FF"))
        Draw-Sparkle -g $g -cx ($size * 0.73) -cy ($size * 0.28) -size ($size * 0.22) -brush $cyanBrush

        # Bottom-left tiny sparkle
        Draw-Sparkle -g $g -cx ($size * 0.25) -cy ($size * 0.74) -size ($size * 0.13) -brush $cyanBrush
    }

    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
    Write-Host "Generated: $outputPath ($size x $size)"
}

Generate-Icon -size 512 -outputPath "public/icons/icon-512.png" -maskable $false
Generate-Icon -size 192 -outputPath "public/icons/icon-192.png" -maskable $false
Generate-Icon -size 512 -outputPath "public/icons/icon-maskable-512.png" -maskable $true
Generate-Icon -size 180 -outputPath "public/icons/apple-touch-icon.png" -maskable $false
