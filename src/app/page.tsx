import { CountdownTimer } from '@/components/atoms/countdownTimer';
import Header from '@/components/atoms/header';
import IntroContent from '@/components/molecules/introContent';
import { Counter } from '@/shared/types/counter';

export default async function Home() {
  const jsonCounter = await fetch(`${process.env.STRAPI_BASEURL}/api/counter`, {
    next: { revalidate: 7200 },
  }).then(r => r.json());

  const counter = Counter.fromJson(jsonCounter);

  return (
    <section className="relative">
      <Header />

      <div className="flex flex-col absolute gap-8 top-[97%] left-1/2 -translate-x-1/2">
        <div className="content-card">
          <h2 className="text-2xl font-bold text-subtitle">{counter.title}</h2>
          <CountdownTimer limit={counter.birthday} />
        </div>

        <div className="content-card">
          <IntroContent />
        </div>

        <div className="content-card"></div>
      </div>
    </section>
  );
}
