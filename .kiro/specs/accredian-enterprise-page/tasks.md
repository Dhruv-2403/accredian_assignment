# Implementation Plan: Accredian Enterprise Landing Page

## Overview

Build the Accredian Enterprise landing page incrementally — foundation first, then layout, then sections one by one, then wiring. Each task is scoped to a single focused session. Tests are co-located with the code they validate. All nine correctness properties from the design document have corresponding property-based test sub-tasks.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Vitest · React Testing Library · fast-check

---

## Tasks

- [ ] 1. Install test dependencies and configure Vitest
  - Install `vitest`, `@vitejs/plugin-react`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `fast-check`, `jest-axe`, `@types/jest-axe` as dev dependencies
  - Create `vitest.config.ts` at `accredian/vitest.config.ts` with jsdom environment, React plugin, and `@testing-library/jest-dom` setup file
  - Create `vitest.setup.ts` at `accredian/vitest.setup.ts` importing `@testing-library/jest-dom`
  - Add `"test": "vitest --run"` and `"test:watch": "vitest"` scripts to `package.json`
  - _Requirements: 17 (testing infrastructure for all requirements)_

- [ ] 2. Define types and create all data files
  - [ ] 2.1 Create `types/index.ts` with all exported interfaces
    - Define `StatItem`, `PartnerLogo`, `DomainItem`, `SegmentationCard`, `AudienceCard`, `DeliveryStep`, `FAQItem`, `FAQGroup`, `Testimonial`, `EnquiryPayload`, `EnquiryResponse`, `EnquiryError` exactly as specified in the design document
    - _Requirements: 3.1, 4.1, 6.1, 7.1, 8.1, 10.1, 11.1, 12.1, 14.4, 17.2_

  - [ ] 2.2 Create all data files under `data/`
    - `data/stats.ts` — at least three `StatItem` entries (professionals trained, sessions delivered, active learners)
    - `data/partners.ts` — at least six `PartnerLogo` entries with `name` and `src`
    - `data/domains.ts` — at least seven `DomainItem` entries (Product & Innovation, Gen-AI, Leadership, Tech & Data, Operations, Digital Enterprise, Fintech)
    - `data/segmentation.ts` — exactly four `SegmentationCard` entries (Program Specific, Industry Specific, Topic Specific, Level Specific)
    - `data/audience.ts` — exactly four `AudienceCard` entries (Tech Professionals, Non-Tech Professionals, Emerging Professionals, Senior Professionals)
    - `data/delivery.ts` — exactly three `DeliveryStep` entries (Skill Gap Analysis, Customized Training Plan, Flexible Program Delivery)
    - `data/faqs.ts` — at least two `FAQGroup` entries, each with multiple `FAQItem` entries
    - `data/testimonials.ts` — at least three `Testimonial` entries
    - _Requirements: 3.2, 4.1, 6.2, 7.1, 8.1, 10.2, 11.1, 12.2_

- [ ] 3. Create the enquiry API service module
  - [ ] 3.1 Implement `services/enquiryApi.ts`
    - Export `submitEnquiry(payload: EnquiryPayload): Promise<EnquiryResponse | EnquiryError>`
    - Mock implementation: simulate 1–2 second delay, return `{ success: true, message: "..." }`
    - Wrap in `try/catch`; on error return `{ success: false, message: "...", code: "NETWORK_ERROR" }` — never throw
    - _Requirements: 17.1, 17.2, 17.3, 17.4_

  - [ ]* 3.2 Write unit tests for `enquiryApi.submitEnquiry`
    - Test: mock delay resolves and returns `success: true`
    - Test: simulated network error returns structured `EnquiryError` without throwing
    - _Requirements: 17.3, 17.4_

  - [ ]* 3.3 Write property test for enquiry API service data integrity
    - **Property 9: Enquiry API service round-trip data integrity**
    - For any valid `EnquiryPayload`, every field passed to `submitEnquiry` SHALL appear unchanged in the outgoing request body
    - Use `fc.record({ fullName: fc.string(), workEmail: fc.emailAddress(), organizationName: fc.string(), phoneNumber: fc.string(), message: fc.string() })`
    - Spy on `fetch` (or the internal mock) to assert the serialized body contains every field value
    - Tag: `// Feature: accredian-enterprise-page, Property 9: Enquiry API service round-trip data integrity`
    - _Requirements: 17.5_

