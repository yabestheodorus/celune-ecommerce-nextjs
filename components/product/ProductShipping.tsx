'use client'

import React, { useState, useRef } from 'react'
import { PiPlus, PiMinus } from 'react-icons/pi'

const shippingData = [
  {
    id: 1,
    title: 'Shipping Details',
    content: 'We offer complimentary express shipping globally on all orders over IDR 1,500,000. Under this amount, standard shipping rates apply. Delivery typically occurs within 2-4 business days via our premium logistics partners. Every order arrives in our signature Monograph unboxing experience, fully secured and climate-controlled.'
  },
  {
    id: 2,
    title: 'Returns & Exchanges',
    content: 'Due to the purity and botanical nature of our formulations, we accept returns on unopened products within 14 days of receipt. In the unlikely event of a reaction, our Concierge will arrange a specialized consultation and exchange.'
  },
  {
    id: 3,
    title: 'Sustainability Commitment',
    content: 'The glass vessels are crafted from 40% post-consumer recycled glass and are infinitely recyclable. Our outer packaging utilizes FSC-certified paper and soy-based inks. We operate a closed-loop refill program at select boutique locations.'
  }
]

const ProductShipping = () => {
  const [openId, setOpenId] = useState<number | null>(1)

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="w-full max-w-lg mt-12 flex flex-col pt-8 border-t border-brand-burnt/10 gap-y-2">
      {shippingData.map((item: { id: number; title: string; content: string }) => (
        <div key={item.id} className="border-b border-brand-burnt/10 py-5">
          <button
            onClick={() => toggleOpen(item.id)}
            className="w-full flex justify-between items-center group cursor-pointer"
          >
            <span className="font-outfit font-medium text-brand-burnt tracking-wide uppercase text-sm group-hover:text-brand-terracotta transition-colors duration-300">
              {item.title}
            </span>
            <div className="text-brand-burnt/50 group-hover:text-brand-terracotta transition-colors duration-300">
              {openId === item.id ? <PiMinus size={18} /> : <PiPlus size={18} />}
            </div>
          </button>
          
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openId === item.id ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0'
            }`}
          >
            <p className="font-inter text-[13px] text-brand-burnt/60 leading-relaxed">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductShipping
