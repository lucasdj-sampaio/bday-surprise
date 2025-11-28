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
  able?: boolean;
}

export default function GiftBlock({ section, able = false }: BlockProps) {
  const [open, setOpen] = useState(section.progress < 100 && able);
  const [mounted, setMounted] = useState(false);

  const remainingMessage = `Termine o bloco ${
    Number(section.name.split(' ')[1]) - 1
  }`;

  const [remaining, setRemaining] = useState(() =>
    getRemainingTime(section.available, remainingMessage)
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!able && !remaining.expired) {
      const interval = setInterval(() => {
        setRemaining(getRemainingTime(section.available, remainingMessage));
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [able]);

  const fadedText = able ? 'text-regular' : 'text-regular/80';
  const lightText = able ? 'text-light' : 'text-light/80';

  const blurClass = clsx(
    'no-select transition-all duration-700',
    !able && 'blur-xs pointer-events-none'
  );

  const Icon = able ? SlSocialDropbox : BsBoxSeam;

  const safeTitle = able
    ? section.title
    : mounted
    ? scrambleText(section.title)
    : section.title;

  const safeDescription = able
    ? section.description
    : scrambleText(section.description ?? '');

  return (
    <div
      onClick={() => able && setOpen(!open)}
      className={clsx(
        'flex flex-col w-lg gap-4 p-4 rounded-xl border transition-all',
        'border-[rgba(237,228,222,1)]',
        able
          ? 'cursor-pointer bg-secondary/2'
          : 'cursor-not-allowed bg-secondary/10 opacity-80'
      )}
    >
      <div className="flex items-center justify-between gap-4">
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
            <p className={clsx('text-xs font-light', lightText)}>
              {section.name}
            </p>

            <p className={clsx('text-lg font-bold', fadedText, blurClass)}>
              {safeTitle}
            </p>

            {section.description && (
              <p className={clsx('text-xs font-light', lightText, blurClass)}>
                {safeDescription}
              </p>
            )}
          </div>
        </div>

        {able ? (
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <p className="text-sm text-regular/60">
                {section.unlockedGiftsCount}/{section.gifts.length}
              </p>
              <ProgressBar progress={section.progress} />
            </div>
            <div className="[&>svg]:w-3 [&>svg]:text-regular/60">
              {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1 text-center">
            <p className="text-sm text-regular/60">
              {remaining.expired ? 'Já disponível' : 'Disponível em'}
            </p>
            <p className="bg-primary/80 rounded-xl text-sm text-center px-3 py-1 text-title font-semibold">
              {remaining.text}
            </p>
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
    </div>
  );
}
