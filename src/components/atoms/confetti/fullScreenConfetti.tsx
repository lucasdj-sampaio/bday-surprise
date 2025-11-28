'use client';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

export default function FullScreenConfetti() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateSize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }

    updateSize();
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return <Confetti width={size.width} height={size.height} />;
}
