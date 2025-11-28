'use client';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface ConfettiProps {
  duration?: number;
}

export default function LateralConfetti({ duration = 15000 }: ConfettiProps) {
  useEffect(() => {
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });

      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, [duration]);

  return null;
}
