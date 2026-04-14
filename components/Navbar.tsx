'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { TbShoppingBag } from 'react-icons/tb'
import { useCartStore } from '@/lib/store'

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const cartCount = useCartStore((state) => state.getItemCount())

  useEffect(() => {
    setMounted(true)
  }, [])

  const navMenu = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/product" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
  ]

  return (
    <nav className="sticky top-0 left-0 right-0 z-[100] bg-surface/90 backdrop-blur-md border-b border-brand-burnt/5">
      <div className="w-full px-16 py-6 ">
        <div className="flex items-center justify-between">

          <div className='flex items-center gap-x-2'>
            {navMenu.map((item, index) => (
              <Link key={index} href={item.href} className="text-sm font-base font-outfit text-mineral-800 hover:bg-terracotta-300 rounded-full px-6 py-2 transition-colors duration-300">
                {item.name}
              </Link>
            ))}
          </div>

          <Link href="/" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="text-4xl font-base font-playfair text-brand-terracotta italic tracking-tight italic">Célune</span>
          </Link>

          <div className='flex items-center gap-x-2'>
            <button className='rounded-full bg-terracotta-200 text-text-primary w-10 h-10 flex items-center justify-center hover:bg-terracotta-300 transition-colors cursor-pointer'>
              <BsSearch size={17} />
            </button>
            <Link
              href="/cart"
              className='relative rounded-full bg-terracotta-300 text-text-primary w-10 h-10 flex items-center justify-center hover:bg-terracotta-400 transition-colors cursor-pointer group'
            >
              <TbShoppingBag size={20} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-burnt text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-lg animate-in zoom-in duration-500">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              href="/admin/login"
              className="ml-2 text-[10px] uppercase tracking-[0.2em] font-bold text-brand-burnt/50 hover:text-brand-terracotta transition-colors duration-300 border-l border-brand-burnt/10 pl-4 py-1.5"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar


