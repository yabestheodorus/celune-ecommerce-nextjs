import "dotenv/config";

import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";
import * as os from "os";
import prisma from "@/lib/prisma";

// Configure Cloudinary from loaded environment variables

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const homeDir = os.homedir();

// Helper to upload image to cloudinary directly from local path
async function uploadLocalFile(filePath: string): Promise<string> {
  const absolutePath = filePath.replace('~', homeDir);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`File not found: ${absolutePath}`);
  }

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      absolutePath,
      {
        folder: "celune/products",
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error("Upload failed"));
        resolve(result.secure_url);
      }
    );
  });
}

const productsToSeed = [
  {
    name: "Divine Hydration Cream",
    type: "Moisturizer",
    price: "IDR 650K",
    priceNumber: 650000,
    images: [
      "~/Downloads/celune-images/cream/cream-0.jpeg",
      "~/Downloads/celune-images/cream/cream-1.jpeg",
      "~/Downloads/celune-images/cream/cream-2.jpeg"
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
      "~/Downloads/celune-images/facial cleanser/facial-cleanser-0.jpeg",
      "~/Downloads/celune-images/facial cleanser/facial-cleanser-1.jpeg"
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
      "~/Downloads/celune-images/moisturizer/moisturizer-0.jpeg",
      "~/Downloads/celune-images/moisturizer/moisturizer-1.jpeg",
      "~/Downloads/celune-images/moisturizer/moisturizer-2.jpeg"
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
      "~/Downloads/celune-images/serum/serum-0.jpeg",
      "~/Downloads/celune-images/serum/serum-1.jpeg",
      "~/Downloads/celune-images/serum/serum-2.jpeg"
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
      "~/Downloads/celune-images/sheet mask/sheet-mask-0.jpeg",
      "~/Downloads/celune-images/sheet mask/sheet-mask-1.jpeg",
      "~/Downloads/celune-images/sheet mask/sheet-mask-2.jpeg",
      "~/Downloads/celune-images/sheet mask/sheet-mask-3.jpeg",
      "~/Downloads/celune-images/sheet mask/sheet-mask-4.jpeg"
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
      "~/Downloads/celune-images/toner/toner-0.jpeg",
      "~/Downloads/celune-images/toner/toner-1.jpeg",
      "~/Downloads/celune-images/toner/toner-2.jpeg"
    ],
    rating: 4.7,
    reviews: 156,
    sold: "1K+",
    skinCondition: ["Oily Skin", "Combination Skin"],
    highlight: ["New Arrival"],
    description: "A refreshing liquid formula that refines pores, sweeps away dead skin cells, and perfectly preps the skin to absorb the rest of your routine."
  }
];

async function main() {
  console.log("Starting DB seed with Cloudinary uploads...");

  for (const product of productsToSeed) {
    console.log(`\nProcessing Product: ${product.name}`);
    const uploadedImages = [];

    for (const imagePath of product.images) {
      console.log(`  Uploading file: ${imagePath}`);
      try {
        const url = await uploadLocalFile(imagePath);
        console.log(`  -> Success! Cloudinary URL: ${url}`);
        uploadedImages.push(url);
      } catch (err) {
        console.error(`  -> Failed to upload ${imagePath}:`, err);
      }
    }

    console.log(` Saving ${product.name} to Prisma Database...`);
    const slug = product.name.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

    try {
      const createdProduct = await prisma.product.create({
        data: {
          name: product.name,
          slug,
          type: product.type,
          price: product.price,
          priceNumber: product.priceNumber,
          images: uploadedImages,
          rating: product.rating,
          reviews: product.reviews,
          sold: product.sold,
          skinCondition: product.skinCondition,
          highlight: product.highlight,
          description: product.description,
        }
      });
      console.log(` Saved ${product.name}! DB ID: ${createdProduct.id}`);
    } catch (dbError) {
      console.error(` Failed to save product to DB:`, dbError);
    }
  }

  console.log("\nSeeding fully complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
