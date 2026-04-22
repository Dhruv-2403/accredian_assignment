import React, { ReactNode } from 'react';

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function SectionWrapper({
  id,
  className = '',
  children,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full ${className}`}
    >
      {children}
    </section>
  );
}