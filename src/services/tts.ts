// Text to speech helper using Web Speech API
export function speakText(text: string, lang: 'en' | 'te' | 'hi' = 'en', onEnd?: () => void) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  // Strip markdown or heavy symbols
  const cleanText = text.replace(/[*_#`[\]()]/g, ' ').replace(/\s+/g, ' ').trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Set appropriate language tag
  const langTag = lang === 'te' ? 'te-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
  utterance.lang = langTag;
  utterance.rate = 0.95; // slightly slower for clear comprehension by students
  utterance.pitch = 1.05; // warm, friendly tone

  // Attempt to select native or Google voices
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(langTag.slice(0, 2)));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
