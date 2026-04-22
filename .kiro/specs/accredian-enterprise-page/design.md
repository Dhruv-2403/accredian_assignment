# Design Document — Accredian Enterprise Landing Page

## Overview

This document describes the technical design for the Accredian Enterprise landing page, a marketing and lead-generation page built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. The page is a single-route (`/`) application composed of independently developed, reusable section components assembled in `app/page.tsx`. It is built incrementally — one section at a time — and deployed to Vercel.

### Key Design Goals

- **Incremental build**: each section is a self-contained component that can be developed and tested in isolation.
- **Static data layer**: all content (domains, FAQs, testimonials, stats, etc.) lives in typed data files, keeping components free of hardcoded strings.
- **Clean API boundary**: the enquiry form talks to a service module, not directly to a URL, so the mock can be swapped for a real endpoint with zero component changes.
- **Accessibility first**: semantic HTML, keyboard navigation, focus management, and ARIA attributes are built in from the start, not retrofitted.
- **Tailwind CSS v4 utility-first**: no custom CSS files beyond `globals.css`; all layout and styling via Tailwind utility classes.

---

## Architecture

The application is a standard Next.js 16 App Router project. The root route renders a single Server Component (`app/page.tsx`) that composes all section components. Interactive sections (Navbar hamburger, FAQ accordion, Testimonials carousel, Enquiry Modal) are Client Components (`"use client"`).

### Server vs Client Component Split

| Component | Type | Reason |
|---|---|---|
| `app/page.tsx` | Server | Static composition, no interactivity |
| `Navbar` | Client | Hamburger toggle state, scroll handler |
| `HeroSection` | Server | Static content, modal trigger delegated |
| `StatsSection` | Server | Static content |
| `PartnersSection` | Server | Static content |
| `EdgeSection` | Server | Static content |
| `DomainsSection` | Server | Static content, renders from data array |
| `SegmentationSection` | Server | Static content |
| `AudienceSection` | Server | Static content |
| `CATSection` | Server | Static content |
| `DeliverySection` | Server | Static content, renders from data array |
| `FAQSection` | Client | Accordion open/close state |
| `TestimonialsSection` | Client | Active index state |
| `CTASection` | Server | Static content, modal trigger delegated |
| `Footer` | Server | Static content |
| `EnquiryModal` | Client | Visibility state, form state, focus trap |
| `EnquiryForm` | Client | Form state, validation, API call |
| `ModalProvider` | Client | Context for modal open/close |

### Modal State Management

The `EnquiryModal` must be openable from multiple locations (Navbar CTA, Hero CTA, CTA Section). Rather than prop-drilling a callback through the entire component tree, a lightweight React Context (`ModalContext`) is used:

```
ModalProvider (Client, wraps app/layout.tsx body)
  ├── Navbar          → calls openModal()
  ├── HeroSection     → calls openModal()
  ├── CTASection      → calls openModal()
  └── EnquiryModal    → reads isOpen, calls closeModal()
```

`ModalProvider` holds a single `isOpen: boolean` state and exposes `openModal` / `closeModal` functions via context. All other components remain Server Components.

### Data Flow Diagram

```
app/page.tsx (Server)
  │
  ├── data/stats.ts          → StatsSection
  ├── data/partners.ts       → PartnersSection
  ├── data/domains.ts        → DomainsSection
  ├── data/segmentation.ts   → SegmentationSection
  ├── data/audience.ts       → AudienceSection
  ├── data/delivery.ts       → DeliverySection
  ├── data/faqs.ts           → FAQSection
  ├── data/testimonials.ts   → TestimonialsSection
  │
  └── services/enquiryApi.ts ← EnquiryForm (Client)
```

---

## Components and Interfaces

### Folder Structure

```
accredian/
├── app/
│   ├── layout.tsx              # Root layout, wraps with ModalProvider
│   ├── page.tsx                # Composes all sections
│   └── globals.css             # Tailwind v4 base styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── PartnersSection.tsx
│   │   ├── EdgeSection.tsx
│   │   ├── DomainsSection.tsx
│   │   ├── SegmentationSection.tsx
│   │   ├── AudienceSection.tsx
│   │   ├── CATSection.tsx
│   │   ├── DeliverySection.tsx
│   │   ├── FAQSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   ├── ui/
│   │   ├── EnquiryModal.tsx
│   │   ├── EnquiryForm.tsx
│   │   ├── AccordionItem.tsx   # Reusable FAQ accordion row
│   │   └── SectionWrapper.tsx  # Consistent section padding/max-width
│   └── providers/
│       └── ModalProvider.tsx
├── data/
│   ├── stats.ts
│   ├── partners.ts
│   ├── domains.ts
│   ├── segmentation.ts
│   ├── audience.ts
│   ├── delivery.ts
│   ├── faqs.ts
│   └── testimonials.ts
├── services/
│   └── enquiryApi.ts
├── types/
│   └── index.ts
└── hooks/
    └── useModal.ts             # Convenience hook for ModalContext
```

