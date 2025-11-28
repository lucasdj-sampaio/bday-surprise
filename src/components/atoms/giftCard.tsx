import { GiftItem } from '@/shared/types/giftItem';
import clsx from 'clsx';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { LuGift } from 'react-icons/lu';

interface CardProps {
  gift: GiftItem;
  unlocked: boolean;
}

export default function GiftCard({ gift, unlocked }: CardProps) {
  const isFound = gift.found;
  const currentClueCondition = !isFound && unlocked;

  const Icon = isFound
    ? IoCheckmarkOutline
    : unlocked
    ? HiOutlineLightBulb
    : LuGift;

  const containerClass = clsx(
    'flex items-center gap-2 hover:cursor-default transition-all',
    unlocked
      ? `${
          isFound ? 'bg-primary/1' : 'bg-background'
        } p-5 border border-primary/30 rounded-lg`
      : 'bg-transparent px-5 py-1'
  );

  const iconClass = clsx(
    'p-2 w-min h-min rounded-full [&>svg]:w-5 [&>svg]:h-5',
    isFound ? 'bg-primary/10' : unlocked ? 'bg-secondary/10' : 'bg-transparent'
  );

  const titleClass = clsx(
    'text-sm font-semibold',
    unlocked ? 'text-subtitle' : 'text-opaque'
  );

  const descriptionClass = clsx(
    'text-xs',
    unlocked ? 'text-[rgba(115,115,115,1)]' : 'text-opaque'
  );

  return (
    <div
      id={currentClueCondition ? gift.identifier : undefined}
      className={containerClass}
    >
      <div className={iconClass}>
        <Icon
          className={
            isFound
              ? 'text-primary/80'
              : unlocked
              ? 'text-primary/70'
              : 'text-opaque'
          }
        />
      </div>

      <div>
        <h4 className={titleClass}>{gift.title}</h4>

        <p className={descriptionClass}>
          <strong className="font-medium">
            {isFound ? gift.name : unlocked ? 'Dica: ' : 'Bloqueado'}
          </strong>

          {currentClueCondition && gift.clue}
        </p>
      </div>
    </div>
  );
}
