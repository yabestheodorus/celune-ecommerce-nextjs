'use client'

import React, { useState } from 'react'
import { useCartStore } from '@/lib/store'
import { type Product } from '@/lib/queries'

interface ProductInfoProps {
  product: Product
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [size, setSize] = useState('50ml')
  const [isAdded, setIsAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(product, size)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 3000)
  }

  return (
    <div className="flex flex-col pt-8 md:pt-0">
      <div className="flex flex-col gap-y-2 mb-6 border-b border-brand-burnt/10 pb-8">
        <span className="font-inter text-[10px] uppercase tracking-[0.4em] text-brand-terracotta font-bold">
          {product.type} // Protocol
        </span>
        <h1 className="font-playfair text-5xl md:text-6xl text-brand-burnt italic leading-tight">
          {product.name}
        </h1>
        <p className="font-inter text-brand-burnt/60 text-sm tracking-widest uppercase mt-2">
          {product.skinCondition?.join(' • ') || 'Advanced Skin Synthesis'}
        </p>
      </div>

      <div className="mb-8">
        <span className="font-outfit text-3xl font-light text-brand-terracotta">{product.price}</span>
      </div>

      <p className="font-inter text-[14px] leading-relaxed text-brand-burnt/70 mb-10 max-w-lg font-medium">
        A bespoke formulation designed for the modern aesthetic. This {product.type.toLowerCase()} utilizes concentrated lipid-restoration technology to target {product.skinCondition?.[0]?.toLowerCase() || 'compromised'} conditions while maintaining a luxurious sensory profile.
      </p>

      {/* Sizing Options */}
      <div className="flex flex-col gap-y-3 mb-12">
        <span className="font-inter text-[11px] uppercase tracking-widest text-brand-burnt/80 font-bold">Select Volume</span>
        <div className="flex gap-4">
          {['30ml', '50ml', '100ml'].map((s: string) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`px-8 py-3 font-inter text-xs tracking-[0.2em] cursor-pointer active:scale-95 transition-all duration-300 border ${size === s
                ? 'bg-brand-burnt text-white border-brand-burnt'
                : 'bg-transparent text-brand-burnt border-brand-burnt/20 hover:border-brand-burnt/40'
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Cart Actions */}
      <div className="flex flex-col gap-y-4 w-full max-w-lg mb-16">
        <button
          onClick={handleAddToCart}
          className="w-full bg-brand-terracotta text-white py-5 font-inter text-xs uppercase tracking-[0.3em] font-medium hover:bg-brand-burnt active:scale-95 transition-all duration-500 cursor-pointer shadow-lg shadow-brand-terracotta/20 hover:shadow-brand-burnt/40"
        >
          {isAdded ? 'Prescribed to Cart' : 'Add to Ritual'}
        </button>
        <div className="flex justify-between items-center px-2">
          <span className="font-inter text-[10px] uppercase tracking-widest text-brand-burnt/50">Complimentary Shipping</span>
          <span className="font-inter text-[10px] uppercase tracking-widest text-brand-burnt/50">Free Returns within 14 Days</span>
        </div>
      </div>

      {/* Ingredient Insight */}
      <div className="flex flex-col gap-y-6 pt-10 border-t border-brand-burnt/10 max-w-lg">
        <h3 className="font-playfair text-2xl italic text-brand-burnt">Key Alchemy</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-y-1 group cursor-pointer p-4 -ml-4 hover:bg-brand-burnt/5 rounded-2xl transition-all duration-500">
            <span className="font-inter text-xs font-bold uppercase tracking-widest text-brand-burnt/80 group-hover:text-brand-terracotta transition-colors">Wild Rosacea</span>
            <span className="font-inter text-[11px] text-brand-burnt/60 leading-relaxed">Soothes inflammation and reduces redness instantly.</span>
          </div>
          <div className="flex flex-col gap-y-1 group cursor-pointer p-4 -ml-4 hover:bg-brand-burnt/5 rounded-2xl transition-all duration-500">
            <span className="font-inter text-xs font-bold uppercase tracking-widest text-brand-burnt/80 group-hover:text-brand-terracotta transition-colors">Fermented Kelp</span>
            <span className="font-inter text-[11px] text-brand-burnt/60 leading-relaxed">Delivers concentrated micronutrients and supreme moisture.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
