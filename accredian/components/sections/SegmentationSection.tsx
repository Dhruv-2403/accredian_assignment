import React from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { SegmentationCard } from '@/types';
import Image from 'next/image';
interface SegmentationSectionProps {
  cards: SegmentationCard[];
}

export function SegmentationSection({ cards }: SegmentationSectionProps) {
  return (
    <SectionWrapper>
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Tailored Course Segmentation
        </h2>
        <p className="text-lg text-gray-600">
          Find the right training format for your team
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-2 transition-all"
          >
            {/* Image */}
            <div className="h-40 bg-gradient-to-br from-blue-300 to-blue-500 flex items-center justify-center">
              <Image
                src={card.imageSrc}
                alt={card.category}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {card.category}
              </h3>
              <p className="text-sm text-gray-600">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}