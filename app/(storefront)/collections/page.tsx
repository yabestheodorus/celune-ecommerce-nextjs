import { Metadata } from 'next'
import { cacheTag } from 'next/cache'
import FilteredProductGrid from './FilteredProductGrid'
import FilterDrawer from '@/components/collections/FilterDrawer'
import CollectionSearch from '@/components/collections/CollectionSearch'
import CollectionSort from '@/components/collections/CollectionSort'
import CollectionsHeader from '@/components/collections/CollectionsHeader'
import Breadcrumbs from '@/components/Breadcrumbs'
import { getProducts, getProductCategories } from '@/lib/queries'
import { Suspense } from 'react'

// ── Data ──────────────────────────────────────────────────────────────────────

async function getCollectionData() {
  "use cache";
  cacheTag("products");
  cacheTag("skin-conditions");
  cacheTag("highlights");
  cacheTag("product-categories");

  const [products, categories] = await Promise.all([
    getProducts(),
    getProductCategories()
  ]);

  return { products, categories };
}

// ── Metadata (dynamic — reads searchParams for SEO, separate from page render)

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const params = await searchParams

  const paramToArray = (param: string | string[] | undefined): string[] => {
    if (!param) return []
    return Array.isArray(param) ? param : [param]
  }

  const highlightFilters = paramToArray(params.highlight)
  const productTypeFilters = paramToArray(params.product_type)
  const skinConditionFilters = paramToArray(params.skin_condition)

  let title = "The Monograph Collections | Célune"
  let description = "Curated formulations engineered to elevate your daily ritual. Discover the intersection of clinical efficacy and luxurious texture."

  if (productTypeFilters.length > 0) {
    title = `${productTypeFilters.join(' & ')} | Célune Collections`
    description = `Elevate your ritual with our premium selection of ${productTypeFilters.join(', ').toLowerCase()} products.`
  } else if (skinConditionFilters.length > 0) {
    title = `Skincare for ${skinConditionFilters.join(' & ')} | Célune`
    description = `Discover expert formulas curated specifically for ${skinConditionFilters.join(', ').toLowerCase()}.`
  } else if (highlightFilters.length > 0) {
    title = `${highlightFilters[0]} Archive | Célune Collections`
    description = `Explore the prestigious ${highlightFilters[0].toLowerCase()} from Célune.`
  }

  return {
    title,
    description,
    robots: { index: true, follow: true },
    openGraph: { title, description, type: 'website' },
  }
}

// ── Page (no searchParams — filtering happens client-side) ────────────────────

export default async function CollectionsPage() {
  const { products, categories } = await getCollectionData()

  return (
    <div className="flex flex-col min-h-screen bg-surface">

      {/* GSAP Animated Header — shows total catalog count, not filtered */}
      <CollectionsHeader formulationCount={products.length} />

      <div className="flex-1 w-full max-w-screen px-6 md:px-16 pb-24 mt-8">

        {/* Control Bar (Sticky) */}
        <div className="sticky top-20 z-40 bg-glass-bg backdrop-blur-xl py-4 border-b border-brand-burnt/10 mb-12 flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
          <div className="flex items-center gap-x-6 w-full xl:w-auto overflow-x-auto pb-2 xl:pb-0 hide-scrollbar shrink-0">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Collections' },
            ]} />
            <div className="h-4 w-px bg-brand-burnt/20 shrink-0" />
            <FilterDrawer categories={categories} />
          </div>
          <div className="flex items-center gap-x-4 w-full xl:w-auto shrink-0">
            <CollectionSearch />
            <CollectionSort />
          </div>
        </div>

        {/* Client-rendered grid — filtering, sorting, and result count happen here */}
        <Suspense fallback={<ProductGridSkeleton />}>
          <FilteredProductGrid products={JSON.parse(JSON.stringify(products))} />
        </Suspense>

      </div>
    </div>
  )
}

// ── Skeleton ──────────────────────────────────────────────────────────────────

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl bg-brand-burnt/5 animate-pulse aspect-3/4" />
      ))}
    </div>
  )
}
