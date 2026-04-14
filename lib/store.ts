import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { type getProducts, type Product } from '@/lib/queries'

export type ProductItem = Product

export type CartItem = Product & {
  quantity: number
  selectedSize?: string
}

interface CartStore {
  items: CartItem[]
  addItem: (product: ProductItem, size?: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, size) => {
        const { items } = get()
        const existingItem = items.find(
          (item) => item.id === product.id && item.selectedSize === size
        )

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id && item.selectedSize === size
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })
        } else {
          set({
            items: [...items, { ...product, quantity: 1, selectedSize: size }],
          })
        }
      },

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        })
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.priceNumber || 0) * item.quantity,
          0
        )
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },
    }),
    {
      name: 'celune-cart-storage',
    }
  )
)
