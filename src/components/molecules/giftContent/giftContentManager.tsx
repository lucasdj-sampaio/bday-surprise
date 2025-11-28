'use client';
import { IGiftContentJson } from '@/shared/interfaces/jsonGift';
import { GiftContent } from '@/shared/types/giftContent';
import { useEffect, useState } from 'react';
import GiftBlock from './giftBlock';

interface ContentManagerProps {
  initialRawContent: IGiftContentJson;
}

export default function GiftContentManager({
  initialRawContent,
}: ContentManagerProps) {
  const [content, setContent] = useState(() =>
    GiftContent.fromJson(initialRawContent)
  );

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await fetch(
          `/api/strapi/content?populate[Section][populate]=*`,
          {
            cache: 'no-store',
          }
        );

        const json = await res.json();

        setContent(GiftContent.fromJson(json));
      } catch (err) {
        console.error('Polling error:', err);
      }
    };

    const interval = setInterval(fetchUpdates, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="content-card mb-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-subtitle">{content.title}</h2>
        <p className="text-sm text-light font-ultra-light">
          {`${content.sections.filter(s => s.isAvailable).length} de ${
            content.sections.length
          } blocos disponíveis`}
        </p>
      </div>

      {content.sections.map((section, i) => {
        const availableCondition = section.isAvailable;

        return (
          <GiftBlock
            key={`surpriseBlock_${i}`}
            section={section}
            able={
              i === 0
                ? availableCondition
                : availableCondition && content.sections[i - 1].progress === 100
            }
          />
        );
      })}
    </section>
  );
}
