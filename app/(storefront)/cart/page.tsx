'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore, type CartItem } from '@/lib/store'
import { PiTrashLight, PiPlusLight, PiMinusLight, PiArrowRightLight, PiShoppingBagOpenLight } from 'react-icons/pi'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const CartPage = () => {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useGSAP(() => {
    if (mounted) {
      if (items.length > 0) {
        gsap.from('.cart-item-card', {
          y: 20,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'all'
        })
      } else {
        gsap.from('.cart-empty-state', {
          scale: 0.95,
          opacity: 0,
          duration: 1,
          ease: 'power3.out'
        })
      }
    }
  }, { dependencies: [mounted, items.length], scope: containerRef })

  const handleRemove = (id: string, event: React.MouseEvent) => {
    const card = (event.currentTarget as HTMLElement).closest('.cart-item-card')
    if (card) {
      gsap.to(card, {
        opacity: 0,
        scale: 0.98,
        y: 10,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => {
          removeItem(id)
        }
      })
    } else {
      removeItem(id)
    }
  }

  if (!mounted) return null

  const subtotal = getTotalPrice()
  const shipping = subtotal > 1000000 ? 0 : 50000
  const total = subtotal + shipping

  return (
    <div className="min-h-screen bg-white flex flex-col pt-32" ref={containerRef}>
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 pb-32">

        {/* Header Section */}
        <div className="flex flex-col mb-12 border-b border-brand-burnt/5 pb-10">
          <span className="font-inter text-[10px] uppercase tracking-[0.4em] text-brand-terracotta font-bold mb-4">
            Shopping Cart // ARCHIVE
          </span>
          <h1 className="font-playfair text-5xl md:text-6xl text-brand-burnt italic leading-tight">
            Review Your <span className="text-brand-terracotta font-light not-italic">Selection</span>
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty-state flex flex-col items-center justify-center py-40">
            <div className="w-24 h-24 rounded-full bg-brand-burnt/5 flex items-center justify-center mb-10 overflow-hidden group">
              <PiShoppingBagOpenLight size={40} className="text-brand-burnt/20 group-hover:scale-110 transition-transform duration-700" />
            </div>
            <h2 className="font-playfair text-4xl md:text-5xl text-brand-burnt italic mb-6">The archive is currently <span className="text-brand-terracotta/40">void</span>.</h2>
            <div className="w-12 h-px bg-brand-burnt/10 mb-8"></div>
            <p className="font-inter text-sm text-brand-burnt/50 mb-12 max-w-sm text-center leading-relaxed px-6">
              Your ritual registry awaits its first synthesis. Explore our curated formulations to begin your discovery.
            </p>
            <Link
              href="/collections"
              className="group flex items-center gap-3 px-12 py-5 bg-brand-burnt text-white rounded-full font-inter text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-brand-terracotta transition-all duration-500 hover:scale-[1.02] active:scale-95"
            >
              <span>Discover Collections</span>
              <PiArrowRightLight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left: Cart Items List */}
            <div className="lg:col-span-8 flex flex-col gap-y-4">
              {items.map((item: CartItem) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="cart-item-card group relative p-6 border-b border-brand-burnt/5 flex items-center gap-6 md:gap-10 transition-all duration-500"
                >
                  {/* Product Visual */}
                  <div className="relative w-24 h-32 md:w-28 md:h-36 rounded-xl overflow-hidden bg-brand-burnt/3 shrink-0">
                    <Image
                      src={item.images?.[0] || "/images/flash1.jpeg"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Product Meta */}
                  <div className="flex-1 flex flex-col h-full min-w-0 py-1">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col">
                        <span className="font-inter text-[9px] uppercase tracking-widest text-brand-burnt/40 font-bold mb-1">
                          {item.type}
                        </span>
                        <h3 className="font-playfair text-xl md:text-2xl text-brand-burnt italic leading-tight truncate">
                          {item.name}
                        </h3>
                        <span className="font-inter text-[10px] text-brand-burnt/60 mt-1">
                          Volume: {item.selectedSize || 'Standard'}
                        </span>
                      </div>
                      <p className="font-outfit text-xl text-brand-burnt">
                        {item.price}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pt-6">
                      {/* Quantity Controls */}
                      <div className="flex items-center p-1 rounded-full border border-brand-burnt/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-brand-burnt/60 hover:bg-white hover:text-brand-burnt transition-all cursor-pointer"
                        >
                          <PiMinusLight size={14} />
                        </button>
                        <span className="w-10 text-center font-outfit text-sm text-brand-burnt font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-brand-burnt/60 hover:bg-white hover:text-brand-burnt transition-all cursor-pointer"
                        >
                          <PiPlusLight size={14} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={(e) => handleRemove(item.id, e)}
                        className="p-3 text-brand-burnt/30 hover:text-red-400 hover:bg-red-50/50 rounded-full transition-all duration-300 cursor-pointer"
                      >
                        <PiTrashLight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Summary Ledger */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="p-8 border-t border-brand-burnt/5 lg:border lg:border-brand-burnt/5 lg:rounded-2xl">
                <h2 className="font-playfair text-2xl text-brand-burnt italic mb-8 border-b border-brand-burnt/5 pb-4 text-center">Order Summary</h2>

                <div className="flex flex-col gap-y-4 mb-10">
                  <div className="flex justify-between items-center text-sm font-inter">
                    <span className="text-brand-burnt/60">Subtotal</span>
                    <span className="font-outfit text-lg text-brand-burnt">IDR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-inter">
                    <span className="text-brand-burnt/60">Shipping</span>
                    <span className="font-outfit text-lg text-brand-burnt">{shipping === 0 ? 'Free' : `IDR ${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="h-px bg-brand-burnt/10 w-full my-2"></div>
                  <div className="flex justify-between items-end">
                    <span className="font-playfair text-xl text-brand-burnt italic">Total</span>
                    <span className="font-outfit text-3xl text-brand-terracotta font-medium">IDR {total.toLocaleString()}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-brand-burnt text-white py-5 rounded-xl font-inter text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 hover:bg-brand-terracotta active:scale-95 flex items-center justify-center gap-x-2"
                >
                  <span>Checkout Protocol</span>
                  <PiArrowRightLight size={18} />
                </Link>

                <p className="mt-8 font-inter text-[10px] text-brand-burnt/40 text-center leading-relaxed">
                  Tax included. Shipping calculated at final step. <br />
                  <span className="underline cursor-pointer hover:text-brand-burnt uppercase tracking-tighter">View Shipping Policy</span>
                </p>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage


