# Célune | The Digital Monograph of Skincare

![Célune Banner](./public/celune_about_hero_botanical_1776158822292.png)

**Célune** is a hyper-premium, editorial-grade e-commerce platform designed to bridge the gap between clinical efficacy and luxurious sensory experiences. It is not just a storefront; it is a "Digital Sanctuary" where cinematic architecture meets biological precision.

---

## 🏛️ The Vision: Architectural E-Commerce

Célune replaces traditional, friction-heavy shopping cart interfaces with a highly immersive, interactive experience. Every interaction is designed to mimic the premium unboxing of a luxury product—fluid, intentional, and high-fidelity.

> *"Where clinical precision meets the ancestral wisdom of botanical ritual."*

---

## ⚡ The Next.js 16 Technical Edge

Célune is optimized for the **Next.js 16 strictly non-blocking architecture**. By moving away from traditional data-fetching waterfalls, we achieve a "Zero-Blocking" navigation model.

### 1. Granular Streaming & Suspense Isolation
Unlike traditional App Router apps, Célune utilizes **Strict Route-Level Streaming**. We systematically identified "Blocking Navigation" signals and isolated them within nested `Suspense` boundaries. This allows the layout shell (Navbar, Smooth-Scroll logic, and Breadcrumbs) to hit the browser in **<50ms**, while dynamic botanical data streams in behind it.

### 2. Experimental `dynamicIO` & `"use cache"`
We leverage the Next.js 16 `dynamicIO` capability to ensure that no dynamic signal (like URL params or cookies) accidentally holds up the entire page render. By using the first-class `"use cache"` directive and `cacheTag` API, we achieve:
- **Instant Static-Speed Navigation**: Cached data is served as pre-serialized primitives.
- **Granular Revalidation**: Update specific botanical metrics without purging the entire page cache.

### 3. Progressive Hydration for GSAP
By using `@gsap/react`, we ensure that our complex hero animations only begin their calculation lifecycle *after* the initial server-streamed HTML has been painted, preventing hydration mismatches and maintaining 60FPS from the first frame.

### 4. Parallel Metadata Resolution
Célune implements `generateMetadata` in a way that resolves concurrently with page content. This prevents the "Block-until-SEO-ready" pattern, ensuring the user sees the page content even while the dynamic OG images and titles are being calculated in the background.

---

## 🛠️ Technical Architecture & Core Stack

Célune is built on a high-performance foundation designed for the next generation of e-commerce.

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/) — Exclusively utilizing `dynamicIO`, `cacheComponents`, and strictly non-blocking streaming.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — A zero-runtime CSS engine for maximum performance.
- **Kinematics**: [GSAP](https://gsap.com/) + `@gsap/react` — Orchestrated scroll-synchronized motion and split-text reveals.
- **3D Visualization**: [React Three Fiber](https://r3f.docs.pmnd.rs/) — Real-time rendering of hyper-premium botanical vessels.
- **Data Layer**: [Prisma 7](https://www.prisma.io/) + PostgreSQL — High-efficiency schema management and connection pooling.
- **Asset Management**: [Cloudinary](https://cloudinary.com/) — Multi-layered image optimization and dynamic CDN delivery.

---

## ✨ Key Features

### 1. The Alchemy of Care (Editorial Experience)
A cinematic monograph layout utilizing asymmetrical grids, Playfair Display typography, and 0px corner-radius "Architectural" rules.

### 2. The Ritual Gallery
A GSAP-powered horizontal scrolling experience that showcases the brand’s formulation rituals—Extraction, Infusion, and Preservation.

### 3. Parametric SEO Collections
A high-performance product catalog where filtering, sorting, and searching are handled via URL state, ensuring 100% indexation of dynamic query routes.

### 4. Streaming Performance
A robust streaming architecture with route-level Suspense boundaries, ensuring that the "Shell" (Navbar/Footer) is never blocked by data fetching.

---

## 🚀 Getting Started

### 1. Environment Configuration
Create a `.env` file at the root:
```env
DATABASE_URL="postgresql://..."
CLOUDINARY_URL="cloudinary://..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
```

### 2. Installations
```bash
npm install
```

### 3. Database Migration
```bash
npx prisma db push
```

### 4. Development Server
```bash
npm run dev
```

---

## 📸 Visual Identity

````carousel
![Hero Alchemy](./public/celune_about_hero_botanical_1776158822292.png)
<!-- slide -->
![Clinical Precision](./public/celune_about_clinical_precision_1776158863773.png)
<!-- slide -->
![Ritual Storytelling](./public/celune_about_ritual_application_1776158884498.png)
````

---

## ⚖️ Ethics & Philosophy
Célune prioritizes **bio-compatible formulas** and **wild-harvested botanicals**, ensuring that every product is as safe as it is luxurious. This digital platform mirrors that commitment through accessible, semantic HTML5 and clean, ethical code.

© 2026 Célune Atelier. All rights reserved.
