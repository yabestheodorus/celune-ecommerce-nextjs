"use server";

import { revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";

// ── Skin Conditions ───────────────────────────────────────────────────────────

export async function addSkinCondition(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  if (!name) return;
  await prisma.skinCondition.create({ data: { name } });
  revalidateTag("skin-conditions", "max");

}

export async function deleteSkinCondition(id: string) {
  await prisma.skinCondition.delete({ where: { id } });
  revalidateTag("skin-conditions", "max");

}

// ── Highlights ────────────────────────────────────────────────────────────────

export async function addHighlight(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  if (!name) return;
  await prisma.highlight.create({ data: { name } });
  revalidateTag("highlights", "max");

}

export async function deleteHighlight(id: string) {
  await prisma.highlight.delete({ where: { id } });
  revalidateTag("highlights", "max");

}

// ── Product Categories ────────────────────────────────────────────────────────

export async function addProductCategory(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  if (!name) return;
  await prisma.productCategory.create({ data: { name } });
  revalidateTag("product-categories", "max");

}

export async function deleteProductCategory(id: string) {
  await prisma.productCategory.delete({ where: { id } });
  revalidateTag("product-categories", "max");

}
