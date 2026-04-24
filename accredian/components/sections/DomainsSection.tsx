import React from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { DomainItem } from '@/types';

interface DomainsSectionProps {
  domains: DomainItem[];
}
export function DomainsSection({ domains }: DomainsSectionProps) {
  return (
    <SectionWrapper id="domains" className="bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Domain Expertise
        </h2>
        <p className="text-lg text-gray-600">
          Comprehensive training across critical business domains
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {domains.map((domain) => (
          <div
            key={domain.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition-all text-center"
          >
            <div className="text-5xl mb-4">{domain.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900">
              {domain.name}
            </h3>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}