# Requirements Document

## Introduction

This document defines the requirements for the Accredian Enterprise landing page — a marketing and lead-generation page for Accredian's corporate training services. The page targets HR leaders, L&D managers, and enterprise decision-makers. It presents Accredian's value proposition, domain expertise, training methodology, social proof, and a clear path to enquiry.

The implementation is a Next.js 16 (App Router) application using React 19, TypeScript, and Tailwind CSS v4. The page is built incrementally with reusable components, is fully responsive, and integrates with an enquiry submission API (mocked initially, replaceable with a real endpoint).

---

## Glossary

- **Page**: The Accredian Enterprise landing page at the root route (`/`).
- **Navbar**: The top navigation bar present on all scroll positions.
- **Hero_Section**: The full-width introductory section at the top of the Page.
- **Stats_Section**: The section displaying key numerical achievements.
- **Partners_Section**: The section displaying logos of enterprise clients.
- **Edge_Section**: The "Accredian Edge" section highlighting strategic training differentiators.
- **Domains_Section**: The section listing domain expertise categories.
- **Segmentation_Section**: The "Tailored Course Segmentation" section with four course-fit cards.
- **Audience_Section**: The "Who Should Join?" section with four professional audience cards.
- **CAT_Section**: The "CAT Framework" section describing the learning methodology.
- **Delivery_Section**: The "How We Deliver Results" three-step process section.
- **FAQ_Section**: The frequently asked questions section with collapsible items.
- **Testimonials_Section**: The client testimonials carousel section.
- **CTA_Section**: The bottom call-to-action section prompting contact.
- **Footer**: The bottom footer with links, contact info, and social icons.
- **Enquiry_Modal**: The modal dialog containing the enquiry/contact form.
- **Enquiry_Form**: The form inside the Enquiry_Modal for capturing lead information.
- **Enquiry_API**: The backend endpoint (or mock) that receives Enquiry_Form submissions.
- **Viewport**: The visible browser window area.
- **Breakpoint_Mobile**: Viewport width ≤ 767px.
- **Breakpoint_Tablet**: Viewport width between 768px and 1023px.
- **Breakpoint_Desktop**: Viewport width ≥ 1024px.

---

## Requirements

### Requirement 1: Navigation Bar

**User Story:** As a visitor, I want a persistent navigation bar, so that I can quickly jump to any section of the page without scrolling manually.

#### Acceptance Criteria

1. THE Navbar SHALL render a logo, section anchor links, and an "Enquire Now" CTA button.
2. WHEN the Page loads, THE Navbar SHALL be fixed to the top of the Viewport and remain visible during scroll.
3. WHEN a section anchor link is clicked, THE Navbar SHALL smooth-scroll the Viewport to the corresponding section.
4. WHILE the Viewport is at Breakpoint_Mobile, THE Navbar SHALL collapse section links into a hamburger menu toggle.
5. WHEN the hamburger menu toggle is activated, THE Navbar SHALL display the section links in a dropdown or slide-out panel.
6. WHEN the hamburger menu is open and a link is clicked, THE Navbar SHALL close the menu and scroll to the target section.
7. WHEN the hamburger menu is open and the toggle is activated again, THE Navbar SHALL close the menu.

---

### Requirement 2: Hero Section

**User Story:** As a visitor, I want a compelling hero section, so that I immediately understand Accredian's enterprise value proposition and know how to take action.

#### Acceptance Criteria

1. THE Hero_Section SHALL display a headline, a supporting subheadline, three value-proposition badges (Tailored Solutions, Industry Insights, Expert Guidance), and an "Enquire Now" CTA button.
2. THE Hero_Section SHALL display a hero image alongside the text content.
3. WHILE the Viewport is at Breakpoint_Desktop, THE Hero_Section SHALL display text and image in a two-column layout.
4. WHILE the Viewport is at Breakpoint_Mobile, THE Hero_Section SHALL stack text content above the image in a single-column layout.
5. WHEN the "Enquire Now" CTA button is clicked, THE Hero_Section SHALL open the Enquiry_Modal.

---

### Requirement 3: Stats / Track Record Section

**User Story:** As a visitor, I want to see quantified achievements, so that I can quickly assess Accredian's scale and credibility.

#### Acceptance Criteria

