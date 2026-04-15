'use client'

import React from 'react'

interface OrderItem {
  productName: string
  quantity: number
}

interface Order {
  id: string
  createdAt: Date | string
  totalAmount: number
  status: string
  items: OrderItem[]
}

interface EditorialArchiveProps {
  orders: Order[]
}

// Locale-safe date formatter
function formatDate(raw: Date | string): string {
  const d = new Date(raw)
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

// Locale-safe currency formatter
function formatCurrency(n: number): string {
  const str = String(n)
  return 'IDR ' + str.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const EditorialArchive = ({ orders }: EditorialArchiveProps) => {
  return (
    <div className="relative py-20 px-6 md:px-24 border-t border-brand-burnt/5 overflow-hidden">

      {/* Subtle atmospheric tint */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-0 w-full h-64 opacity-[0.025]"
          style={{ background: 'linear-gradient(to top, #BD663B, transparent)' }}
        />
      </div>

      <div className="relative max-w-screen-xl mx-auto">

        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <div className="flex items-center gap-5 mb-6">
              <span className="font-inter text-[9px] uppercase tracking-[0.5em] text-brand-terracotta font-bold">
                Ritual Registry
              </span>
              <div className="flex-1 h-px" style={{
                background: 'linear-gradient(to right, rgba(189,102,59,0.2), transparent)'
              }} />
            </div>
            <h2
              className="font-playfair italic text-brand-burnt leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Acquisition<br/>Chronology
            </h2>
          </div>

          <p className="font-playfair italic text-brand-burnt/25 text-lg md:pb-3">
            {orders.length === 0
              ? 'No entries yet'
              : `${orders.length} ${orders.length === 1 ? 'entry' : 'entries'}`}
          </p>
        </div>

        {/* Archive rows */}
        {orders.length > 0 ? (
          <div className="border-t border-brand-burnt/8">
            {orders.map((order, i) => (
              <div
                key={order.id}
                className="group border-b border-brand-burnt/5 py-10 md:py-12 cursor-pointer hover:bg-brand-burnt/[0.015] transition-colors duration-500 -mx-6 md:-mx-0 px-6 md:px-0"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

                  {/* Left block */}
                  <div className="flex items-start gap-10 md:gap-16 flex-1">
                    {/* Row number */}
                    <span className="font-inter text-[10px] tracking-widest text-brand-burnt/15 font-bold w-6 shrink-0 pt-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Product names — large editorial */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap gap-x-3 gap-y-1">
                        {order.items.map((item, j) => (
                          <span
                            key={j}
                            className="font-playfair italic text-brand-burnt transition-colors duration-500 group-hover:text-brand-terracotta"
                            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', opacity: j > 0 ? 0.45 : 1 }}
                          >
                            {item.productName}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 mt-3">
                        <span className="font-inter text-[9px] uppercase tracking-[0.35em] text-brand-burnt/25">
                          {formatDate(order.createdAt)}
                        </span>
                        <span className="w-px h-3 bg-brand-burnt/10" />
                        <span
                          className="font-inter text-[9px] uppercase tracking-[0.35em] font-bold"
                          style={{ color: order.status === 'COMPLETED' ? '#BD663B' : 'rgba(124,45,18,0.3)' }}
                        >
                          {order.status === 'COMPLETED' ? 'Fulfilled' : order.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right block */}
                  <div className="flex items-center gap-10 md:pl-8 shrink-0">
                    <span className="font-playfair italic text-brand-burnt/70 text-xl tracking-tight group-hover:text-brand-burnt transition-colors duration-500">
                      {formatCurrency(order.totalAmount)}
                    </span>

                    {/* Arrow */}
                    <div
                      className="w-10 h-10 rounded-full border border-brand-burnt/10 flex items-center justify-center transition-all duration-500 group-hover:border-brand-terracotta group-hover:bg-brand-terracotta"
                    >
                      <svg
                        width="14" height="14" viewBox="0 0 14 14" fill="none"
                        className="transition-colors duration-500 text-brand-burnt group-hover:text-white"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                      >
                        <path d="M2 7h10M7 2l5 5-5 5" />
                      </svg>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-t border-brand-burnt/8 py-24 flex flex-col items-center text-center">
            <div
              className="w-16 h-16 rounded-full border border-brand-burnt/10 flex items-center justify-center mb-8"
              style={{ background: 'rgba(189,102,59,0.03)' }}
            >
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-brand-burnt/25">
                <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M3 6h18l-1.68 11.39A2 2 0 0117.34 19H6.66a2 2 0 01-1.98-1.61L3 6z"/>
              </svg>
            </div>
            <p className="font-playfair italic text-brand-burnt/30 text-xl max-w-sm leading-relaxed">
              "Your archive remains untouched. Let the first ritual be written."
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default EditorialArchive