### Component Props

**Navbar**
```ts
// No external props — reads ModalContext internally
```

**SectionWrapper**
```ts
interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}
```

**StatsSection**
```ts
interface StatsSectionProps {
  stats: StatItem[];
}
```

**DomainsSection**
```ts
interface DomainsSectionProps {
  domains: DomainItem[];
}
```

**DeliverySection**
```ts
interface DeliverySectionProps {
  steps: DeliveryStep[];
}
```

**FAQSection**
```ts
interface FAQSectionProps {
  groups: FAQGroup[];
}
```

**TestimonialsSection**
```ts
interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}
```

**EnquiryModal**
```ts
// No external props — reads/writes ModalContext internally
```

**EnquiryForm**
```ts
interface EnquiryFormProps {
  onSuccess: () => void;
}
```

**AccordionItem**
```ts
interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}
```

---

## Data Models

All types are defined in `types/index.ts` and imported by both data files and components.

```ts
// types/index.ts

export interface StatItem {
  value: string;       // e.g. "50,000+"
  label: string;       // e.g. "Professionals Trained"
}

export interface PartnerLogo {
  name: string;        // Used as alt text and fallback
  src: string;         // Path under /public or external URL
}

export interface DomainItem {
  id: string;
  icon: string;        // Emoji or icon identifier string
  name: string;        // e.g. "Product & Innovation"
}

export interface SegmentationCard {
  id: string;
  imageSrc: string;
  category: string;    // e.g. "Program Specific"
  subtitle: string;    // e.g. "MBA, PGP, Executive Programs"
}

export interface AudienceCard {
  id: string;
  icon: string;
  title: string;       // e.g. "Tech Professionals"
  description: string;
}

export interface DeliveryStep {
  step: number;
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQGroup {
  category: string;
  items: FAQItem[];
}

export interface Testimonial {
  id: string;
  logoSrc: string;
  logoAlt: string;
  quote: string;
  organization: string;
}

export interface EnquiryPayload {
  fullName: string;
  workEmail: string;
  organizationName: string;
  phoneNumber: string;
  message: string;
}

export interface EnquiryResponse {
  success: boolean;
  message: string;
}

export interface EnquiryError {
  success: false;
  message: string;
  code?: string;
}
```

### Data Files

Each data file exports a typed constant array. Example:

```ts
// data/domains.ts
import type { DomainItem } from "@/types";

export const domains: DomainItem[] = [
  { id: "product", icon: "💡", name: "Product & Innovation" },
  { id: "genai",   icon: "🤖", name: "Gen-AI" },
  { id: "leadership", icon: "🎯", name: "Leadership" },
  { id: "tech",    icon: "💻", name: "Tech & Data" },
  { id: "ops",     icon: "⚙️",  name: "Operations" },
  { id: "digital", icon: "🌐", name: "Digital Enterprise" },
  { id: "fintech", icon: "💳", name: "Fintech" },
];
```

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Domain card count invariant

*For any* non-empty array of `DomainItem` objects passed to `DomainsSection`, the number of rendered card elements SHALL equal the length of the input array.

**Validates: Requirements 6.5**

---

### Property 2: Domain rendering idempotence

*For any* `DomainItem` array, rendering `DomainsSection` twice with the same array SHALL produce identical HTML output both times.

**Validates: Requirements 6.6**

---

### Property 3: Delivery step count invariant

*For any* array of `DeliveryStep` objects passed to `DeliverySection`, the number of rendered step elements SHALL equal the length of the input array.

**Validates: Requirements 10.4**

---

### Property 4: Delivery step order preservation

*For any* array of `DeliveryStep` objects, the rendered steps SHALL appear in the same order as the input array (i.e., the step at index `i` in the data maps to the `i`-th rendered element).

**Validates: Requirements 10.3**

---

### Property 5: FAQ accordion toggle idempotence

*For any* FAQ item, toggling it open and then toggling it closed SHALL return the item to its original collapsed state — the visible answer text SHALL not be present after the second toggle.

**Validates: Requirements 11.5**

---

### Property 6: Testimonial carousel bounds invariant

*For any* testimonials array of length N, the active index SHALL always remain within `[0, N-1]` regardless of how many times the next or previous controls are activated.

**Validates: Requirements 12.5**

---

### Property 7: Testimonial carousel round-trip

*For any* testimonials array of length N and any starting index, advancing the carousel N times and then reversing N times SHALL return to the original active index.

**Validates: Requirements 12.6**

---

### Property 8: Enquiry form data integrity

*For any* valid `EnquiryPayload`, every field value submitted through `EnquiryForm` SHALL appear unchanged in the object passed to `enquiryApi.submit()` — no field SHALL be omitted or mutated before the API call.