- [ ] 4. Create utility and provider components
  - [ ] 4.1 Create `components/providers/ModalProvider.tsx`
    - Client Component (`"use client"`)
    - Hold `isOpen: boolean` state; expose `openModal` and `closeModal` via `ModalContext`
    - Export `ModalContext` and `ModalProvider` component
    - _Requirements: 14.1, 14.2_

  - [ ] 4.2 Create `hooks/useModal.ts`
    - Convenience hook: `useModal()` returns `{ isOpen, openModal, closeModal }` from `ModalContext`
    - Throw a descriptive error if used outside `ModalProvider`
    - _Requirements: 14.1_

  - [ ] 4.3 Create `components/ui/SectionWrapper.tsx`
    - Server Component
    - Accept `id?`, `className?`, `children` props
    - Apply consistent section padding and `max-w-7xl mx-auto` container
    - _Requirements: 16.1, 16.2, 16.3_

  - [ ] 4.4 Create `components/ui/AccordionItem.tsx`
    - Client Component
    - Accept `question`, `answer`, `isOpen`, `onToggle` props
    - Render question always visible; render answer only when `isOpen` is true
    - Use `<button>` for the toggle with `aria-expanded` and `aria-controls` attributes
    - _Requirements: 11.2, 11.3, 11.4, 18.1_

  - [ ]* 4.5 Write unit tests for `AccordionItem`
    - Test: question is always rendered
    - Test: answer is hidden by default (`isOpen=false`)
    - Test: answer is visible when `isOpen=true`
    - Test: `onToggle` is called when the button is clicked
    - _Requirements: 11.2, 11.3, 11.4_

- [ ] 5. Checkpoint — Ensure foundation compiles and tests pass
  - Run `npm run build` in `accredian/` to confirm TypeScript types and data files compile without errors
  - Run `npm test` to confirm all tests written so far pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Build Navbar component
  - [ ] 6.1 Create `components/layout/Navbar.tsx`
    - Client Component (`"use client"`)
    - Render logo, section anchor links (smooth-scroll via `href="#section-id"`), and "Enquire Now" CTA button
    - Fix to top of viewport with `position: fixed` and appropriate z-index
    - Implement hamburger toggle state: show/hide mobile menu on toggle click
    - Close mobile menu when a link is clicked
    - Call `openModal()` from `useModal` when "Enquire Now" is clicked
    - Use `<nav>` element; all links and CTA reachable via Tab key
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 18.2_

  - [ ]* 6.2 Write unit tests for `Navbar`
    - Test: hamburger button is visible on mobile viewport
    - Test: clicking hamburger shows the nav links
    - Test: clicking a nav link closes the menu
    - Test: clicking hamburger again closes the menu
    - _Requirements: 1.4, 1.5, 1.6, 1.7_

- [ ] 7. Build Footer component
  - [ ] 7.1 Create `components/layout/Footer.tsx`
    - Server Component
    - Render brand name, nav links (About, Blog, Why Accredian), contact email, office address, social media icon links
    - Social links open in new tab (`target="_blank" rel="noopener noreferrer"`)
    - Copyright notice uses `new Date().getFullYear()` for the current year
    - Stack columns vertically on mobile via Tailwind responsive classes
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

  - [ ]* 7.2 Write unit tests for `Footer`
    - Test: copyright notice contains the current year
    - Test: social media links have `target="_blank"`
    - _Requirements: 15.2, 15.3_

- [ ] 8. Build Hero Section
  - [ ] 8.1 Create `components/sections/HeroSection.tsx`
    - Server Component
    - Display headline, subheadline, three value-proposition badges (Tailored Solutions, Industry Insights, Expert Guidance), and "Enquire Now" CTA button
    - Include hero image using `next/image` with appropriate `alt` and `sizes` props
    - Two-column layout on desktop, single-column stacked on mobile
    - CTA button is a Client Component wrapper that calls `openModal()` — or use a small `"use client"` button component
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 16.5_

- [ ] 9. Build Stats Section
  - [ ] 9.1 Create `components/sections/StatsSection.tsx`
    - Server Component accepting `stats: StatItem[]`
    - Render each stat with its `value` and `label`
    - Single horizontal row on desktop; stacked layout on mobile
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 10. Build Partners Section
  - [ ] 10.1 Create `components/sections/PartnersSection.tsx`
    - Server Component accepting `partners: PartnerLogo[]`
    - Render each logo as `<img>` with descriptive `alt` attribute
    - Implement a small `PartnerLogoItem` Client Component with `onError` handler that swaps to partner name fallback text
    - Scrollable row or wrapped grid on mobile
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 11. Build Edge Section
  - [ ] 11.1 Create `components/sections/EdgeSection.tsx`
    - Server Component
    - Display section title, subtitle, and at least four differentiator feature cards
    - Stack vertically on mobile
    - _Requirements: 5.1, 5.2, 5.3_

