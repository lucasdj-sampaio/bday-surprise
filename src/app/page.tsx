import Header from '@/components/atoms/header';
import { Counter } from '@/shared/types/counter';
import { Introduction } from '@/shared/types/introduction';

export default async function Home() {
  const jsonCounter = await fetch(`${process.env.STRAPI_BASEURL}/api/counter`, {
    next: { revalidate: 7200 },
  }).then(r => r.json());

  const introJson = await fetch(
    `${process.env.STRAPI_BASEURL}/api/introduction`,
    {
      next: { revalidate: 7200 },
    }
  ).then(r => r.json());

  const counter = Counter.fromJson(jsonCounter);
  const introduction = Introduction.fromJson(introJson);

  return (
    <div className="relative">
      <Header />

      <div className="absolute top-[95%] left-1/2 -translate-x-1/2 flex flex-col gap-4">
        <div className="content-card">
          <h2>{counter.title}</h2>
          <p>Birthday: {counter.birthday}</p>
        </div>
        <div className="content-card">
          <h2>{introduction.title}</h2>

          {introduction.message.top}
          {introduction.message.attention}
          {introduction.message.middle}
          {introduction.message.card}
          {introduction.message.bottom}

          <p>{introduction.ready}</p>
        </div>
        <div className="content-card"></div>
      </div>
    </div>
  );
}
