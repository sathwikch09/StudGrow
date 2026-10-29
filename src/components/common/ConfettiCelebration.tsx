import confetti from 'canvas-confetti';

export function triggerConfettiCelebration() {
  // Fire multi-stage celebratory confetti
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#4F46E5', '#8B5CF6', '#14B8A6'],
  });
  fire(0.2, {
    spread: 60,
    colors: ['#22C55E', '#F59E0B', '#EC4899'],
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    colors: ['#6366F1', '#A855F7'],
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
