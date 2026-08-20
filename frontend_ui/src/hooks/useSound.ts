// src/hooks/useSound.ts
// Hook phát âm thanh đơn giản dùng Web Audio API — không phụ thuộc thư viện
// ngoài, không cần file .mp3 (dùng oscillator để demo). Khi có tài nguyên âm
// thanh thật, chỉ cần thay hàm `playTone` bằng `new Audio(src).play()`.

import { useCallback, useRef, useState } from "react";

export type SoundEffect = "place" | "capture" | "pass" | "error";

const TONE_MAP: Record<SoundEffect, number> = {
  place: 440,
  capture: 220,
  pass: 330,
  error: 150,
};

export function useSound() {
  const [enabled, setEnabled] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const play = useCallback(
    (effect: SoundEffect) => {
      if (!enabled) return;
      try {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        const ctx = audioCtxRef.current;
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.frequency.value = TONE_MAP[effect];
        oscillator.type = "sine";
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start();
        oscillator.stop(ctx.currentTime + 0.18);
      } catch {
        // Môi trường không hỗ trợ AudioContext (vd: SSR) -> bỏ qua an toàn.
      }
    },
    [enabled]
  );

  return { play, enabled, setEnabled };
}
