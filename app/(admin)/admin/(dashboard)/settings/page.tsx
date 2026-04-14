import { cacheTag } from "next/cache";
import { Droplets, Sparkles, Tag } from "lucide-react";
import prisma from "@/lib/prisma";
import {
  addSkinCondition, deleteSkinCondition,
  addHighlight, deleteHighlight,
  addProductCategory, deleteProductCategory,
} from "./actions";
import MasterDataPanel from "./MasterDataPanel";

export default async function SettingsPage() {

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">

      {/* Page header */}
      <header className="mb-16">
        <div className="flex items-start gap-5">
          <div className="mt-1.5 w-px h-14 bg-linear-to-b from-primary-terracotta/60 to-transparent rounded-full" />
          <div>
            <p className="font-manrope text-[10px] uppercase tracking-[0.35em] font-bold text-primary-terracotta/70 mb-2">
              Admin / Settings
            </p>
            <h2 className="font-noto text-[40px] leading-[1.05] font-medium text-[#1a1c1a] tracking-tight">
              Configuration
            </h2>
            <p className="font-manrope text-[12px] text-[#1a1c1a]/40 mt-3 max-w-sm leading-relaxed">
              Manage master data that powers product classification across the catalog.
            </p>
          </div>
        </div>
      </header>

      {/* Section */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div>
            <p className="font-manrope text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1c1a]/30">
              Catalog Taxonomy
            </p>
            <h3 className="font-noto text-2xl text-[#1a1c1a] mt-0.5">Classification Data</h3>
          </div>
          <div className="flex-1 h-px bg-linear-to-r from-[#1a1c1a]/8 to-transparent ml-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <SkinConditionsPanel />
          <HighlightsPanel />
          <ProductCategoriesPanel />
        </div>
      </section>

    </div>
  );
}

async function SkinConditionsPanel() {
  "use cache";
  cacheTag("skin-conditions");
  const items = await prisma.skinCondition.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <MasterDataPanel
      title="Skin Conditions"
      subtitle="Skin Profile"
      icon={<Droplets size={13} strokeWidth={1.5} />}
      items={items}
      addAction={addSkinCondition}
      deleteAction={deleteSkinCondition}
      placeholder="e.g. Normal Skin"
    />
  );
}

async function HighlightsPanel() {
  "use cache";
  cacheTag("highlights");
  const items = await prisma.highlight.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <MasterDataPanel
      title="Collection Highlights"
      subtitle="Product Badges"
      icon={<Sparkles size={13} strokeWidth={1.5} />}
      items={items}
      addAction={addHighlight}
      deleteAction={deleteHighlight}
      placeholder="e.g. Limited Edition"
    />
  );
}

async function ProductCategoriesPanel() {
  "use cache";
  cacheTag("product-categories");
  const items = await prisma.productCategory.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <MasterDataPanel
      title="Product Categories"
      subtitle="Formulation Type"
      icon={<Tag size={13} strokeWidth={1.5} />}
      items={items}
      addAction={addProductCategory}
      deleteAction={deleteProductCategory}
      placeholder="e.g. Face Oil"
    />
  );
}
