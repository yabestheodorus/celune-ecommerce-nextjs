import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PiStarFourFill } from 'react-icons/pi'
import { type Product } from '@/lib/queries'


interface ProductCardProps {
  item: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const slug = item.slug;

  return (
    <Link href={`/product/${slug}`} className='block flex flex-col group relative bg-white/25 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-500 cursor-pointer'>
      {/* Image Container */}
      <div className='aspect-3/4 mb-3 overflow-hidden rounded-xl bg-white/5 flex items-center justify-center relative shadow-inner'>


        <div className='absolute top-3 right-3 flex flex-wrap max-w-full max-h-25 gap-2'>
          {item.highlight.map((highlight: string) => (
            <div key={highlight} className=' px-2 py-0.5 rounded-full border border-brand-burnt/30 text-[10px] uppercase tracking-widest text-brand-burnt font-bold z-10 bg-white/50 backdrop-blur-sm'>
              {highlight}
            </div>
          ))}
        </div>



        <div className='w-full h-full flex flex-col items-center justify-center relative'>
          <Image
            src={item.images?.[0] || "/images/flash1.jpeg"}
            alt={item.name}
            fill
            className='object-cover group-hover:scale-105 transition-all duration-500'
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      </div>

      {/* Social Proof: Rating & Sold Count */}
      <div className='flex justify-between items-center mb-3 mt-1'>
        <div className='flex gap-x-0.5 items-center'>
          <PiStarFourFill size={10} className='text-brand-terracotta' />
          <span className='font-outfit text-[11px] font-medium text-brand-burnt/80 ml-1'>
            {item.rating || 4.9}
          </span>
          <span className='font-inter text-[9px] text-brand-burnt/50 ml-0.5'>
            ({item.reviews || 128})
          </span>
        </div>
        <span className='font-inter text-[8px] uppercase tracking-[0.2em] font-bold text-brand-terracotta bg-brand-terracotta/10 px-2 py-0.5 rounded-full'>
          {item.sold || '1K+'} Sold
        </span>
      </div>

      {/* Product Details */}
      <div className='flex justify-between items-start w-full mt-auto gap-x-2  grow'>
        <div className='flex flex-col gap-y-0.5 flex-1 min-w-0 h-full'>
          <span className='font-inter text-[10px] uppercase tracking-widest text-brand-burnt/40 font-bold'>
            {item.type}
          </span>
          <h3 className='font-playfair text-xl text-brand-burnt leading-tight pr-4 '>
            {item.name}
          </h3>
        </div>
        <div className='flex flex-col items-end gap-y-0.5 shrink-0 pb-0.5'>
          <span className='font-inter text-[11px] line-through text-brand-burnt/30 font-medium'>
            IDR 590K
          </span>
          <span className='font-outfit text-xl font-medium text-brand-terracotta leading-tight'>
            {item.price}
          </span>
        </div>
      </div>


      {item.skinCondition.length > 0 && (
        <div className='mt-4'>
          <p className="font-manrope text-[9px] uppercase tracking-[0.25em] font-bold text-[#1a1c1a]/40 mb-2">Skin Conditions</p>
          <div className="flex flex-wrap gap-1.5">
            {item.skinCondition.map((s: string) => (
              <span key={s} className="font-manrope text-[10px] px-2.5 py-1 rounded-full bg-[#1a1c1a]/5 text-[#1a1c1a]/60 font-medium">{s}</span>
            ))}
          </div>
        </div>
      )}


      {/* CTA Hover State */}
      <div className='mt-5 pt-4 border-t border-brand-burnt/5 flex justify-between items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500'>
        <span className='font-inter text-[8px] uppercase tracking-[0.2em] font-bold text-brand-burnt'>
          Purchase
        </span>
        <div className='w-7 h-7 rounded-full border border-brand-burnt/20 flex items-center justify-center hover:bg-brand-terracotta hover:text-white transition-colors duration-300'>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14m-7-7 7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
