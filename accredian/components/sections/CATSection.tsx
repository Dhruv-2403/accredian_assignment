import React from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export function CATSection() {
  const pillars = [
    {
      title: 'Customized',
      description: 'Every training program is tailored to your organization\'s specific business challenges and learning goals.',
      icon: '⚙️',
    },
    {
      title: 'Adaptive',
      description: 'Our curriculum evolves with industry trends and your team\'s progress, ensuring relevance and engagement.',
      icon: '🔄',
    },
    {
      title: 'Transformative',
      description: 'We focus on creating lasting behavioral change and tangible business impact, not just knowledge transfer.',
      icon: '✨',
    },
  ];

  return (
    <SectionWrapper className="bg-gradient-to-r from-indigo-50 to-blue-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Our Learning Methodology: The CAT Framework
        </h2>
        <p className="text-lg text-gray-600">
          Customized • Adaptive • Transformative
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pillars.map((pillar, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-6xl mb-4">{pillar.icon}</div>
            <h3 className="text-2xl font-bold text-blue-600 mb-3">
              {pillar.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
          </div>
        ))}
      </div>

      
      <div className="mt-16 bg-blue-600 text-white p-8 rounded-lg text-center">
        <p className="text-lg">
          The CAT framework ensures that training is not a one-time event, but a strategic partnership for sustained professional growth.
        </p>
      </div>
    </SectionWrapper>
  );
}