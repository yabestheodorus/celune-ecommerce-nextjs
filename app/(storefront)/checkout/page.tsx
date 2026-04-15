'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore, type CartItem } from '@/lib/store'
import { PiArrowLeftLight, PiCheckCircleLight, PiCreditCardLight, PiMapPinLight, PiTruckLight, PiSpinnerLight } from 'react-icons/pi'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { createTransaction } from '@/lib/actions/transaction'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

const CheckoutPage = () => {
  const router = useRouter()
  const { data: session } = authClient.useSession()
  const [mounted, setMounted] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // Prevents the empty-cart effect from firing after a successful purchase
  const isCompleted = useRef(false)
  const { items, getTotalPrice, clearCart } = useCartStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect if cart is empty after hydration — but not after a successful purchase
  useEffect(() => {
    if (mounted && items.length === 0 && !isCompleted.current) {
      router.push('/cart')
    }
  }, [mounted, items, router])

  useGSAP(() => {
    if (mounted) {
      const tl = gsap.timeline()
      tl.from('.checkout-header', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
        .from('.checkout-section', {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        }, '-=0.4')
        .from('.checkout-summary', {
          x: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out'
        }, '-=0.6')
    }
  }, { dependencies: [mounted], scope: containerRef })

  // Pre-filled Jakarta data
  const destinationAddress = {
    line1: "Jalan M.H. Thamrin No. 1",
    line2: "Kec. Menteng, Kota Jakarta Pusat",
    city: "Central Jakarta",
    province: "DKI Jakarta",
    zip: "10310",
    country: "Indonesia"
  }

  const handlePurchase = async () => {
    if (items.length === 0 || isProcessing) return

    // ── Auth guard: redirect to login if no session ──────────────────────
    if (!session) {
      router.push('/login?redirect=/checkout')
      return
    }

    setIsProcessing(true)
    setError(null)

    const subtotal = getTotalPrice()
    const shipping = subtotal > 1000000 ? 0 : 50000
    const total = subtotal + shipping

    const addressString = `${destinationAddress.line1}, ${destinationAddress.line2}, ${destinationAddress.city}, ${destinationAddress.province} ${destinationAddress.zip}, ${destinationAddress.country}`

    const result = await createTransaction(total, addressString, items)

    if (result.success) {
      isCompleted.current = true
      gsap.to('.checkout-content', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          clearCart()
          router.push('/order-success')
        }
      })
    } else {
      setError(result.error || "An unexpected error occurred.")
      setIsProcessing(false)
    }
  }

  const cardDetails = {
    number: "•••• •••• •••• 4242",
    expiry: "12/28",
    name: "Célune Aesthetic"
  }

  const subtotal = getTotalPrice()
  const shipping = subtotal > 1000000 ? 0 : 50000
  const total = subtotal + shipping

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-white pt-32 pb-24" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-7xl checkout-content">

        {/* Header */}
        <div className="checkout-header mb-16 max-w-4xl border-b border-brand-burnt/5 pb-10">
          <Link href="/cart" className="group flex items-center gap-2 text-brand-burnt/40 hover:text-brand-burnt transition-colors mb-8">
            <PiArrowLeftLight className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-inter text-[10px] uppercase tracking-widest font-bold">Back to archive</span>
          </Link>
          <h1 className="font-playfair text-5xl md:text-7xl text-brand-burnt italic leading-tight">
            Checkout <span className="font-light not-italic text-brand-burnt/20">&</span> Protocol
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-start">

          {/* Main Form Area */}
          <div className="space-y-16">

            {/* Shipping Address */}
            <section className="checkout-section">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-8 rounded-full bg-brand-burnt/5 flex items-center justify-center text-brand-burnt">
                  <PiMapPinLight size={18} />
                </div>
                <h2 className="font-playfair text-2xl text-brand-burnt italic">Destination Registry</h2>
              </div>

              <div className="p-8 border border-brand-burnt/5 rounded-2xl grid gap-6">
                <div className="space-y-1">
                  <p className="font-inter text-[10px] uppercase tracking-widest text-brand-burnt/40 font-bold">Shipping Address</p>
                  <p className="font-playfair text-xl text-brand-burnt italic">{destinationAddress.line1}</p>
                  <p className="font-inter text-sm text-brand-burnt/60">{destinationAddress.line2}</p>
                  <p className="font-inter text-sm text-brand-burnt/60">{destinationAddress.city}, {destinationAddress.province} {destinationAddress.zip}</p>
                  <p className="font-inter text-sm text-brand-burnt/60">{destinationAddress.country}</p>
                </div>
                <button className="text-left font-inter text-[10px] uppercase tracking-widest text-brand-terracotta font-bold underline underline-offset-4 hover:text-brand-burnt transition-colors">
                  Edit Destination
                </button>
              </div>
            </section>

            {/* Delivery Method */}
            <section className="checkout-section">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-8 rounded-full bg-brand-burnt/5 flex items-center justify-center text-brand-burnt">
                  <PiTruckLight size={18} />
                </div>
                <h2 className="font-playfair text-2xl text-brand-burnt italic">Logistics Synthesis</h2>
              </div>

              <div className="grid gap-4">
                <div className="p-6 bg-white/60 border border-brand-terracotta rounded-3xl flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-inter text-sm text-brand-burnt font-bold">Standard Radiant Service</span>
                    <span className="font-inter text-xs text-brand-burnt/60">Estimated 2-3 business days</span>
                  </div>
                  <span className="font-inter text-sm text-brand-burnt font-bold">IDR 50.000</span>
                </div>
                <div className="p-6 bg-white/20 border border-brand-burnt/5 rounded-3xl flex items-center justify-between opacity-50 cursor-not-allowed">
                  <div className="flex flex-col">
                    <span className="font-inter text-sm text-brand-burnt font-bold">Next Day Monograph Delivery</span>
                    <span className="font-inter text-xs text-brand-burnt/60">Delivered by tomorrow evening</span>
                  </div>
                  <span className="font-inter text-sm text-brand-burnt font-bold">IDR 120.000</span>
                </div>
              </div>
            </section>

            {/* Payment Method */}
            <section className="checkout-section">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-8 rounded-full bg-brand-burnt/5 flex items-center justify-center text-brand-burnt">
                  <PiCreditCardLight size={18} />
                </div>
                <h2 className="font-playfair text-2xl text-brand-burnt italic">Financial Settlement</h2>
              </div>

              <div className="p-8 border border-brand-burnt/5 rounded-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="space-y-1">
                    <p className="font-inter text-[10px] uppercase tracking-widest text-brand-burnt/40 font-bold">Card Details</p>
                    <p className="font-playfair text-xl text-brand-burnt italic tracking-wider">{cardDetails.number}</p>
                    <p className="font-inter text-xs text-brand-burnt/60">Expiry: {cardDetails.expiry} | {cardDetails.name}</p>
                  </div>
                  <div className="bg-brand-burnt/5 p-3 rounded-lg">
                    <PiCreditCardLight size={24} className="text-brand-burnt/40" />
                  </div>
                </div>
                <button className="font-inter text-[10px] uppercase tracking-widest text-brand-terracotta font-bold underline underline-offset-4 hover:text-brand-burnt transition-colors">
                  Modify Payment Method
                </button>
              </div>
            </section>

          </div>

          {/* Sticky Order Summary */}
          <aside className="checkout-summary lg:sticky lg:top-32">
            <div className="border border-brand-burnt/5 rounded-2xl p-10">
              <h3 className="font-playfair text-2xl text-brand-burnt italic mb-8 pb-4 border-b border-brand-burnt/5">Your Selections</h3>

              <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto no-scrollbar pr-2">
                {items.map((item: CartItem) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 group">
                    <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 border border-brand-burnt/5">
                      <Image
                        src={item.images?.[0] || "/images/flash1.jpeg"}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h4 className="font-playfair text-sm text-brand-burnt leading-tight italic truncate max-w-[180px]">{item.name}</h4>
                      <p className="font-inter text-[10px] text-brand-burnt/40 mb-1">{item.selectedSize || 'Standard'} × {item.quantity}</p>
                      <p className="font-inter text-xs text-brand-burnt font-bold tracking-tight">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 border-t border-brand-burnt/5 pt-8 mb-8">
                <div className="flex justify-between items-center text-xs font-inter">
                  <span className="text-brand-burnt/40 uppercase tracking-widest font-bold">Subtotal</span>
                  <span className="font-inter text-sm text-brand-burnt font-bold">IDR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-inter">
                  <span className="text-brand-burnt/40 uppercase tracking-widest font-bold">Shipping</span>
                  <span className="font-inter text-sm text-brand-burnt font-bold">{shipping === 0 ? 'Exempt' : `IDR ${shipping.toLocaleString()}`}</span>
                </div>
                <div className="h-px bg-brand-burnt/5 my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="font-playfair text-xl text-brand-burnt italic">Total</span>
                  <span className="font-inter text-2xl text-brand-terracotta font-medium tracking-tighter">IDR {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                disabled={isProcessing || items.length === 0}
                className="w-full relative overflow-hidden group py-6 bg-brand-burnt text-white rounded-2xl font-inter text-[11px] uppercase tracking-[0.4em] font-bold transition-all duration-700 hover:bg-brand-terracotta active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {isProcessing ? (
                    <PiSpinnerLight size={20} className="animate-spin" />
                  ) : (
                    <span>Complete Purchase</span>
                  )}
                </div>
                {!isProcessing && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                )}
              </button>

              {error && (
                <p className="mt-4 text-center font-inter text-[10px] uppercase tracking-widest text-red-500 font-bold">
                  {error}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
                <div className="flex items-center gap-1.5 grayscale opacity-40">
                  <PiCheckCircleLight size={12} />
                  <span className="font-inter text-[8px] uppercase tracking-widest font-bold">Secure Synthesis</span>
                </div>
                <div className="flex items-center gap-1.5 grayscale opacity-40">
                  <PiCheckCircleLight size={12} />
                  <span className="font-inter text-[8px] uppercase tracking-widest font-bold">Editorial Quality</span>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