**Validates: Requirements 14.10, 17.5**

---

### Property 9: Enquiry API service round-trip data integrity

*For any* valid `EnquiryPayload` passed to `enquiryApi.submit()`, the service SHALL forward every field to the outgoing request body without omission or mutation.

**Validates: Requirements 17.5**

---

### Property Reflection

After reviewing all nine properties:

- **Properties 8 and 9** both test data integrity of the enquiry payload. Property 8 tests the form→service boundary; Property 9 tests the service→request boundary. These are distinct boundaries and both are worth testing independently — no consolidation needed.
- **Properties 1 and 3** both test count invariants but on different components (`DomainsSection` vs `DeliverySection`) — kept separate.
- **Properties 6 and 7** both test the carousel but cover different invariants (bounds vs round-trip) — kept separate.
- No redundancies identified. All nine properties provide unique validation value.

---

## Error Handling

### Enquiry API Errors

The `enquiryApi` service module wraps all network calls in a `try/catch` and always returns a typed `EnquiryResponse | EnquiryError` — it never throws. The mock implementation returns `{ success: true }` after a simulated 1–2 second delay.

```ts
// services/enquiryApi.ts (mock)
export async function submitEnquiry(
  payload: EnquiryPayload
): Promise<EnquiryResponse | EnquiryError> {
  try {
    await delay(1000 + Math.random() * 1000);
    return { success: true, message: "Thank you! We'll be in touch shortly." };
  } catch (err) {
    return { success: false, message: "Something went wrong. Please try again.", code: "NETWORK_ERROR" };
  }
}
```

`EnquiryForm` checks `response.success` and renders either a success banner or an inline error message. The form fields are NOT cleared on error.

### Image Load Errors

`PartnersSection` renders each logo with an `onError` handler that swaps the `<img>` for a `<span>` containing the partner name as fallback text. This is implemented as a small `PartnerLogo` Client Component.

### Form Validation Errors

Client-side validation runs on submit (not on blur, to avoid premature errors). Each required field displays an inline error message below it when empty. The email field additionally validates format with a regex. Validation state is held in `EnquiryForm`'s local `useState`.

---

## Testing Strategy

### Unit Tests (Example-Based)

Use **Vitest** + **React Testing Library** (standard for Next.js/React 19 projects).

Focus areas:
- `enquiryApi.submitEnquiry()` — mock delay resolves, error path returns structured error
- `EnquiryForm` — validation errors appear for empty/invalid fields, success banner appears on mock success
- `AccordionItem` — renders question, answer hidden by default, answer visible after click
- `Navbar` — hamburger toggle shows/hides menu, close on link click
- `Footer` — copyright year matches current year

### Property-Based Tests

Use **fast-check** (TypeScript-native, well-maintained, works in Vitest).

Each property test runs a minimum of **100 iterations**.

Tag format: `// Feature: accredian-enterprise-page, Property {N}: {property_text}`

| Property | Test Description | Generator |
|---|---|---|
| P1 — Domain count invariant | Arbitrary `DomainItem[]`, render `DomainsSection`, assert card count equals array length | `fc.array(fc.record({ id: fc.string(), icon: fc.string(), name: fc.string() }), { minLength: 1 })` |
| P2 — Domain idempotence | Same array rendered twice produces same output | Same generator, render twice, compare |
| P3 — Delivery count invariant | Arbitrary `DeliveryStep[]`, render `DeliverySection`, assert step count equals array length | `fc.array(deliveryStepArb, { minLength: 1 })` |
| P4 — Delivery order preservation | Rendered step titles match input array order | Same generator, check title sequence |
| P5 — FAQ toggle idempotence | Toggle open then closed, item returns to collapsed state | `fc.record({ question: fc.string(), answer: fc.string() })` |
| P6 — Carousel bounds invariant | Advance/reverse arbitrary times, index always in `[0, N-1]` | `fc.array(testimonialArb, { minLength: 1 })`, `fc.nat()` for click count |
| P7 — Carousel round-trip | Advance N times then reverse N times returns to start | Same generator |
| P8 — Form data integrity | Any valid payload, form passes it unchanged to service mock | `fc.record({ fullName: fc.string(), workEmail: fc.emailAddress(), ... })` |
| P9 — API service data integrity | Any valid payload passed to service appears unchanged in request body | Same generator, spy on fetch/mock |

### Integration Tests

- Enquiry form end-to-end: fill all fields, submit, assert success message appears
- Modal open/close: click CTA, modal appears; click close, modal disappears; focus returns to trigger

### Accessibility

Full WCAG 2.1 AA validation requires manual testing with assistive technologies (VoiceOver, NVDA) and expert review. Automated checks via **axe-core** (`@axe-core/react` or `jest-axe`) can catch ~30–40% of issues automatically and should be run as part of the test suite.
