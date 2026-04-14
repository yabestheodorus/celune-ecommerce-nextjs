import { cacheTag } from "next/cache";
import prisma from "@/lib/prisma";

// ── Queries ───────────────────────────────────────────────────────────────────

export async function getProducts() {
  "use cache";
  cacheTag("products");
  return prisma.product.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getProductBySlug(slug: string) {
  "use cache";
  cacheTag(`products-${slug}`);
  return prisma.product.findFirst({ where: { slug } });
}

export async function getProductCategories() {
  "use cache";
  cacheTag("skin-conditions");
  cacheTag("highlights");
  cacheTag("product-categories");
  const [skinConditionRows, highlightRows, productCategoryRows] = await Promise.all([
    prisma.skinCondition.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.highlight.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.productCategory.findMany({ orderBy: { createdAt: "asc" } }),
  ]);
  return {
    productTypes: productCategoryRows.map((c) => c.name),
    skinConditions: skinConditionRows.map((s) => s.name),
    highlights: highlightRows.map((h) => h.name),
  };
}
