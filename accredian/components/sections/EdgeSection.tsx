import React from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export function EdgeSection() {
  const differentiators = [
    {
      icon: '🎯',
      title: 'Industry-Led Curriculum',
      description: 'Content designed and delivered by experts currently working at top tech companies',
    },
    {
      icon: '💼',
      title: 'Practical Projects',
      description: 'Real-world projects that directly apply to your organization\'s challenges',
    },
    {
      icon: '🤝',
      title: 'Mentorship & Support',
      description: 'Ongoing mentorship from industry leaders beyond the training period',
    },
    {
      icon: '📊',
      title: 'Measurable Impact',
      description: 'Proven outcomes: 40% improvement in productivity within 3 months',
    },
    {
      icon: '🔄',
      title: 'Continuous Learning',
      description: 'Access to updated content and resources for ongoing skill development',
    },
  ];

  return (
    <SectionWrapper className="bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          The Accredian Edge
        </h2>
        <p className="text-lg text-gray-600">
          What sets us apart from traditional training providers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {differentiators.map((item, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {item.title}
            </h3>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}