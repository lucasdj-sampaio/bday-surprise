'use client';
import { GiftSection } from '@/shared/types/giftSection';
import { getRemainingTime, scrambleText } from '@/util';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { BsBoxSeam } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { SlSocialDropbox } from 'react-icons/sl';
import GiftCard from '../../atoms/giftCard';
import ProgressBar from '../../atoms/progressBar';

interface BlockProps {
  section: GiftSection;
  isEnable?: boolean;
}

export default function GiftBlock({ section, isEnable = false }: BlockProps) {
  const [open, setOpen] = useState(section.progress < 100 && isEnable);
  const [mounted, setMounted] = useState(false);

  const remainingMessage = `Termine o ${
    Number(section.name.split(' ')[1]) - 1
  }º bloco`;

  const [remaining, setRemaining] = useState(() =>
    getRemainingTime(section.available, remainingMessage)
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isEnable && !remaining.expired) {
      const interval = setInterval(() => {
        setRemaining(getRemainingTime(section.available, remainingMessage));
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [isEnable]);

  const fadedText = isEnable ? 'text-regular' : 'text-regular/80';
  const lightText = isEnable ? 'text-light' : 'text-light/80';

  const blurClass = clsx(
    'no-select transition-all duration-700',
    !isEnable && !section.isAvailable && 'blur-xs pointer-events-none'
  );

  const Icon = isEnable ? SlSocialDropbox : BsBoxSeam;

  const safeTitle = isEnable
    ? section.title
    : mounted && !section.isAvailable
    ? scrambleText(section.title)
    : section.title;

  const safeDescription =
    isEnable || section.isAvailable
      ? section.description
      : mounted
      ? scrambleText(section.description ?? '')
      : section.description;

  return (
    <article
      onClick={() => isEnable && setOpen(!open)}
      className={clsx(
        'flex flex-col w-lg gap-4 p-4 rounded-xl border transition-all',
        'border-[rgba(237,228,222,1)]',
        isEnable
          ? 'cursor-pointer bg-secondary/2'
          : 'cursor-not-allowed bg-secondary/10 opacity-80'
      )}
    >
      <div className="grid grid-cols-[120px_auto] md:grid-cols-[370px_auto] items-center gap-4">
        <div className="flex items-center gap-4">
          <div
            className={clsx(
              'bg-light/16 rounded-full p-4 h-min',
              '[&>svg]:w-7 [&>svg]:h-7',
              lightText
            )}
          >
            <Icon />
          </div>

          <div className="flex flex-col">
            <span className={clsx('text-xs font-light', lightText)}>
              {section.name}
            </span>

            <h4 className={clsx('text-lg font-bold', fadedText, blurClass)}>
              {safeTitle}
            </h4>

            {section.description && (
              <p className={clsx('text-xs font-light', lightText, blurClass)}>
                {safeDescription}
              </p>
            )}
          </div>
        </div>

        {isEnable ? (
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="text-sm text-regular/60">
                {section.unlockedGiftsCount}/{section.gifts.length}
              </span>

              <ProgressBar progress={section.progress} />
            </div>
            <div className="[&>svg]:w-3 [&>svg]:text-regular/60">
              {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 text-center">
            <span className="text-sm text-regular/60">
              {remaining.expired ? 'Já disponível' : 'Disponível em'}
            </span>

            <span className="bg-primary/80 rounded-xl text-sm text-center px-3 py-1 text-title font-semibold">
              {remaining.text}
            </span>
          </div>
        )}
      </div>

      {open &&
        section.gifts.map((gift, i) => (
          <GiftCard
            key={`giftCard_${i}`}
            gift={gift}
            unlocked={i === 0 || section.gifts[i - 1].found}
          />
        ))}
    </article>
  );
}
