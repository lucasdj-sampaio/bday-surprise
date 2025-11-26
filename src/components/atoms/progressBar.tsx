import clsx from 'clsx';

interface BarProps {
  progress?: number;
}

export default function ProgressBar({ progress = 0 }: BarProps) {
  const barBaseClass = 'h-1.5 rounded-2xl';

  return (
    <div className={clsx(barBaseClass, 'relative w-16 bg-primary/40')}>
      <div
        className={clsx(barBaseClass, 'absolute bg-primary')}
        style={{ width: `${progress >= 10 ? progress : 0}%` }}
      />
    </div>
  );
}