1. THE Stats_Section SHALL display at least three stat items, each containing a numeric value and a descriptive label.
2. THE Stats_Section SHALL include stats for professionals trained, sessions delivered, and active learners.
3. WHILE the Viewport is at Breakpoint_Mobile, THE Stats_Section SHALL display stat items in a single-column or two-column stacked layout.
4. WHILE the Viewport is at Breakpoint_Desktop, THE Stats_Section SHALL display all stat items in a single horizontal row.

---

### Requirement 4: Partner Logos Section

**User Story:** As a visitor, I want to see logos of known enterprise clients, so that I can trust Accredian's track record with reputable organizations.

#### Acceptance Criteria

1. THE Partners_Section SHALL display logos for at least six enterprise partner organizations.
2. THE Partners_Section SHALL render each logo as an image with a descriptive `alt` attribute.
3. WHILE the Viewport is at Breakpoint_Mobile, THE Partners_Section SHALL display logos in a scrollable row or a wrapped grid.
4. IF a partner logo image fails to load, THEN THE Partners_Section SHALL display the partner name as fallback text.

---

### Requirement 5: Accredian Edge Section

**User Story:** As an L&D decision-maker, I want to understand what differentiates Accredian's training approach, so that I can evaluate it against alternatives.

#### Acceptance Criteria

1. THE Edge_Section SHALL display a section title, a subtitle, and a visual diagram or set of feature cards describing Accredian's strategic training differentiators.
2. THE Edge_Section SHALL present at least four distinct differentiator points.
3. WHILE the Viewport is at Breakpoint_Mobile, THE Edge_Section SHALL stack differentiator content vertically.

---

### Requirement 6: Domain Expertise Section

**User Story:** As a visitor, I want to browse Accredian's domain specializations, so that I can confirm they cover my organization's learning needs.

#### Acceptance Criteria

1. THE Domains_Section SHALL render domain cards from a data array, with each card containing an icon and a domain name.
2. THE Domains_Section SHALL include at least seven domain categories (e.g., Product & Innovation, Gen-AI, Leadership, Tech & Data, Operations, Digital Enterprise, Fintech).
3. WHILE the Viewport is at Breakpoint_Mobile, THE Domains_Section SHALL display domain cards in a two-column grid.
4. WHILE the Viewport is at Breakpoint_Desktop, THE Domains_Section SHALL display domain cards in a row of four or more columns.
5. FOR ALL subsets of domain cards rendered from the data array, THE Domains_Section SHALL render exactly as many card elements as there are items in the subset (count invariant).
6. WHEN the same domain data array is rendered twice, THE Domains_Section SHALL produce identical output (idempotence).

---

### Requirement 7: Tailored Course Segmentation Section

**User Story:** As a visitor, I want to understand how courses are categorized, so that I can identify the right training format for my team.

#### Acceptance Criteria

1. THE Segmentation_Section SHALL display exactly four segmentation cards: Program Specific, Industry Specific, Topic Specific, and Level Specific.
2. THE Segmentation_Section SHALL render each card with an image, a category title, and a subtitle listing example sub-categories.
3. WHILE the Viewport is at Breakpoint_Mobile, THE Segmentation_Section SHALL display cards in a single-column layout.
4. WHILE the Viewport is at Breakpoint_Desktop, THE Segmentation_Section SHALL display all four cards in a two-by-two or four-column grid.

---

### Requirement 8: Who Should Join Section

**User Story:** As a visitor, I want to see which professional profiles benefit from Accredian's programs, so that I can determine relevance for my team.

#### Acceptance Criteria

1. THE Audience_Section SHALL display exactly four audience cards: Tech Professionals, Non-Tech Professionals, Emerging Professionals, and Senior Professionals.
2. THE Audience_Section SHALL render each card with an icon, a role title, and a one-line description.
3. WHILE the Viewport is at Breakpoint_Mobile, THE Audience_Section SHALL display cards in a single-column or two-column layout.
4. WHILE the Viewport is at Breakpoint_Desktop, THE Audience_Section SHALL display all four cards in a single horizontal row.

---

### Requirement 9: CAT Framework Section

**User Story:** As a visitor, I want to understand Accredian's learning methodology, so that I can evaluate the quality and structure of their training approach.

#### Acceptance Criteria

