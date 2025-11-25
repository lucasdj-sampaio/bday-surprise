import { CountdownTimer } from '@/components/atoms/countdownTimer';
import HeaderContent from '@/components/atoms/headerContent';
import IntroContent from '@/components/molecules/introContent';
import { fetchStrapi } from '@/lib/api';
import { Counter } from '@/shared/types/counter';

export default async function Home() {
  const jsonCounter = await fetchStrapi('counter', { revalidate: 7200 });
  const counter = Counter.fromJson(jsonCounter);

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

        <section className="content-card"></section>
      </div>
    </div>
  );
}
