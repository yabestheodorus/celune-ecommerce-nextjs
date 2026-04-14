import "dotenv/config";
import prisma from "../lib/prisma";


async function generateSlug(name: string, excludeId?: string) {
  let baseSlug = name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special chars
    .replace(/\s+/g, '-')      // Replace spaces with -
    .replace(/-+/g, '-')       // Replace multiple - with single -
    .trim();

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.product.findFirst({
      where: {
        slug: slug,
        NOT: excludeId ? { id: excludeId } : undefined
      },
      select: { id: true }
    });

    if (!existing) break;
    counter++;
    slug = `${baseSlug}-${counter}`;
  }

  return slug;
}

async function main() {
  console.log("Starting slug backfill...");
  const products = await prisma.product.findMany();
  
  for (const product of products) {
    // We check if the slug is missing or looks like a CUID (the default we set)
    // CUIDs start with 'c' and are usually 24-25 chars
    const isCuid = product.slug?.startsWith('c') && product.slug?.length >= 20;
    
    if (!product.slug || isCuid) {
      const newSlug = await generateSlug(product.name, product.id);
      console.log(`Updating product "${product.name}" with slug: ${newSlug}`);
      await prisma.product.update({
        where: { id: product.id },
        data: { slug: newSlug }
      });
    } else {
      console.log(`Skipping product "${product.name}" (already has slug: ${product.slug})`);
    }
  }
  
  console.log("Backfill complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
