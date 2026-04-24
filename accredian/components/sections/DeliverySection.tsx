import React from 'react';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import type { DeliveryStep } from '@/types';

interface DeliverySectionProps {
  steps: DeliveryStep[];
}

export function DeliverySection({ steps }: DeliverySectionProps) {
  return (
    <SectionWrapper id="delivery" className="bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          How We Deliver Results
        </h2>
        <p className="text-lg text-gray-600">
          A proven three-step process for transformational learning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div key={step.step} className="relative">
           
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-16 -right-4 w-8 h-0.5 bg-blue-300" />
            )}

          
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">

              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-bold text-lg mb-4">
                {step.step}
              </div>

         
              <div className="text-5xl mb-4">{step.icon}</div>

    
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}