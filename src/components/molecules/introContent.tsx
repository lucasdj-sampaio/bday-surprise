import { fetchStrapi } from '@/app/api/strapi';
import { Introduction } from '@/shared/types/introduction';
import { FaHeart } from 'react-icons/fa';
import GradientCard from '../atoms/gradientCard';
import StarCard from '../atoms/starCard';

export default async function IntroContent() {
  const introJson = await fetchStrapi('introduction', {
    revalidate: 7200,
  });

  const introduction = Introduction.fromJson(introJson);

  const h3Class = 'text-lg font-bold text-primary';
  const pClass = 'text-base text-regular';

  return (
    <div>
      <div className="max-w-lg flex flex-col gap-4 items-center">
        <div className="bg-primary w-min p-2 rounded-full">
          <FaHeart className="w-6 h-6 text-title" />
        </div>

        <h3 className={`${h3Class} text-center`}>{introduction.title}</h3>

        <div className="h-[2px] w-full divider-gradient" />

        <p className={pClass}>{introduction.message.top}</p>

        <StarCard message={introduction.message.attention} />

        <p className={pClass}>{introduction.message.middle}</p>

        <GradientCard data={introduction.message.card} />

        <p className={pClass}>{introduction.message.bottom}</p>

        <div className="border-t-2 border-primary/10 pt-4 w-full">
          <h3 className={`${h3Class} flex gap-2 items-center justify-center`}>
            {introduction.ready} <FaHeart className="text-primary" />
          </h3>
        </div>
      </div>
    </div>
  );
}
