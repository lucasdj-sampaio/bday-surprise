import { CountdownTimer } from '@/components/atoms/countdownTimer';
import HeaderContent from '@/components/atoms/headerContent';
import IntroContent from '@/components/molecules/introContent';
import SurpriseBlock from '@/components/molecules/surpriseBlock';
import { fetchStrapi } from '@/lib/api';
import { Counter } from '@/shared/types/counter';
import { GiftContent } from '@/shared/types/giftContent';

export default async function Home() {
  const jsonCounter = await fetchStrapi('counter', { revalidate: 7200 });
  const json = await fetchStrapi('content?populate[Section][populate]=*', {
    revalidate: 60,
  });

  const counter = Counter.fromJson(jsonCounter);
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

        <section className="content-card mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-subtitle">
              {content.title}
            </h2>
            <p className="text-sm text-light font-ultra-light">
              {`${1} de ${content.sections.length} blocos desbloqueados`}
            </p>
          </div>

          {content.sections.map((section, i) => {
            const availableCondition =
              Date.now() >= new Date(section.available).getTime();

            return (
              <SurpriseBlock
                key={`surpriseBlock_${i}`}
                section={section}
                able={
                  i === 0
                    ? availableCondition
                    : availableCondition &&
                      content.sections[i - 1].progress === 100
                }
              />
            );
          })}
        </section>
      </div>
    </div>
  );
}
