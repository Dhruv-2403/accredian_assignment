'use client';

import { useContext } from 'react';
import { ModalContext, type ModalContextType } from '@/components/providers/ModalProvider';

export function useModal(): ModalContextType {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error(
      'useModal must be used within a ModalProvider. Ensure ModalProvider wraps your app in layout.tsx'
    );
  }

  return context;
}