import { fetchStrapi } from '@/app/api/strapi';
import RandomConfetti from '@/components/atoms/confetti';
import { FoundGift } from '@/shared/types/foundGift';
import Image from 'next/image';

export default async function GiftPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const json = await fetchStrapi<FoundGift>('content/update-gift', {
    method: 'POST',
    noStore: true,
    body: JSON.stringify({ identifier: id }),
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN ?? ''}`,
      'Content-Type': 'application/json',
    },
  });

  const gift = FoundGift.fromJson(json);

  return (
    <section className="flex flex-col items-center gap-6 p-8">
      <RandomConfetti />

      <h1 className="text-3xl font-bold text-subtitle">🎉 Parabéns! 🎉</h1>
      <p className="text-light text-center text-lg">
        Você acabou de desbloquear:
      </p>
      <div className="relative">
        {gift.image && (
          <Image
            src={gift.image}
            alt={gift.name}
            width={200}
            height={200}
            className="rounded-full"
          />
        )}
      </div>
      <p className="text-xl font-semibold text-title">{gift.name}</p>
      <a
        href={`/#${gift.nextIdentifier}`}
        className="mt-4 bg-primary/80 text-title font-semibold px-4 py-2 rounded-lg"
      >
        Voltar para os presentes
      </a>
    </section>
  );
}
