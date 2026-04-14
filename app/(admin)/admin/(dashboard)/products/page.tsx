import { Search, MoreHorizontal, Archive } from "lucide-react";
import Image from "next/image";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";
import { getProducts, getProductCategories } from "@/lib/queries";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getProductCategories(),
  ]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <header className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
        <div>
          <h2 className="font-noto text-[38px] leading-[1.1] font-medium text-[#1a1c1a] tracking-tight">
            Inventory Registry
          </h2>
          <p className="font-manrope text-[11px] text-primary-terracotta mt-3 uppercase tracking-[0.25em] font-bold">
            Catalog of Curated Formulations
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1a1c1a]/20 group-hover:text-primary-terracotta transition-colors duration-500" size={16} strokeWidth={1.5} />
            <input
              type="text"
              placeholder="Search formulations..."
              className="font-manrope bg-surface-low border-none rounded-2xl pl-12 pr-6 py-3.5 text-[13px] w-72 focus:outline-none focus:ring-1 focus:ring-primary-terracotta/20 transition-all duration-500 placeholder:text-[#1a1c1a]/20"
            />
          </div>
          <AddProductModal categories={categories} />
        </div>
      </header>

      {/* Table */}
      <div className="bg-white/40 backdrop-blur-sm rounded-[40px] overflow-hidden border border-[#1a1c1a]/5 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-low/50">
                <th className="font-manrope px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1c1a]/40">Formulation</th>
                <th className="font-manrope px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1c1a]/40">Classification</th>
                <th className="font-manrope px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1c1a]/40">Valuation</th>
                <th className="font-manrope px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1c1a]/40">Status</th>
                <th className="font-manrope px-10 py-6 text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1c1a]/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a1c1a]/0">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    categories={categories}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-10 py-24 text-center">
                    <p className="font-noto text-xl text-[#1a1c1a]/20">The registry is currently breathing.</p>
                    <p className="font-manrope text-[10px] uppercase tracking-[0.3em] text-[#1a1c1a]/40 mt-3">Add your first formulation to begin.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="font-manrope px-10 py-8 bg-surface-low/30 flex items-center justify-between text-[10px] uppercase tracking-[0.3em] font-bold text-[#1a1c1a]/40">
          <p>Catalog Audit: {products.length} Entries Identified</p>
          <div className="flex gap-8">
            <button className="hover:text-primary-terracotta transition-colors duration-500 cursor-not-allowed opacity-30">Previous</button>
            <button className="hover:text-primary-terracotta transition-colors duration-500">Next Page</button>
          </div>
        </div>
      </div>
    </div>
  );
}

type Product = Awaited<ReturnType<typeof getProducts>>[number];
type Categories = { productTypes: string[]; skinConditions: string[]; highlights: string[] };

function ProductRow({ product, categories }: { product: Product; categories: Categories }) {
  const sku = product.id.slice(-8).toUpperCase();

  return (
    <tr className="group hover:bg-surface-low/50 transition-all duration-500 cursor-default border-transparent border-y">
      <td className="px-10 py-6">
        <div className="flex items-center gap-6">
          <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-white border border-[#1a1c1a]/5 shadow-sm group-hover:scale-105 transition-transform duration-700">
            <Image src={product.images?.[0] || "/placeholder.jpg"} alt={product.name} className="object-cover" fill sizes="56px" />
          </div>
          <div>
            <p className="font-noto text-[15px] font-medium text-[#1a1c1a] group-hover:text-primary-terracotta transition-colors duration-500">{product.name}</p>
            <p className="font-manrope text-[10px] text-[#1a1c1a]/30 font-bold uppercase tracking-widest mt-1">CLN—{sku}</p>
          </div>
        </div>
      </td>
      <td className="px-10 py-6">
        <span className="font-manrope text-[13px] text-[#1a1c1a]/60 font-medium">{product.type}</span>
      </td>
      <td className="px-10 py-6">
        <span className="font-manrope text-[15px] font-semibold text-[#1a1c1a]">{product.price}</span>
      </td>
      <td className="px-10 py-6">
        <span className="font-manrope inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-emerald-100 shadow-sm">
          Active
        </span>
      </td>
      <td className="px-10 py-6 text-right">
        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-700">
          <EditProductModal product={product} categories={categories} />
          <button className="p-2.5 hover:bg-white hover:text-primary-terracotta rounded-xl text-[#1a1c1a]/30 transition-all duration-500 shadow-sm">
            <Archive size={16} strokeWidth={1.5} />
          </button>
          <button className="p-2.5 hover:bg-white hover:text-primary-terracotta rounded-xl text-[#1a1c1a]/30 transition-all duration-500 shadow-sm">
            <MoreHorizontal size={16} strokeWidth={1.5} />
          </button>
        </div>
      </td>
    </tr>
  );
}
