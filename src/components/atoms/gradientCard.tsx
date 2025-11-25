import clsx from 'clsx';
import { FiGift } from 'react-icons/fi';

interface CardProps {
  data: string[];
}

export default async function GradientCard({ data }: CardProps) {
  const title = data[0];
  data.shift();

  return (
    <div
      className={clsx(
        'bg-linear-to-b from-primary/60 to-secondary/20 p-4',
        'flex flex-col items-center gap-2 rounded-lg',
        'shadow-[0px_4px_20px_-4px_rgba(83,45,54,0.1)]',
        'text-center'
      )}
    >
      <FiGift className="w-8 h-8 text-primary" />
      <h3 className="text-primary font-bold">{title}</h3>
      {data.map((item, index) => (
        <p key={index} className="text-xs text-opaque list-disc list-inside">
          {item}
        </p>
      ))}
    </div>
  );
}
