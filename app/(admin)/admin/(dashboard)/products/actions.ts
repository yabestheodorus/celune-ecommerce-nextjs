"use server";

import { cacheTag, revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/cloudinary";

// ── Queries — MOVED TO lib/queries.ts ─────────────────────────────────────────



// ── Helpers ───────────────────────────────────────────────────────────────────

export async function generateSlug(name: string, preferredSlug?: string, excludeId?: string) {
  let baseSlug = (preferredSlug || name)
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


export async function createProduct(formData: FormData) {
  const priceNumber = parseInt(formData.get("priceNumber") as string, 10);

  const formatPrice = (n: number) => {
    if (n >= 1_000_000) return `IDR ${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    if (n >= 1_000) return `IDR ${Math.round(n / 1_000)}K`;
    return `IDR ${n}`;
  };

  // Resolve images: upload files to Cloudinary or use provided URL, preserving order
  const imageEntries = formData.getAll("images");
  const uploadPromises = imageEntries.map(async (entry) => {
    if (entry instanceof File && entry.size > 0) {
      return await uploadToCloudinary(entry);
    }
    if (typeof entry === 'string' && entry.trim().length > 0) {
      return entry;
    }
    return null;
  });

  const resolvedImages = (await Promise.all(uploadPromises)).filter((url): url is string => url !== null);

  const name = formData.get("name") as string;
  const preferredSlug = formData.get("slug") as string;
  const slug = await generateSlug(name, preferredSlug);

  await prisma.product.create({
    data: {
      name,
      slug,
      type: formData.get("type") as string,
      price: formatPrice(priceNumber),
      priceNumber,
      images: resolvedImages,
      description: (formData.get("description") as string) || null,
      rating: formData.get("rating") ? parseFloat(formData.get("rating") as string) : null,
      reviews: formData.get("reviews") ? parseInt(formData.get("reviews") as string, 10) : null,
      sold: (formData.get("sold") as string) || null,
      skinCondition: formData.getAll("skinCondition") as string[],
      highlight: formData.getAll("highlight") as string[],
    },
  });

  revalidateTag("products", "max");
}

export async function updateProduct(id: string, formData: FormData) {
  const priceNumber = parseInt(formData.get("priceNumber") as string, 10);

  const formatPrice = (n: number) => {
    if (n >= 1_000_000) return `IDR ${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1)}M`;
    if (n >= 1_000) return `IDR ${Math.round(n / 1_000)}K`;
    return `IDR ${n}`;
  };

  // Resolve images: upload files to Cloudinary or use provided URL, preserving order
  const imageEntries = formData.getAll("images");
  const uploadPromises = imageEntries.map(async (entry) => {
    if (entry instanceof File && entry.size > 0) {
      return await uploadToCloudinary(entry);
    }
    if (typeof entry === 'string' && entry.trim().length > 0) {
      return entry;
    }
    return null;
  });

  const resolvedImages = (await Promise.all(uploadPromises)).filter((url): url is string => url !== null);

  const name = formData.get("name") as string;
  const preferredSlug = formData.get("slug") as string;
  const slug = await generateSlug(name, preferredSlug, id);

  await prisma.product.update({
    where: { id },
    data: {
      name,
      slug,
      type: formData.get("type") as string,
      price: formatPrice(priceNumber),
      priceNumber,
      images: resolvedImages.length > 0 ? resolvedImages : undefined,
      description: (formData.get("description") as string) || null,
      rating: formData.get("rating") ? parseFloat(formData.get("rating") as string) : null,
      reviews: formData.get("reviews") ? parseInt(formData.get("reviews") as string, 10) : null,
      sold: (formData.get("sold") as string) || null,
      skinCondition: formData.getAll("skinCondition") as string[],
      highlight: formData.getAll("highlight") as string[],
    },
  });

  revalidateTag("products", "max");
}
