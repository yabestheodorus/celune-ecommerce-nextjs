'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { TbShoppingBag } from 'react-icons/tb'
import { useCartStore } from '@/lib/store'
import { authClient } from '@/lib/auth-client'
import { LogOut, Menu, ShoppingBagIcon, UserRound, X } from 'lucide-react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Navbar = () => {
  const { data: session } = authClient.useSession()
  const [mounted, setMounted] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const cartCount = useCartStore((state) => state.getItemCount())
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMobileMenuOpen])

  useGSAP(() => {
    if (isProfileOpen) {
      gsap.fromTo('.profile-dropdown',
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power4.out' }
      )
    }
  }, [isProfileOpen])

  useGSAP(() => {
    if (isMobileMenuOpen) {
      gsap.fromTo('.mobile-menu',
        { opacity: 0, x: '100%' },
        { opacity: 1, x: '0%', duration: 0.35, ease: 'power3.out' }
      )
    }
  }, [isMobileMenuOpen])

  const navMenu = [
    { name: "Home", href: "/" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
  ]

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-[100] bg-surface/90 backdrop-blur-md border-b border-brand-burnt/5">
        <div className="w-full px-6 md:px-16 py-4 md:py-6">
          <div className="flex items-center justify-between">

            {/* Desktop nav links */}
            <div className='hidden md:flex items-center gap-x-2'>
              {navMenu.map((item, index) => (
                <Link key={index} href={item.href} className="text-sm font-base font-outfit text-mineral-800 hover:bg-terracotta-300 rounded-full px-6 py-2 transition-colors duration-300">
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden rounded-full bg-terracotta-200 text-text-primary w-10 h-10 flex items-center justify-center hover:bg-terracotta-300 transition-colors cursor-pointer"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>

            {/* Logo */}
            <Link href="/" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="text-3xl md:text-4xl font-base font-playfair text-brand-terracotta italic tracking-tight">Célune</span>
            </Link>

            {/* Right actions */}
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

              {/* Profile — desktop only */}
              {mounted && (
                <div className="hidden md:flex ml-4 pl-4 border-l border-brand-burnt/10 items-center gap-4 relative" ref={dropdownRef}>
                  {session ? (
                    <div className="relative">
                      <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="w-8 h-8 rounded-full overflow-hidden border border-brand-burnt/10 hover:border-brand-terracotta transition-colors cursor-pointer"
                      >
                        {session.user.image ? (
                          <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-brand-burnt/5 flex items-center justify-center text-[10px] font-bold text-brand-burnt uppercase">
                            {session.user.name.charAt(0)}
                          </div>
                        )}
                      </button>

                      {isProfileOpen && (
                        <div className="profile-dropdown absolute right-0 mt-4 w-72 border border-brand-burnt/70 rounded-2xl shadow-2xl overflow-hidden z-[110] origin-top-right bg-surface">
                          <div className="p-5 border-b border-brand-burnt/5 bg-brand-burnt/[0.02]">
                            <p className="font-playfair text-sm text-brand-burnt italic leading-tight truncate">
                              {session.user.name}
                            </p>
                            <p className="font-inter text-[10px] text-brand-burnt/40 uppercase tracking-widest truncate mt-1">
                              {session.user.email}
                            </p>
                          </div>

                          <div className="p-2">
                            <Link
                              href="/orders"
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-brand-burnt/5 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-terracotta-200 flex items-center justify-center text-brand-burnt/60 group-hover:text-brand-terracotta transition-colors">
                                <ShoppingBagIcon size={14} />
                              </div>
                              <span className="font-inter text-[11px] uppercase tracking-widest font-bold text-brand-burnt/60 group-hover:text-brand-burnt transition-colors">
                                Ritual Registry
                              </span>
                            </Link>

                            <Link
                              href="/profile"
                              onClick={() => setIsProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-brand-burnt/5 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-terracotta-200 flex items-center justify-center text-brand-burnt/60 group-hover:text-brand-terracotta transition-colors">
                                <UserRound size={14} />
                              </div>
                              <span className="font-inter text-[11px] uppercase tracking-widest font-bold text-brand-burnt/60 group-hover:text-brand-burnt transition-colors">
                                Identity Seal
                              </span>
                            </Link>
                          </div>

                          <div className="p-2 bg-brand-burnt/[0.02] border-t border-brand-burnt/5">
                            <button
                              onClick={async () => {
                                setIsProfileOpen(false)
                                await authClient.signOut()
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/5 transition-colors group text-left"
                            >
                              <div className="w-8 h-8 rounded-lg bg-red-500/5 flex items-center justify-center text-brand-burnt/40 group-hover:text-red-500 transition-colors">
                                <LogOut size={14} />
                              </div>
                              <span className="font-inter text-[11px] uppercase tracking-widest font-bold text-brand-burnt/40 group-hover:text-red-500 transition-colors">
                                Dissolve Session
                              </span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="text-[10px] uppercase tracking-[0.2em] font-bold text-brand-burnt/50 hover:text-brand-terracotta transition-colors duration-300"
                    >
                      Archive
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="mobile-menu absolute top-0 right-0 h-full w-[80vw] max-w-sm bg-surface flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-brand-burnt/5">
              <span className="text-2xl font-playfair text-brand-terracotta italic tracking-tight">Célune</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full bg-terracotta-200 w-9 h-9 flex items-center justify-center hover:bg-terracotta-300 transition-colors"
                aria-label="Close menu"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="flex flex-col px-4 py-6 gap-1 flex-1">
              {navMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-outfit text-sm text-mineral-800 hover:bg-terracotta-300 rounded-xl px-5 py-3 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Profile section in mobile menu */}
            {mounted && (
              <div className="px-4 pb-8 border-t border-brand-burnt/5 pt-4">
                {session ? (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3 px-5 py-3">
                      <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-burnt/10 shrink-0">
                        {session.user.image ? (
                          <img src={session.user.image} alt={session.user.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-brand-burnt/5 flex items-center justify-center text-[10px] font-bold text-brand-burnt uppercase">
                            {session.user.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-playfair text-sm text-brand-burnt italic truncate">{session.user.name}</p>
                        <p className="font-inter text-[10px] text-brand-burnt/40 uppercase tracking-widest truncate">{session.user.email}</p>
                      </div>
                    </div>

                    <Link
                      href="/orders"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-brand-burnt/5 transition-colors group"
                    >
                      <ShoppingBagIcon size={15} className="text-brand-burnt/50 group-hover:text-brand-terracotta transition-colors" />
                      <span className="font-inter text-[11px] uppercase tracking-widest font-bold text-brand-burnt/60 group-hover:text-brand-burnt transition-colors">
                        Ritual Registry
                      </span>
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-brand-burnt/5 transition-colors group"
                    >
                      <UserRound size={15} className="text-brand-burnt/50 group-hover:text-brand-terracotta transition-colors" />
                      <span className="font-inter text-[11px] uppercase tracking-widest font-bold text-brand-burnt/60 group-hover:text-brand-burnt transition-colors">
                        Identity Seal
                      </span>
                    </Link>

                    <button
                      onClick={async () => {
                        setIsMobileMenuOpen(false)
                        await authClient.signOut()
                      }}
                      className="flex items-center gap-3 px-5 py-3 rounded-xl hover:bg-red-500/5 transition-colors group text-left"
                    >
                      <LogOut size={15} className="text-brand-burnt/40 group-hover:text-red-500 transition-colors" />
                      <span className="font-inter text-[11px] uppercase tracking-widest font-bold text-brand-burnt/40 group-hover:text-red-500 transition-colors">
                        Dissolve Session
                      </span>
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-center w-full py-3 rounded-xl bg-terracotta-200 hover:bg-terracotta-300 transition-colors text-[11px] uppercase tracking-[0.2em] font-bold text-brand-burnt/70"
                  >
                    Archive
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
