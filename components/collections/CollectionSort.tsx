'use client'

import React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export default function CollectionSort() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const sortBy = searchParams.get('sort') || 'newest'

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value && e.target.value !== 'newest') {
      params.set('sort', e.target.value)
    } else {
      params.delete('sort')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="shrink-0 flex items-center">
      <select 
        value={sortBy}
        onChange={handleSortChange}
        className="appearance-none bg-transparent font-inter text-xs uppercase tracking-widest text-brand-burnt border-b border-brand-burnt/30 pb-1 pr-4 outline-none cursor-pointer hover:border-brand-terracotta transition-colors"
      >
        <option value="newest">Latest Arrivals</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
      </select>
    </div>
  )
}