1. THE CAT_Section SHALL display a section title, a subtitle, and a visual representation of the CAT (Customized, Adaptive, Transformative) framework.
2. THE CAT_Section SHALL describe each of the three framework pillars with a label and a brief explanation.
3. WHILE the Viewport is at Breakpoint_Mobile, THE CAT_Section SHALL display framework pillars stacked vertically.

---

### Requirement 10: How We Deliver Results Section

**User Story:** As a visitor, I want to understand Accredian's delivery process, so that I know what to expect when engaging their services.

#### Acceptance Criteria

1. THE Delivery_Section SHALL render process steps from a data array, with each step containing a step number, an icon, a title, and a description.
2. THE Delivery_Section SHALL display exactly three steps: Skill Gap Analysis, Customized Training Plan, and Flexible Program Delivery.
3. THE Delivery_Section SHALL render steps in the order they appear in the data array, preserving sequence.
4. FOR ALL valid data arrays of N steps, THE Delivery_Section SHALL render exactly N step elements (count invariant).
5. WHILE the Viewport is at Breakpoint_Mobile, THE Delivery_Section SHALL display steps in a vertical stacked layout.
6. WHILE the Viewport is at Breakpoint_Desktop, THE Delivery_Section SHALL display steps in a horizontal row.

---

### Requirement 11: FAQ Section

**User Story:** As a prospective enterprise client, I want to read answers to common questions, so that I can resolve doubts without contacting sales.

#### Acceptance Criteria

1. THE FAQ_Section SHALL render FAQ items from a data array, grouped into at least two categories (e.g., About the Course, About the Delivery, Miscellaneous).
2. THE FAQ_Section SHALL display each FAQ item as a collapsed accordion entry showing only the question by default.
3. WHEN a collapsed FAQ item is clicked, THE FAQ_Section SHALL expand that item to reveal the answer.
4. WHEN an expanded FAQ item is clicked, THE FAQ_Section SHALL collapse that item.
5. WHEN an FAQ item is toggled open and then toggled closed, THE FAQ_Section SHALL return the item to its original collapsed state (idempotence).
6. WHEN one FAQ item is expanded and a different FAQ item is clicked, THE FAQ_Section SHALL expand the new item (and MAY collapse the previously expanded item).

---

### Requirement 12: Testimonials Section

**User Story:** As a visitor, I want to read testimonials from existing enterprise clients, so that I can build confidence in Accredian's service quality.

#### Acceptance Criteria

1. THE Testimonials_Section SHALL render testimonial items from a data array, each containing a client logo, a quote, and the client organization name.
2. THE Testimonials_Section SHALL include testimonials from at least three clients.
3. WHEN the next navigation control is activated, THE Testimonials_Section SHALL advance to the next testimonial, wrapping from the last item to the first.
4. WHEN the previous navigation control is activated, THE Testimonials_Section SHALL move to the previous testimonial, wrapping from the first item to the last.
5. FOR ALL testimonial arrays of length N, THE Testimonials_Section SHALL keep the active index within the range [0, N-1] at all times (bounds invariant).
6. WHEN the active index is advanced N times and then reversed N times, THE Testimonials_Section SHALL return to the original active index (round-trip property).

---

### Requirement 13: Contact / CTA Section

**User Story:** As a visitor who is ready to engage, I want a prominent call-to-action section, so that I can easily initiate contact with Accredian.

#### Acceptance Criteria

1. THE CTA_Section SHALL display a headline, a supporting tagline, and a "Contact Us" button.
2. WHEN the "Contact Us" button is clicked, THE CTA_Section SHALL open the Enquiry_Modal.
3. WHILE the Viewport is at Breakpoint_Mobile, THE CTA_Section SHALL display content in a single-column centered layout.

---

### Requirement 14: Enquiry Modal and Form

**User Story:** As a visitor, I want to submit an enquiry through a modal form, so that I can request more information without leaving the page.

#### Acceptance Criteria