- [ ] 12. Build Domains Section
  - [ ] 12.1 Create `components/sections/DomainsSection.tsx`
    - Server Component accepting `domains: DomainItem[]`
    - Render each domain as a card with icon and name
    - Two-column grid on mobile; four-or-more-column row on desktop
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ]* 12.2 Write property test for domain card count invariant
    - **Property 1: Domain card count invariant**
    - For any non-empty `DomainItem[]`, rendered card count SHALL equal array length
    - Use `fc.array(fc.record({ id: fc.string(), icon: fc.string(), name: fc.string() }), { minLength: 1 })`
    - Tag: `// Feature: accredian-enterprise-page, Property 1: Domain card count invariant`
    - _Requirements: 6.5_

  - [ ]* 12.3 Write property test for domain rendering idempotence
    - **Property 2: Domain rendering idempotence**
    - Rendering `DomainsSection` twice with the same array SHALL produce identical HTML output
    - Use same generator as Property 1; render twice and compare `container.innerHTML`
    - Tag: `// Feature: accredian-enterprise-page, Property 2: Domain rendering idempotence`
    - _Requirements: 6.6_

- [ ] 13. Build Segmentation Section
  - [ ] 13.1 Create `components/sections/SegmentationSection.tsx`
    - Server Component accepting `cards: SegmentationCard[]`
    - Render exactly four cards, each with image, category title, and subtitle
    - Single-column on mobile; two-by-two or four-column grid on desktop
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 14. Build Audience Section
  - [ ] 14.1 Create `components/sections/AudienceSection.tsx`
    - Server Component accepting `cards: AudienceCard[]`
    - Render exactly four cards, each with icon, title, and description
    - Single-column or two-column on mobile; single horizontal row on desktop
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 15. Build CAT Framework Section
  - [ ] 15.1 Create `components/sections/CATSection.tsx`
    - Server Component
    - Display section title, subtitle, and three CAT pillars (Customized, Adaptive, Transformative) each with label and brief explanation
    - Stack pillars vertically on mobile
    - _Requirements: 9.1, 9.2, 9.3_

- [ ] 16. Build Delivery Section
  - [ ] 16.1 Create `components/sections/DeliverySection.tsx`
    - Server Component accepting `steps: DeliveryStep[]`
    - Render each step with step number, icon, title, and description
    - Vertical stacked layout on mobile; horizontal row on desktop
    - _Requirements: 10.1, 10.2, 10.3, 10.5, 10.6_

  - [ ]* 16.2 Write property test for delivery step count invariant
    - **Property 3: Delivery step count invariant**
    - For any `DeliveryStep[]` of length N, rendered step elements SHALL equal N
    - Use `fc.array(fc.record({ step: fc.nat(), icon: fc.string(), title: fc.string(), description: fc.string() }), { minLength: 1 })`
    - Tag: `// Feature: accredian-enterprise-page, Property 3: Delivery step count invariant`
    - _Requirements: 10.4_

  - [ ]* 16.3 Write property test for delivery step order preservation
    - **Property 4: Delivery step order preservation**
    - For any `DeliveryStep[]`, rendered step titles SHALL appear in the same order as the input array
    - Use same generator as Property 3; query all rendered step title elements and compare to `steps.map(s => s.title)`
    - Tag: `// Feature: accredian-enterprise-page, Property 4: Delivery step order preservation`
    - _Requirements: 10.3_

- [ ] 17. Build FAQ Section
  - [ ] 17.1 Create `components/sections/FAQSection.tsx`
    - Client Component (`"use client"`) accepting `groups: FAQGroup[]`
    - Render grouped FAQ items using `AccordionItem`
    - Track open item state; clicking a collapsed item opens it; clicking an open item closes it
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.6_

  - [ ]* 17.2 Write property test for FAQ accordion toggle idempotence
    - **Property 5: FAQ accordion toggle idempotence**
    - For any FAQ item, toggling open then closed SHALL return item to collapsed state (answer not visible)
    - Use `fc.record({ question: fc.string({ minLength: 1 }), answer: fc.string({ minLength: 1 }) })`
    - Render `AccordionItem` with `isOpen=false`, simulate toggle to open, simulate toggle to close, assert answer is not in document
    - Tag: `// Feature: accredian-enterprise-page, Property 5: FAQ accordion toggle idempotence`
    - _Requirements: 11.5_

