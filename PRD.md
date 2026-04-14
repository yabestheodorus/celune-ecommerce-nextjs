# Product Requirements Document (PRD): Célune E-Commerce Platform

**Document Status:** Final  
**Product Version:** 1.0.0 (Launch Candidate)  
**Author:** AI Product Manager (Antigravity)  
**Date:** April 2026  

---

## 1. Executive Summary & Product Vision
**Célune** is a hyper-premium, editorial-grade skincare e-commerce platform designed to bridge the gap between clinical efficacy and luxurious sensory experiences. The platform replaces traditional, friction-heavy shopping cart interfaces with a highly immersive, interactive "Monograph" experience. 

Our vision is to provide a "Digital Sanctuary" where users not only purchase skincare but experience the brand's biological precision and luxurious ethos through cinematic web architecture, fluid animations, and instantaneous Server-Side performance.

---

## 2. Target Audience
* **The Clinical Minimalist:** Consumers seeking scientifically backed skincare but rejecting the sterile aesthetic of standard clinical brands.
* **The Luxury Aesthete:** High-income buyers who expect digital touchpoints to mirror the premium unboxing experience.
* **The Skintellectual:** Highly educated skincare users who need deep, accessible taxonomic data (Skin Condition filtering, Ingredient highlights) to make purchase decisions quickly.

---

## 3. Core Features & Capabilities

### 3.1 Immersive Home Architecture (`/`)
* **Interactive 3D Hero (`HeroCanvas` & `CreamModel`):** A real-time, WebGL-rendered 3D packaging component utilizing GSAP and React Three Fiber to establish immediate luxury positioning.
* **Flash Archive (`PromoFlash`):** A curated grid of highlight products utilizing algorithmic layouts.
* **Brand & Signature Value Statements:** Cinematic typography sections that employ scroll-triggered split-text animations.
* **Smooth Scrolling:** Integrated custom smooth-scroll wrappers for purely fluid vertical navigation.

### 3.2 The Collections Hub (`/collections`)
* **URL-State Server Component:** The entire product catalog operations (filtering, sorting, searching) bypass heavily lifting on the browser. Native URL query string injection allows Next.js to stream pre-filtered HTML instantly.
* **Liquid-Glass Filter Drawer:** A slide-out modal utilizing React Portals to bypass complex z-indexing and CSS layout trapping, allowing multi-select filtering for:
  * Product Highlight (New Arrival, Best Seller, etc.)
  * Skin Condition (Dry, Oily, Sensitive, etc.)
  * Product Type (Serum, Cleanser, Moisturizer)
* **Real-time Parametric SEO:** Dynamic `generateMetadata` evaluates filtering conditions (e.g. `?product_type=Serum`) and constructs highly precise automated `<title>` and `<meta>` properties on-the-fly for maximum indexation.

### 3.3 Dynamic Product Editorial (`/product/[slug]`)
* **Dual-Column Blueprint:** Sticky visual imagery on the left, paired with smoothly scrollable narrative text, clinical details, and add-to-cart operations on the right.
* **Contextual Navigation:** Fully animated global `Breadcrumbs` using Intersection Observer APIs to calculate viewport thresholds, spawning a compact, floating "top-left" replica when the user scrolls deep into product ingredients.
* **Social Proofing:** Integrated review models and rating architectures strictly following the Célune aesthetic.

---

## 4. Technical Architecture Stack
* **Framework:** Next.js 15+ (App Router). Exclusively utilizing App Router conventions with heavy emphasis on Server Components and nested route layouts to maximize LCP and FCP metrics.
* **Styling Engine:** Tailwind CSS v4. Managed entirely natively without `@apply` overkills, leveraging the theme configurations for strict "brand-burnt" and "brand-terracotta" design tokens.
* **Animation & Kinematics:** GSAP (GreenSock) working alongside `@gsap/react`, paired closely with native CSS `cubic-bezier` transitions to mimic Apple-level fluid friction. 
* **3D Rendering:** `three`, `@react-three/fiber`, and `@react-three/drei` managing performant Canvas contexts.

---

## 5. Design System & UX Principles (UI/UX Pro Max)
* **Visual Palette:** `brand-burnt` (#2D2622), `surface` (#FAF8F5), `white/50` opacity layers.
* **Typography Pairing:**
  * Primary Headings (Editorial flair): **Playfair Display** (Italicized, tight kerning).
  * Data & UI Components Tooling: **Inter** (Uppercase, `tracking-widest` for luxurious spacing) and **Outfit**.
* **Liquid Glass Methodology:** Avoidance of harsh shadows (`drop-shadow`). Intensive use of `backdrop-blur-xl` layered over low-opacity whites to create volumetric depth.

---

## 6. Future Roadmap (v1.1+)
1. **CMS Integration:** Migrate `lib/mockProducts.ts` strictly to an edge-cached CMS (e.g., Sanity or Contentful) to enable non-technical merchandising.
2. **Shopping Cart Edge Implementation:** Establish a global Zustand state layer strictly for cart management, paired with a Stripe serverless checkout integration.
3. **User Authentication Context:** Allow users to build "Ritual Profiles" via NextAuth for personalized recommendation queries.
