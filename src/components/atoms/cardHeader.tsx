import { fetchStrapi } from '@/app/api/strapi';
import { Header } from '@/shared/types/header';
import clsx from 'clsx';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';

export default async function CardHeader() {
  const jsonData = await fetchStrapi('header?populate[Picture][populate]=*', {
    revalidate: 7200,
  });

  const headerData = Header.fromJson(jsonData);
  const iconHeart = <FaHeart className="w-5 h-5 text-title md:w-7 md:h-7" />;

  return (
    <header
      className={clsx(
        'bg-linear-to-r from-primary to-secondary',
        'flex justify-center',
        'p-8 md:p-10'
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          {iconHeart}
          <h1 className="text-3xl md:text-5xl font-bold text-title">
            {headerData.title}
          </h1>
          {iconHeart}
        </div>

        <div className="relative w-40 h-40 md:w-50 md:h-50">
          {headerData.image && (
            <Image
              src={headerData.image}
              alt={headerData.title}
              width={200}
              height={200}
              className="rounded-full"
            />
          )}

          <div
            className={clsx(
              'absolute inset-0 rounded-full',
              'ring-4 ring-inset ring-[rgba(255,255,255,0.4)]'
            )}
          />
        </div>

        <p className="text-sm font-normal text-title">
          {headerData.description}
        </p>
      </div>
    </header>
  );
}
