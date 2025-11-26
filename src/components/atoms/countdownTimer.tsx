'use client';
import { addPlural, getRemainingTime } from '@/util';
import React, { useEffect, useState } from 'react';

export function CountdownTimer({ limit }: { limit: string }) {
  const [state, setState] = useState<ReturnType<
    typeof getRemainingTime
  > | null>(null);

  useEffect(() => {
    const update = () => {
      setState(getRemainingTime(limit));
    };

    update();

    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [limit]);

  if (!state) {
    return <p className="text-2xl font-bold text-primary">Carregando…</p>;
  }

  if (state.expired) {
    return <p className="text-4xl font-bold text-primary">Chegou! ✨🎉</p>;
  }

  const { d, h, m, s } = state;
  const metrics = [
    { value: d, label: addPlural(d, 'Dia') },
    { value: h, label: addPlural(h, 'Hora') },
    { value: m, label: addPlural(m, 'Minuto') },
    { value: s, label: addPlural(s, 'Segundo') },
  ];

  return (
    <div className="flex text-xl font-bold gap-4 items-center no-select">
      {metrics.map((item, i) => {
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
            {i < metrics.length - 1 && (
              <span className="text-5xl font-normal text-primary">:</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
