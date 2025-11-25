import clsx from 'clsx';
import { BsStars } from 'react-icons/bs';

interface CardProps {
  message: string;
}

export default async function StarCard({ message }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-secondary/30 p-4 w-full',
        'flex items-center gap-2',
        'border-l-4 border-l-primary rounded-lg',
        'hover:border-primary/80 hover:shadow-[4px_4px_8px_-6px_var(--color-primary)]'
      )}
    >
      <BsStars className="text-primary" />
      <p className="text-sm text-regular">{message}</p>
    </div>
  );
}
