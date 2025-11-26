import { GiftSection } from '@/shared/types/giftSection';
import { scrambleText } from '@/util';
import clsx from 'clsx';
import { BsBoxSeam } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { SlSocialDropbox } from 'react-icons/sl';
import ProgressBar from '../atoms/progressBar';

interface BlockProps {
  section: GiftSection;
  able?: boolean;
}

export default function SurpriseBlock({ section, able = false }: BlockProps) {
  const isOpen = able;
  const lightCondition = `${able ? 'text-light' : 'text-light/80'}`;
  const lockIconClass = `[&>svg]:w-7 [&>svg]:h-7 ${lightCondition}`;
  const lightTextClass = `text-xs font-light ${lightCondition}`;
  const blurEffectClass = `no-select transition-all duration-700 ${
    able ? 'opacity-100 blur-0' : 'opacity-100 blur-xs pointer-events-none'
  }`;

  return (
    <div
      className={clsx(
        'flex flex-col w-lg gap-4 p-4 rounded-xl',
        'border border-[rgba(237,228,222,1)] transition-all',
        isOpen
          ? 'cursor-pointer bg-secondary/2'
          : 'cursor-not-allowed bg-secondary/10 opacity-80'
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className={clsx(
              'bg-light/16 rounded-full p-4 h-min',
              lockIconClass
            )}
          >
            {isOpen ? <SlSocialDropbox /> : <BsBoxSeam />}
          </div>

          <div className="flex flex-col">
            <p className={lightTextClass}>{section.name}</p>
            <p
              className={clsx(
                'text-lg font-bold',
                able ? 'text-regular' : 'text-regular/80',
                blurEffectClass
              )}
            >
              {able ? section.title : scrambleText(section.title)}
            </p>

            {section.description && (
              <p className={clsx(lightTextClass, blurEffectClass)}>
                {able ? section.description : scrambleText(section.description)}
              </p>
            )}
          </div>
        </div>

        {able && (
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <p className="text-sm text-regular/60">
                {section.unlockedGiftsCount}/{section.gifts.length}
              </p>
              <ProgressBar progress={section.progress} />
            </div>

            <div className="[&>svg]:w-3 [&>svg]:text-regular/60">
              {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
