import type { FAQGroup } from '@/types';

export const faqGroups: FAQGroup[] = [
  {
    category: 'About the Course',
    items: [
      {
        id: 'faq-1',
        question: 'What is the duration of the training programs?',
        answer: 'Our programs range from 4 weeks to 6 months, depending on the course and delivery format. We offer flexible scheduling to fit your organization\'s needs.',
      },
      {
        id: 'faq-2',
        question: 'Do you offer customized training solutions?',
        answer: 'Yes, we specialize in creating tailored training programs that address your specific business challenges and learning objectives.',
      },
      {
        id: 'faq-3',
        question: 'What qualifications do your trainers have?',
        answer: 'All our trainers are industry experts with 10+ years of experience and certifications in their respective domains.',
      },
    ],
  },
  {
    category: 'About the Delivery',
    items: [
      {
        id: 'faq-4',
        question: 'Can we do online training?',
        answer: 'Absolutely! We offer fully online, hybrid, and in-person training options. Choose what works best for your team.',
      },
      {
        id: 'faq-5',
        question: 'What is the typical group size?',
        answer: 'We recommend group sizes of 15-30 participants for optimal engagement and learning outcomes.',
      },
      {
        id: 'faq-6',
        question: 'Is there post-training support?',
        answer: 'Yes, we provide 3 months of post-training support including mentoring, Q&A sessions, and access to learning resources.',
      },
    ],
  },
  {
    category: 'Miscellaneous',
    items: [
      {
        id: 'faq-7',
        question: 'Do you provide certificates upon completion?',
        answer: 'Yes, all participants receive industry-recognized certificates upon successful completion of the program.',
      },
      {
        id: 'faq-8',
        question: 'What if we need training for a different industry?',
        answer: 'We have expertise across multiple industries. Contact us to discuss your specific requirements and we\'ll create a custom solution.',
      },
    ],
  },
];