1. THE Enquiry_Modal SHALL be hidden by default and SHALL become visible only when triggered by a CTA button.
2. WHEN the Enquiry_Modal is open and the close control is activated, THE Enquiry_Modal SHALL hide.
3. WHEN the Enquiry_Modal is open and the user clicks outside the modal content area, THE Enquiry_Modal SHALL hide.
4. THE Enquiry_Form SHALL contain fields for: full name, work email, organization name, phone number, and a message/requirement field.
5. IF the Enquiry_Form is submitted with any required field empty, THEN THE Enquiry_Form SHALL display a field-level validation error message for each empty required field.
6. IF the Enquiry_Form is submitted with an invalid email format, THEN THE Enquiry_Form SHALL display a validation error on the email field.
7. WHEN the Enquiry_Form is submitted with all required fields valid, THE Enquiry_Form SHALL send a request to the Enquiry_API containing exactly the values entered by the user.
8. WHEN the Enquiry_API returns a success response, THE Enquiry_Form SHALL display a success confirmation message and clear the form fields.
9. IF the Enquiry_API returns an error response, THEN THE Enquiry_Form SHALL display a user-readable error message without clearing the form fields.
10. FOR ALL valid form payloads, THE Enquiry_Form SHALL include every submitted field value in the API request without modification (data integrity property).
11. WHEN the Enquiry_Modal is opened and then closed without submitting, THE Enquiry_Form SHALL retain or clear its field values consistently (defined behavior on re-open).

---

### Requirement 15: Footer

**User Story:** As a visitor, I want a footer with navigation links and contact information, so that I can find additional resources and reach Accredian directly.

#### Acceptance Criteria

1. THE Footer SHALL display the Accredian brand name, navigation links (About, Blog, Why Accredian), a contact email address, a physical office address, and social media icon links.
2. THE Footer SHALL render social media links for Facebook, LinkedIn, Twitter/X, Instagram, and YouTube, each opening in a new browser tab.
3. THE Footer SHALL display a copyright notice including the current year and the legal entity name.
4. WHEN a Footer navigation link is clicked, THE Footer SHALL navigate to the correct destination URL.
5. WHILE the Viewport is at Breakpoint_Mobile, THE Footer SHALL stack its columns vertically.

---

### Requirement 16: Responsive Layout

**User Story:** As a visitor on any device, I want the page to be fully usable and visually coherent, so that I have a consistent experience regardless of screen size.

#### Acceptance Criteria

1. THE Page SHALL render without horizontal overflow at Breakpoint_Mobile (375px width).
2. THE Page SHALL render without horizontal overflow at Breakpoint_Tablet (768px width).
3. THE Page SHALL render without horizontal overflow at Breakpoint_Desktop (1280px width).
4. THE Page SHALL use fluid typography and spacing that scales appropriately across all three breakpoints.
5. WHEN images are rendered, THE Page SHALL use responsive image sizing (e.g., `next/image` with appropriate `sizes` prop) to avoid layout shift.

---

### Requirement 17: API Integration — Enquiry Submission

**User Story:** As a developer, I want a clean API integration layer for enquiry submissions, so that the mock can be swapped for a real endpoint without changing component code.

#### Acceptance Criteria

1. THE Enquiry_API integration SHALL be encapsulated in a dedicated service module, separate from UI components.
2. THE Enquiry_API service SHALL accept a typed payload matching the Enquiry_Form fields and return a typed response.
3. WHERE a real API endpoint is unavailable, THE Enquiry_API service SHALL use a mock implementation that simulates a 1–2 second delay and returns a success response.
4. IF the Enquiry_API request fails due to a network error, THEN THE Enquiry_API service SHALL return a structured error object rather than throwing an unhandled exception.
5. FOR ALL valid typed payloads passed to the Enquiry_API service, THE service SHALL include every field in the outgoing request without omission or mutation (round-trip data integrity).

---

### Requirement 18: Accessibility

**User Story:** As a user relying on assistive technology, I want the page to be accessible, so that I can navigate and interact with all content using a keyboard or screen reader.

#### Acceptance Criteria

1. THE Page SHALL use semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<footer>`, `<h1>`–`<h3>`, etc.) for all major structural regions.
2. THE Navbar SHALL be keyboard-navigable, with all links and the CTA button reachable via Tab key.
3. THE Enquiry_Modal SHALL trap keyboard focus within the modal while it is open.
4. WHEN the Enquiry_Modal is closed, THE Page SHALL return focus to the element that triggered the modal.
5. THE Page SHALL provide `alt` text for all meaningful images and empty `alt=""` for decorative images.
6. THE Page SHALL maintain a color contrast ratio of at least 4.5:1 for normal text and 3:1 for large text, per WCAG 2.1 AA guidelines.
