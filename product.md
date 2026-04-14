# Celune Product Data

Here are the full product objects generated for each of the folders in `celune-images`. They are formatted to match your Prisma database schema and follow the structure used in `mockProducts.ts`. You can copy and paste these directly into your seeder script or mock data file.

```javascript
export const fullProductList = [
  {
    name: "Divine Hydration Cream",
    type: "Face Cream", // Note: you may map this to 'Moisturizer' or 'Eye Cream' depending on your CATEGORIES
    price: "IDR 650K",
    priceNumber: 650000,
    images: [
      "/images/cream-0.jpeg",
      "/images/cream-1.jpeg",
      "/images/cream-2.jpeg"
    ],
    rating: 4.8,
    reviews: 342,
    sold: "3K+",
    skinCondition: ["Dry Skin", "Aging Skin", "Sensitive Skin"],
    highlight: ["Best Seller", "Skincare Set"],
    description: "A rich, velvety cream that provides intense hydration and helps to restore the skin's natural barrier. Perfect for achieving a youthful, plump appearance."
  },
  {
    name: "Purifying Gel Cleanser",
    type: "Facial Cleanser",
    price: "IDR 250K",
    priceNumber: 250000,
    images: [
      "/images/facial-cleanser-0.jpeg",
      "/images/facial-cleanser-1.jpeg"
    ],
    rating: 4.6,
    reviews: 185,
    sold: "1.5K+",
    skinCondition: ["Oily Skin", "Combination Skin"],
    highlight: ["New Arrival"],
    description: "A gentle yet effective gel cleanser that thoroughly removes makeup and impurities without stripping the skin of essential moisture."
  },
  {
    name: "Essential Daily Moisturizer",
    type: "Moisturizer",
    price: "IDR 420K",
    priceNumber: 420000,
    images: [
      "/images/moisturizer-0.jpeg",
      "/images/moisturizer-1.jpeg",
      "/images/moisturizer-2.jpeg"
    ],
    rating: 4.9,
    reviews: 520,
    sold: "5K+",
    skinCondition: ["Dry Skin", "Combination Skin", "Sensitive Skin"],
    highlight: ["Best Seller"],
    description: "A lightweight, fast-absorbing moisturizer that balances the skin and locks in moisture all day. Leaves the skin with a soft, radiant finish."
  },
  {
    name: "Radiance Nectar Serum",
    type: "Serum",
    price: "IDR 490K",
    priceNumber: 490000,
    images: [
      "/images/serum-0.jpeg",
      "/images/serum-1.jpeg",
      "/images/serum-2.jpeg"
    ],
    rating: 4.9,
    reviews: 214,
    sold: "2K+",
    skinCondition: ["Dry Skin", "Aging Skin", "Sensitive Skin"],
    highlight: ["Special Release"],
    description: "A potent serum packed with antioxidants and vitamins to brighten the complexion, reduce fine lines, and deliver a concentrated burst of nourishment."
  },
  {
    name: "Soothing Botanical Sheet Mask",
    type: "Sheet Mask",
    price: "IDR 85K",
    priceNumber: 85000,
    images: [
      "/images/sheet-mask-0.jpeg",
      "/images/sheet-mask-1.jpeg",
      "/images/sheet-mask-2.jpeg",
      "/images/sheet-mask-3.jpeg",
      "/images/sheet-mask-4.jpeg"
    ],
    rating: 5.0,
    reviews: 890,
    sold: "10K+",
    skinCondition: ["Sensitive Skin", "Dry Skin", "Combination Skin"],
    highlight: ["Best Seller", "New Arrival"],
    description: "An ultra-comforting sheet mask drenched in botanical extracts to calm irritation, reduce redness, and impart an instant, healthy glow."
  },
  {
    name: "Clarifying Balancing Toner",
    type: "Toner",
    price: "IDR 290K",
    priceNumber: 290000,
    images: [
      "/images/toner-0.jpeg",
      "/images/toner-1.jpeg",
      "/images/toner-2.jpeg"
    ],
    rating: 4.7,
    reviews: 156,
    sold: "1K+",
    skinCondition: ["Oily Skin", "Combination Skin"],
    highlight: ["New Arrival"],
    description: "A refreshing liquid formula that refines pores, sweeps away dead skin cells, and perfectly preps the skin to absorb the rest of your routine."
  }
];
```

### Next Steps 🚀
1. Move the image files from `downloads/celune-images/` into your public folder (e.g. `public/images/`).
2. Insert these objects directly into your database using your Prisma seeder or your custom dashboard.
