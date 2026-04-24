import React from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { AudienceCard } from '@/types';

interface AudienceSectionProps {
  cards: AudienceCard[];
}
export function AudienceSection({ cards }: AudienceSectionProps) {
  return (
    <SectionWrapper id="audience" className="bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Who Should Join?
        </h2>
        <p className="text-lg text-gray-600">
          Accredian programs are designed for diverse professional backgrounds
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <div className="text-6xl mb-4">{card.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {card.title}
            </h3>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}