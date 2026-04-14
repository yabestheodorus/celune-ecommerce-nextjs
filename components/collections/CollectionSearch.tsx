'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { PiMagnifyingGlass } from 'react-icons/pi'

export default function CollectionSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (query.trim()) {
      params.set('q', query.trim())
    } else {
      params.delete('q')
    }
    // Delete page if pagination exists to reset on new search
    params.delete('page') 
    
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="relative w-full md:w-64">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search archive..." 
        className="w-full bg-white/20 border border-brand-burnt/10 rounded-full py-2.5 pl-10 pr-4 font-inter text-sm text-brand-burnt placeholder-brand-burnt/40 outline-none focus:border-brand-terracotta transition-colors"
      />
      <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-burnt/40 hover:text-brand-terracotta transition-colors outline-none cursor-pointer">
        <PiMagnifyingGlass size={16} />
      </button>
    </form>
  )
}
