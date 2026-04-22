'use client';

import React from 'react';

interface ItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: ItemProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full py-4 px-4 text-left hover:bg-gray-50 transition-colors flex justify-between items-center"
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <span className={`text-2xl transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ⌄
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-gray-700 bg-gray-50">
          {answer}
        </div>
      )}
    </div>
  );
}