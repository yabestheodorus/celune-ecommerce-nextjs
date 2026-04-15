import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getUserOrders } from '@/lib/actions/orders'
import { PiArrowLeftLight, PiShoppingBagOpenLight, PiPackageLight } from 'react-icons/pi'

type OrderItem = {
  id: string
  productName: string
  price: string
  quantity: number
  selectedSize: string | null
}

type Order = {
  id: string
  totalAmount: number
  status: string
  shippingAddress: string
  createdAt: Date
  items: OrderItem[]
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(date))

export default async function OrdersPage() {
  const result = await getUserOrders()

  if (!result.success) {
    redirect('/login')
  }

  const orders = result.orders as unknown as Order[]

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="w-full max-w-4xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-12 border-b border-brand-burnt/5 pb-10">
          <Link href="/" className="group flex items-center gap-2 text-brand-burnt/40 hover:text-brand-burnt transition-colors mb-8">
            <PiArrowLeftLight className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-inter text-[10px] uppercase tracking-widest font-bold">Back to home</span>
          </Link>
          <span className="font-inter text-[10px] uppercase tracking-[0.4em] text-brand-terracotta font-bold mb-4 block">
            Account // Ritual Registry
          </span>
          <h1 className="font-playfair text-5xl md:text-6xl text-brand-burnt italic leading-tight">
            My Transactions
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40">
            <div className="w-24 h-24 rounded-full bg-brand-burnt/5 flex items-center justify-center mb-10">
              <PiShoppingBagOpenLight size={40} className="text-brand-burnt/20" />
            </div>
            <h2 className="font-playfair text-3xl text-brand-burnt italic mb-4">No orders yet.</h2>
            <p className="font-inter text-sm text-brand-burnt/50 mb-10 max-w-xs text-center leading-relaxed">
              Your completed transactions will appear here.
            </p>
            <Link
              href="/product"
              className="font-inter text-[10px] uppercase tracking-[0.3em] font-bold text-brand-burnt/50 hover:text-brand-terracotta transition-colors underline underline-offset-4"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {orders.map((order) => (
              <div key={order.id} className="border border-brand-burnt/5 rounded-2xl overflow-hidden">

                {/* Order header */}
                <div className="flex items-center justify-between px-8 py-5 border-b border-brand-burnt/5 bg-brand-burnt/[0.015]">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-brand-burnt/5 flex items-center justify-center">
                      <PiPackageLight size={16} className="text-brand-burnt/40" />
                    </div>
                    <div>
                      <p className="font-inter text-[10px] uppercase tracking-widest text-brand-burnt/40 font-bold">Order ID</p>
                      <p className="font-mono text-xs text-brand-burnt/60 mt-0.5">{order.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-inter text-[10px] text-brand-burnt/40 uppercase tracking-widest">
                      {formatDate(order.createdAt)}
                    </p>
                    <span className="font-inter text-[9px] uppercase tracking-widest font-bold px-3 py-1 rounded-full bg-brand-burnt/5 text-brand-burnt/50">
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order items */}
                <div className="px-8 py-6 flex flex-col gap-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-playfair text-base text-brand-burnt italic">{item.productName}</p>
                        <p className="font-inter text-[10px] text-brand-burnt/40 mt-0.5 uppercase tracking-widest">
                          {item.selectedSize || 'Standard'} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-outfit text-sm text-brand-burnt font-medium">{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Order footer */}
                <div className="flex items-center justify-between px-8 py-5 border-t border-brand-burnt/5">
                  <span className="font-inter text-[10px] uppercase tracking-widest text-brand-burnt/40 font-bold">Total</span>
                  <span className="font-outfit text-xl text-brand-terracotta font-medium">
                    IDR {order.totalAmount.toLocaleString()}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}