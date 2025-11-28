'use client';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface ConfettiProps {
  duration?: number;
}

export default function ExplosionConfetti({ duration = 15000 }: ConfettiProps) {
  useEffect(() => {
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 7,
        spread: 70,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, [duration]);

  return null;
}
