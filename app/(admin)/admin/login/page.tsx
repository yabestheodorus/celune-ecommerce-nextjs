"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("admin@celune.com");
  const [password, setPassword] = useState("celune2024");
  const [focused, setFocused] = useState<"email" | "password" | null>(null);

  return (
    <div className="min-h-screen flex overflow-hidden bg-[#F6F1EB]">

      {/* ── Left Panel — Editorial Image ── */}
      <div className="hidden lg:flex relative w-[55%] shrink-0 flex-col overflow-hidden">
        <Image
          src="/images/collection_ambassador.png"
          alt="Célune Editorial"
          fill
          className="object-cover object-center scale-[1.02]"
          priority
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        {/* Top — Brand mark */}
        <div className="relative z-10 p-12">
          <div className="flex items-center gap-3">
            <span className="font-noto text-white text-2xl tracking-tight">Célune</span>
            <span className="w-px h-4 bg-white/30" />
            <span className="font-manrope text-[10px] uppercase tracking-[0.3em] text-white/50 font-bold">Editorial Portal</span>
          </div>
        </div>

        {/* Middle — Decorative line */}
        <div className="relative z-10 flex-1 flex items-center px-12">
          <div className="space-y-6">
            <div className="w-12 h-px bg-white/40" />
            <blockquote className="font-noto text-white text-3xl leading-[1.3] max-w-sm italic font-light">
              &ldquo;Formulated in silence.<br />Elevated in ritual.&rdquo;
            </blockquote>
            <p className="font-manrope text-[11px] uppercase tracking-[0.35em] text-white/40 font-bold">
              Célune — Conscious Skincare
            </p>
          </div>
        </div>

        {/* Bottom — Catalog note */}
        <div className="relative z-10 p-12 flex items-end justify-between">
          <div>
            <p className="font-manrope text-[10px] uppercase tracking-[0.3em] text-white/30 font-bold">Authorized Access</p>
            <p className="font-manrope text-[11px] text-white/50 mt-1">Internal catalog management portal.</p>
          </div>
          <div className="flex flex-col items-end gap-1">
            {["Identity", "Pricing", "Media", "Catalog"].map((item: string, i: number) => (
              <div key={item} className="flex items-center gap-2">
                <span className="font-manrope text-[9px] uppercase tracking-widest text-white/30 font-bold">{item}</span>
                <div className={`h-px bg-white/20 transition-all ${i === 0 ? "w-8" : i === 1 ? "w-5" : i === 2 ? "w-6" : "w-4"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Panel — Login Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 relative">

        {/* Subtle background texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #1a1c1a 1px, transparent 0)",
          backgroundSize: "28px 28px"
        }} />

        <div className="relative w-full max-w-sm">

          {/* Mobile brand mark */}
          <div className="lg:hidden mb-12 text-center">
            <p className="font-noto text-3xl text-[#1a1c1a] tracking-tight">Célune</p>
            <p className="font-manrope text-[10px] uppercase tracking-[0.3em] text-[#93461d] font-bold mt-1">Editorial Portal</p>
          </div>

          {/* Header */}
          <div className="mb-10">
            <p className="font-manrope text-[10px] uppercase tracking-[0.35em] font-bold text-[#93461d] mb-3">Welcome back</p>
            <h1 className="font-noto text-[36px] leading-tight text-[#1a1c1a] tracking-tight">
              Sign in to<br />your portal
            </h1>
            <p className="font-manrope text-[12px] text-[#1a1c1a]/40 mt-3 leading-relaxed">
              Manage your catalog, inventory, and editorial releases.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>

            {/* Email */}
            <div className={`relative rounded-2xl border transition-all duration-300 ${focused === "email" ? "border-[#93461d]/40 shadow-[0_0_0_4px_rgba(147,70,29,0.06)]" : "border-[#1a1c1a]/10"} bg-white/60 backdrop-blur-sm`}>
              <label className={`absolute left-5 transition-all duration-200 font-manrope font-bold uppercase tracking-[0.2em] pointer-events-none ${focused === "email" || email ? "top-3 text-[9px] text-[#93461d]" : "top-1/2 -translate-y-1/2 text-[11px] text-[#1a1c1a]/30"}`}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent px-5 pb-4 pt-7 text-[14px] font-manrope text-[#1a1c1a] focus:outline-none rounded-2xl"
              />
            </div>

            {/* Password */}
            <div className={`relative rounded-2xl border transition-all duration-300 ${focused === "password" ? "border-[#93461d]/40 shadow-[0_0_0_4px_rgba(147,70,29,0.06)]" : "border-[#1a1c1a]/10"} bg-white/60 backdrop-blur-sm`}>
              <label className={`absolute left-5 transition-all duration-200 font-manrope font-bold uppercase tracking-[0.2em] pointer-events-none ${focused === "password" || password ? "top-3 text-[9px] text-[#93461d]" : "top-1/2 -translate-y-1/2 text-[11px] text-[#1a1c1a]/30"}`}>
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                className="w-full bg-transparent px-5 pb-4 pt-7 pr-14 text-[14px] font-manrope text-[#1a1c1a] focus:outline-none rounded-2xl"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-[#1a1c1a]/30 hover:text-[#93461d] transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
              </button>
            </div>

            {/* Dev credentials hint */}
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#93461d]/5 border border-[#93461d]/10">
              <div className="w-1.5 h-1.5 rounded-full bg-[#93461d] animate-pulse shrink-0" />
              <p className="font-manrope text-[10px] text-[#93461d]/70 font-medium leading-relaxed">
                Dev credentials pre-filled. Click Sign In to continue.
              </p>
            </div>

            {/* Submit */}
            <Link href="/admin/dashboard" className="block pt-2">
              <button
                type="button"
                className="group w-full flex items-center justify-between gap-4 px-7 py-4.5 bg-[#1a1c1a] text-white rounded-2xl font-manrope text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-[#93461d] transition-all duration-500 shadow-[0_10px_30px_rgba(26,28,26,0.15)] hover:shadow-[0_10px_30px_rgba(147,70,29,0.25)] active:scale-[0.98]"
              >
                <span>Sign In</span>
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5">
                  <ArrowRight size={14} strokeWidth={2} />
                </div>
              </button>
            </Link>
          </form>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-[#1a1c1a]/6">
            <div className="flex items-center justify-between">
              <p className="font-manrope text-[10px] text-[#1a1c1a]/30 uppercase tracking-widest font-bold">
                Célune © 2026
              </p>
              <Link href="/" className="font-manrope text-[10px] text-[#1a1c1a]/30 uppercase tracking-widest font-bold hover:text-[#93461d] transition-colors duration-300">
                ← Store
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
