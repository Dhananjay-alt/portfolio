"use client";

/**
 * Tiny Web Audio "UI sound" engine — no audio files. Generates short,
 * subtle blips on demand. Lazily creates a single AudioContext on first use.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

type Blip = { freq: number; duration: number; type: OscillatorType; gain: number };

const SOUNDS: Record<string, Blip[]> = {
  hover: [{ freq: 620, duration: 0.04, type: "sine", gain: 0.03 }],
  click: [{ freq: 420, duration: 0.06, type: "triangle", gain: 0.05 }],
  success: [
    { freq: 523.25, duration: 0.09, type: "sine", gain: 0.06 },
    { freq: 783.99, duration: 0.12, type: "sine", gain: 0.06 },
  ],
};

export function playSound(name: keyof typeof SOUNDS) {
  const audio = getCtx();
  if (!audio) return;
  const blips = SOUNDS[name];
  let when = audio.currentTime;
  for (const b of blips) {
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = b.type;
    osc.frequency.setValueAtTime(b.freq, when);
    gain.gain.setValueAtTime(0, when);
    gain.gain.linearRampToValueAtTime(b.gain, when + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + b.duration);
    osc.connect(gain).connect(audio.destination);
    osc.start(when);
    osc.stop(when + b.duration);
    when += b.duration * 0.8;
  }
}
