import { fetchStrapi } from '@/app/api/strapi';
import { CountdownTimer } from '@/components/atoms/countdownTimer';
import HeaderContent from '@/components/atoms/headerContent';
import ContentManager from '@/components/molecules/giftContent/contentManager';
import IntroContent from '@/components/molecules/introContent';
import { Counter } from '@/shared/types/counter';
import { GiftContent } from '@/shared/types/giftContent';

export default async function Home() {
  const jsonCounter = await fetchStrapi('counter', { revalidate: 7200 });
  const counter = Counter.fromJson(jsonCounter);

  const json = await fetchStrapi('content?populate[Section][populate]=*', {
    noStore: true,
  });
  const content = GiftContent.fromJson(json);

  return (
    <div className="relative">
      <HeaderContent />

      <div className="flex flex-col absolute gap-8 left-1/2 -translate-x-1/2 -translate-4">
        <section className="content-card">
          <h2 className="text-2xl font-bold text-subtitle">{counter.title}</h2>
          <CountdownTimer limit={counter.birthday} />
        </section>

        <section className="content-card">
          <IntroContent />
        </section>

        <ContentManager initialRawContent={content.toJson()} />
      </div>
    </div>
  );
}
