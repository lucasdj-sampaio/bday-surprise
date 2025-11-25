import { HeaderData } from '@/shared/types/header';
import clsx from 'clsx';
import Image from 'next/image';
import { FaHeart } from 'react-icons/fa';

export default async function Header() {
  const url = new URL(`${process.env.STRAPI_BASEURL}/api/header`);
  url.searchParams.set('populate[Picture][populate]', '*');

  const jsonData = await fetch(url, {
    next: { revalidate: 7200 },
  }).then(r => r.json());

  const headerData = HeaderData.fromJson(jsonData);

  return (
    <div
      className={clsx(
        'bg-linear-to-r from-primary to-secondary',
        'flex justify-center',
        'p-8'
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-1">
          <FaHeart />
          <h1>{headerData.title}</h1>
          <FaHeart />
        </div>

        <div className="relative w-50 h-50">
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
          ></div>
        </div>

        <p className="light">{headerData.description}</p>
      </div>
    </div>
  );
}
