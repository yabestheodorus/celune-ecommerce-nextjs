'use client'

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { PiFaders, PiX, PiCheck } from 'react-icons/pi'
import { type getProductCategories } from '@/lib/queries'

interface FilterDrawerProps {
  categories: Awaited<ReturnType<typeof getProductCategories>>
}

export default function FilterDrawer({ categories }: FilterDrawerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    highlights: [],
    skinConditions: [],
    productTypes: []
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sync state from URL
  useEffect(() => {
    const highlights = searchParams.getAll('highlight')
    const skinConditions = searchParams.getAll('skin_condition')
    const productTypes = searchParams.getAll('product_type')

    setActiveFilters({
      highlights,
      skinConditions,
      productTypes
    })
  }, [searchParams])

  const toggleFilter = (categoryKey: string, value: string, paramName: string) => {
    const current = [...activeFilters[categoryKey]]
    const index = current.indexOf(value)

    if (index === -1) {
      current.push(value)
    } else {
      current.splice(index, 1)
    }

    const newFilters = { ...activeFilters, [categoryKey]: current }
    setActiveFilters(newFilters)

    // Push to URL
    const params = new URLSearchParams(searchParams.toString())
    params.delete(paramName)
    current.forEach(v => params.append(paramName, v))
    params.delete('page') // reset pagination if existent

    router.push(`${pathname}?${params.toString()}`)
  }

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('highlight')
    params.delete('skin_condition')
    params.delete('product_type')
    router.push(`${pathname}?${params.toString()}`)
    setIsOpen(false)
  }

  const FilterGroup = ({ title, items, categoryKey, paramName }: { title: string, items: string[], categoryKey: string, paramName: string }) => (
    <div className="mb-8">
      <h3 className="font-playfair text-xl italic text-brand-burnt mb-4">{title}</h3>
      <div className="flex flex-col gap-y-3">
        {items.map((item: string) => {
          const isActive = activeFilters[categoryKey]?.includes(item)
          return (
            <div
              key={item}
              onClick={() => toggleFilter(categoryKey, item, paramName)}
              className="group flex items-center gap-x-3 cursor-pointer"
            >
              <div className={`w-4 h-4 border flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-brand-burnt border-brand-burnt' : 'border-brand-burnt/30 group-hover:border-brand-terracotta'}`}>
                {isActive && <PiCheck size={12} className="text-white" />}
              </div>
              <span className={`font-inter text-sm transition-colors duration-300 ${isActive ? 'text-brand-burnt font-medium' : 'text-brand-burnt/70 group-hover:text-brand-terracotta'}`}>
                {item}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )

  const activeCount = Object.values(activeFilters).flat().length

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-x-2 bg-white/20 backdrop-blur-md border border-brand-burnt/10 px-5 py-2.5 rounded-full hover:bg-white/40 transition-colors duration-300"
      >
        <PiFaders size={18} className="text-brand-burnt" />
        <span className="font-inter text-xs uppercase tracking-widest font-medium text-brand-burnt">Filters</span>
        {activeCount > 0 && (
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-terracotta text-white text-[10px] font-bold ml-2">
            {activeCount}
          </span>
        )}
      </button>

      {/* Portal out of parent container to bypass sticky + backdrop-blur stacking context */}
      {mounted && createPortal(
        <>
          {/* Background Overlay */}
          <div
            className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-[90] transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsOpen(false)}
          />

          {/* Drawer */}
          <div className={`fixed top-0 right-0 h-full w-[90vw] md:w-[400px] bg-[#FAF8F5] z-[100] shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-brand-burnt/10">
              <h2 className="font-outfit text-lg tracking-widest uppercase text-brand-burnt">Refine</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black/5 rounded-full transition-colors duration-300 text-brand-burnt">
                <PiX size={20} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <FilterGroup title="Highlight" items={categories.highlights} categoryKey="highlights" paramName="highlight" />
              <FilterGroup title="Skin Condition" items={categories.skinConditions} categoryKey="skinConditions" paramName="skin_condition" />
              <FilterGroup title="Product Type" items={categories.productTypes} categoryKey="productTypes" paramName="product_type" />
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-brand-burnt/10 bg-white/50 backdrop-blur-xl flex gap-x-4">
              <button
                onClick={clearAll}
                className="flex-1 py-3 border border-brand-burnt/20 font-inter text-xs uppercase tracking-widest text-brand-burnt hover:bg-brand-burnt/5 transition-colors duration-300 active:scale-95"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 py-3 bg-brand-burnt font-inter text-xs uppercase tracking-widest text-white hover:bg-brand-terracotta transition-colors duration-300 active:scale-95"
              >
                Show Results
              </button>
            </div>

          </div>
        </>,
        document.body
      )}
    </>
  )
}