- [ ] 18. Build Testimonials Section
  - [ ] 18.1 Create `components/sections/TestimonialsSection.tsx`
    - Client Component (`"use client"`) accepting `testimonials: Testimonial[]`
    - Render active testimonial (logo, quote, organization name)
    - Next/previous navigation controls; wrap from last→first and first→last
    - Track `activeIndex` state
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [ ]* 18.2 Write property test for testimonial carousel bounds invariant
    - **Property 6: Testimonial carousel bounds invariant**
    - For any testimonials array of length N, active index SHALL always remain within `[0, N-1]`
    - Use `fc.array(testimonialArb, { minLength: 1 })` and `fc.nat()` for click count
    - Click next/previous arbitrary times; assert `activeIndex` is always `>= 0` and `< N`
    - Tag: `// Feature: accredian-enterprise-page, Property 6: Testimonial carousel bounds invariant`
    - _Requirements: 12.5_

  - [ ]* 18.3 Write property test for testimonial carousel round-trip
    - **Property 7: Testimonial carousel round-trip**
    - For any array of length N and any starting index, advancing N times then reversing N times SHALL return to original index
    - Use same generator; click next N times then previous N times; assert final index equals starting index
    - Tag: `// Feature: accredian-enterprise-page, Property 7: Testimonial carousel round-trip`
    - _Requirements: 12.6_

- [ ] 19. Build CTA Section
  - [ ] 19.1 Create `components/sections/CTASection.tsx`
    - Server Component
    - Display headline, supporting tagline, and "Contact Us" button
    - Button is a small `"use client"` wrapper that calls `openModal()`
    - Single-column centered layout on mobile
    - _Requirements: 13.1, 13.2, 13.3_

- [ ] 20. Checkpoint — Ensure all section components compile and render
  - Run `npm run build` in `accredian/` to confirm all section components compile without TypeScript errors
  - Run `npm test` to confirm all tests written so far pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 21. Build Enquiry Modal and Form
  - [ ] 21.1 Create `components/ui/EnquiryForm.tsx`
    - Client Component (`"use client"`) accepting `onSuccess: () => void`
    - Fields: full name, work email, organization name, phone number, message (all required)
    - Client-side validation on submit: show field-level error messages for empty fields and invalid email format
    - On valid submit: call `submitEnquiry(payload)`, show loading state, handle success (call `onSuccess`, clear fields) and error (show inline error, retain fields)
    - _Requirements: 14.4, 14.5, 14.6, 14.7, 14.8, 14.9_

  - [ ]* 21.2 Write unit tests for `EnquiryForm`
    - Test: validation errors appear for each empty required field on submit
    - Test: validation error appears for invalid email format
    - Test: success banner appears and fields clear when mock API returns success
    - Test: error message appears and fields are retained when mock API returns error
    - _Requirements: 14.5, 14.6, 14.8, 14.9_

  - [ ]* 21.3 Write property test for enquiry form data integrity
    - **Property 8: Enquiry form data integrity**
    - For any valid `EnquiryPayload`, every field value submitted through `EnquiryForm` SHALL appear unchanged in the object passed to `submitEnquiry()`
    - Use `fc.record({ fullName: fc.string({ minLength: 1 }), workEmail: fc.emailAddress(), organizationName: fc.string({ minLength: 1 }), phoneNumber: fc.string({ minLength: 1 }), message: fc.string({ minLength: 1 }) })`
    - Mock `submitEnquiry` with a spy; fill form fields programmatically; submit; assert spy was called with exact payload
    - Tag: `// Feature: accredian-enterprise-page, Property 8: Enquiry form data integrity`
    - _Requirements: 14.10, 17.5_

  - [ ] 21.4 Create `components/ui/EnquiryModal.tsx`
    - Client Component (`"use client"`)
    - Read `isOpen` and `closeModal` from `useModal`
    - Render modal overlay and content panel; hidden when `isOpen` is false
    - Close on overlay click and on close button click
    - Trap keyboard focus within modal while open using `focus-trap` or manual `Tab`/`Shift+Tab` handling
    - Return focus to the triggering element on close
    - Pass `closeModal` as `onSuccess` to `EnquiryForm`
    - _Requirements: 14.1, 14.2, 14.3, 14.11, 18.3, 18.4_

  - [ ]* 21.5 Write unit tests for `EnquiryModal`
    - Test: modal is not visible when `isOpen` is false
    - Test: modal is visible when `isOpen` is true
    - Test: clicking the close button calls `closeModal`
    - Test: clicking the overlay calls `closeModal`
    - _Requirements: 14.1, 14.2, 14.3_

