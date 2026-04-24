'use client';

import React, { useState } from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { PartnerLogo } from '@/types';
import Image from "next/image";
interface PartnersSectionProps {
  partners: PartnerLogo[];
}

function PartnerLogoItem({ partner }: { partner: PartnerLogo }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="flex items-center justify-center h-20 bg-gray-100 rounded-lg">
        <span className="text-gray-700 font-semibold text-center px-4">
          {partner.name}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-20 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
     <Image
        src={partner.src}
        alt={partner.name}
        width={120}
        height={60}
        className="max-h-16 max-w-full"
        onError={() => setImageError(true)} 
        />
    </div>
  );
}


export function PartnersSection({ partners }: PartnersSectionProps) {
  return (
    <SectionWrapper id="partners">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Trusted by Leading Enterprises
        </h2>
        <p className="text-lg text-gray-600">
          Accredian has partnered with Fortune 500 companies and innovative startups
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {partners.map((partner) => (
          <PartnerLogoItem key={partner.name} partner={partner} />
        ))}
      </div>
    </SectionWrapper>
  );
}