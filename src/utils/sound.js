let ctx = null;

function getCtx() {
  if (!ctx) {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, startOffset, duration, gainVal = 0.28, type = 'sine') {
  try {
    const ac = getCtx();
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.connect(g);
    g.connect(ac.destination);
    osc.type = type;
    osc.frequency.value = freq;
    const t = ac.currentTime + startOffset;
    g.gain.setValueAtTime(gainVal, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + duration);
    osc.start(t);
    osc.stop(t + duration + 0.01);
  } catch {
    // Ignore audio errors (e.g. browser autoplay restrictions)
  }
}

export function playCorrect() {
  tone(523.25, 0,    0.12);
  tone(659.25, 0.1,  0.12);
  tone(783.99, 0.2,  0.28);
}

export function playIncorrect() {
  tone(350, 0,    0.1,  0.18);
  tone(300, 0.13, 0.22, 0.12);
}

export function playTap() {
  tone(440, 0, 0.07, 0.12);
}
