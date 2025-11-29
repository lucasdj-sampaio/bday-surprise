import { fetchStrapi } from '@/app/api/strapi';
import RandomConfetti from '@/components/molecules/randomConfetti';
import { FoundGift } from '@/shared/types/foundGift';

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
    <section className="flex flex-col text-center items-center bg-blend-saturation justify-center h-full gap-6 p-8">
      <RandomConfetti />

      <h1 className="text-2xl md:text-3xl font-bold text-subtitle">
        ✨ Parabéns! Um novo presente foi revelado! ✨
      </h1>

      <p className="text-light text-lg">Olha só o que você encontrou:</p>

      {gift.image && (
        <div className="relative bg-css-noise p-8 rounded-xl animate-reveal-blur">
          <img src={gift.image} alt={gift.name} className="object-cover h-52" />
        </div>
      )}

      <h2 className="text-xl font-semibold text-subtitle animate-reveal-blur">
        {gift.name.toUpperCase()}
      </h2>

      <a
        href={`/#${gift.nextId}`}
        className="bg-primary text-title font-semibold p-4 rounded-lg"
      >
        {gift.nextId ? 'Desvendar a próxima pista' : 'Concluir aventura 🌟'}
      </a>
    </section>
  );
}
