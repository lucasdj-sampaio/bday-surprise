'use client';
import React, { useEffect, useMemo, useState } from 'react';

export function CountdownTimer({ limit }: { limit: string }) {
  const limitTime = useMemo(() => new Date(limit).getTime(), [limit]);
  const [diff, setDiff] = useState<number | null>(null);

  useEffect(() => {
    const calc = () => Math.max(limitTime - Date.now(), 0);
    setDiff(calc());

    const interval = setInterval(() => {
      setDiff(calc());
    }, 1000);

    return () => clearInterval(interval);
  }, [limitTime]);

  if (diff === null) {
    return <h3 className="text-2xl font-semibold text-primary">Calculando…</h3>;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  function plural(value: number, word: string) {
    return `${word}${value === 1 ? '' : 's'}`;
  }

  const arrayValues = [
    { value: days, label: plural(days, 'Dia') },
    { value: hours, label: plural(hours, 'Hora') },
    { value: minutes, label: plural(minutes, 'Minuto') },
    { value: seconds, label: plural(seconds, 'Segundo') },
  ];

  return (
    <div className="flex text-xl font-bold gap-4 items-center no-select">
      {arrayValues.map((item, i) => {
        return i === 0 && item.value === 0 ? null : (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center gap-1">
              <p className="timer-card text-4xl text-title">
                {item.value.toString().padStart(2, '0')}
              </p>
              <p className="text-xs font-light text-light uppercase">
                {item.label}
              </p>
            </div>
            {i < arrayValues.length - 1 && (
              <span className="text-5xl font-normal text-primary">:</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