- [ ] 22. Wire everything together in `app/layout.tsx` and `app/page.tsx`
  - [ ] 22.1 Update `app/layout.tsx`
    - Wrap `{children}` with `<ModalProvider>` so all components can access modal context
    - Update page `<title>` and `<meta description>` to reflect Accredian Enterprise
    - _Requirements: 14.1_

  - [ ] 22.2 Update `app/page.tsx`
    - Import all data arrays and all section components
    - Compose the full page in order: `<Navbar>`, `<main>` containing all sections in sequence (Hero → Stats → Partners → Edge → Domains → Segmentation → Audience → CAT → Delivery → FAQ → Testimonials → CTA), `<Footer>`, `<EnquiryModal>`
    - Pass data arrays as props to the appropriate section components
    - Use `<SectionWrapper>` with matching `id` attributes for anchor navigation
    - Use semantic HTML: `<main>`, `<section>` inside each wrapper
    - _Requirements: 1.3, 16.1, 18.1_

- [ ] 23. Checkpoint — Full page integration
  - Run `npm run build` to confirm the full page compiles without errors
  - Run `npm test` to confirm all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 24. Accessibility and responsive polish
  - [ ] 24.1 Audit and fix semantic HTML across all components
    - Confirm `<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>` are used correctly
    - Confirm all meaningful images have descriptive `alt` text; decorative images have `alt=""`
    - Confirm all interactive elements are reachable via Tab key
    - _Requirements: 18.1, 18.2, 18.5_

  - [ ]* 24.2 Write axe-core accessibility smoke tests
    - Use `jest-axe` to run automated accessibility checks on: `Navbar`, `Footer`, `EnquiryModal` (open state), `FAQSection`, `TestimonialsSection`
    - Assert `expect(await axe(container)).toHaveNoViolations()` for each
    - _Requirements: 18.1, 18.2, 18.3, 18.6_

  - [ ] 24.3 Verify responsive layout at all three breakpoints
    - Confirm no horizontal overflow at 375px, 768px, and 1280px viewport widths (use browser DevTools or a responsive test utility)
    - Fix any Tailwind class issues causing overflow or broken layouts
    - _Requirements: 16.1, 16.2, 16.3, 16.4_

- [ ] 25. Write README
  - Update `accredian/README.md` with:
    - **Setup instructions**: prerequisites (Node.js version), `npm install`, `npm run dev`, `npm test`, `npm run build`
    - **Approach taken**: incremental section-by-section build, static data layer, ModalContext pattern, mock API service, Tailwind v4 utility-first styling
    - **AI usage explanation**: describe how AI assistance was used during development (e.g., component scaffolding, type definitions, test generation)
    - **Improvements with more time**: real API integration, image optimization with actual partner/testimonial assets, animation/transitions, E2E tests with Playwright, Storybook for component documentation, i18n support
  - _Requirements: (documentation — supports all requirements)_

- [ ] 26. Final checkpoint — All tests pass, build succeeds
  - Run `npm run build` in `accredian/` — confirm zero TypeScript errors and successful build
  - Run `npm test` — confirm all tests (unit, property-based, accessibility) pass
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP build
- Each task references specific requirements for traceability
- Checkpoints at tasks 5, 20, 23, and 26 ensure incremental validation
- All 9 correctness properties from the design document are covered:
  - Property 1 → Task 12.2 · Property 2 → Task 12.3
  - Property 3 → Task 16.2 · Property 4 → Task 16.3
  - Property 5 → Task 17.2
  - Property 6 → Task 18.2 · Property 7 → Task 18.3
  - Property 8 → Task 21.3 · Property 9 → Task 3.3
- Property tests use `fast-check` with a minimum of 100 iterations per property
- The mock `enquiryApi` can be replaced with a real endpoint by changing only `services/enquiryApi.ts`
