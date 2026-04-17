"use client";

import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/product/ProductCard";
import { type Product } from "@/lib/queries";


// Mirrors the server-side pipeline exactly — safe to swap for DB types later
function applyFiltersAndSort(products: Product[], searchParams: URLSearchParams): Product[] {
  const highlightFilters = searchParams.getAll("highlight");
  const skinConditionFilters = searchParams.getAll("skin_condition");
  const productTypeFilters = searchParams.getAll("product_type");
  const searchQuery = searchParams.get("q")?.toLowerCase() ?? "";
  const sortBy = searchParams.get("sort") ?? "newest";

  const filtered = products.filter((product: Product) => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery) && !product.type.toLowerCase().includes(searchQuery)) return false;
    if (highlightFilters.length > 0 && !product.highlight.some((h: string) => highlightFilters.includes(h))) return false;
    if (skinConditionFilters.length > 0 && !product.skinCondition.some((sc: string) => skinConditionFilters.includes(sc))) return false;
    if (productTypeFilters.length > 0 && !productTypeFilters.includes(product.type)) return false;
    return true;
  });

  if (sortBy === "price-asc") filtered.sort((a, b) => a.priceNumber - b.priceNumber);
  else if (sortBy === "price-desc") filtered.sort((a, b) => b.priceNumber - a.priceNumber);
  else if (sortBy === "rating") filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return filtered;
}

export default function FilteredProductGrid({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const filtered = applyFiltersAndSort(products, searchParams);

  if (filtered.length === 0) {
    return (
      <div className="py-32 flex flex-col items-center justify-center text-center">
        <span className="font-outfit text-brand-terracotta text-lg mb-4 tracking-widest">0 Results</span>
        <h2 className="font-playfair text-3xl md:text-4xl text-brand-burnt mb-4 italic">No specific formulas match.</h2>
        <p className="font-inter text-brand-burnt/60 max-w-sm">
          Consider adjusting your filters or browsing all collections to find your perfect regimen.
        </p>
      </div>
    );
  }

  return (
    <>
      <p className="font-inter text-sm text-brand-burnt/60 mb-8">
        Showing <span className="font-medium text-brand-burnt">{filtered.length}</span> Results
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {filtered.map((item: Product) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </>
  );
}
