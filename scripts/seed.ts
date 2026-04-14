import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting master data seeding...");

  const [sc, hl, pc] = await Promise.all([
    prisma.skinCondition.count(),
    prisma.highlight.count(),
    prisma.productCategory.count(),
  ]);

  if (sc === 0) {
    console.log("Creating default Skin Conditions...");
    await prisma.skinCondition.createMany({
      data: [
        { name: "Dry Skin" },
        { name: "Oily Skin" },
        { name: "Combination Skin" },
        { name: "Sensitive Skin" },
        { name: "Aging Skin" },
      ],
    });
  } else {
    console.log("Skipping Skin Conditions (already seeded)");
  }

  if (hl === 0) {
    console.log("Creating default Highlights...");
    await prisma.highlight.createMany({
      data: [
        { name: "Best Seller" },
        { name: "New Arrival" },
        { name: "Special Release" },
        { name: "Skincare Set" },
      ],
    });
  } else {
    console.log("Skipping Highlights (already seeded)");
  }

  if (pc === 0) {
    console.log("Creating default Product Categories...");
    await prisma.productCategory.createMany({
      data: [
        { name: "Facial Cleanser" },
        { name: "Moisturizer" },
        { name: "Serum" },
        { name: "Sheet Mask" },
        { name: "Sunscreen" },
        { name: "Toner" },
        { name: "Exfoliator" },
        { name: "Eye Cream" },
      ],
    });
  } else {
    console.log("Skipping Product Categories (already seeded)");
  }

  console.log("✅ Master data seeding complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
