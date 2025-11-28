import { fetchStrapi } from '@/app/api/strapi';
import RandomConfetti from '@/components/molecules/randomConfetti';
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

      <h1 className="text-3xl font-bold text-subtitle">
        ✨ Parabéns! Um novo presente foi revelado! ✨
      </h1>
      <p className="text-light text-center text-lg">
        Olha só o que você encontrou:
      </p>
      <div className="relative">
        {gift.image && (
          <Image
            src={gift.image}
            alt={gift.name}
            width={250}
            height={250}
            className="object-cover rounded-xl animate-reveal-blur"
          />
        )}
      </div>

      <p className="text-xl font-semibold text-subtitle animate-reveal-blur">
        {gift.name.toUpperCase()}
      </p>

      <a
        href={`/#${gift.nextId}`}
        className="bg-primary text-title font-semibold p-4 rounded-lg"
      >
        {gift.nextId ? 'Desvendar a próxima pista' : 'Concluir aventura 🌟'}
      </a>
    </section>
  );
}
