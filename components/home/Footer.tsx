import React from 'react'
import { PiArrowRightLight, PiInstagramLogo, PiPinterestLogo, PiTwitterLogo } from 'react-icons/pi'

const Footer = () => {
  return (
    <footer className="w-full bg-brand-burnt pt-32 pb-12 px-12 text-[#FAF9F6] relative overflow-hidden">

      {/* Background Decorative Text */}
      <div className="absolute -bottom-10 -right-20 opacity-5 pointer-events-none">
        <span className="font-playfair text-[30rem] italic leading-none select-none">Célune</span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top Section: Newsletter & Brand */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 pb-20 border-b border-white/10">
          <div className="flex flex-col gap-y-8">
            <h2 className="font-playfair text-6xl md:text-7xl italic leading-tight">
              Join the <br /> Monograph
            </h2>
            <p className="font-inter text-white/60 text-lg max-w-md leading-relaxed">
              Curated stories on botanical science, seasonal rituals, and the art of intentional care. Private access to our seasonal Monographs.
            </p>

            {/* Glassmorphic Input Area */}
            <div className="flex w-full max-w-md mt-6 relative group">
              <input
                type="text"
                placeholder="Email Address"
                className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-full py-5 px-8 font-inter text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-all duration-500"
              />
              <button className="absolute right-2 top-2 bottom-2 aspect-square bg-brand-terracotta rounded-full flex items-center justify-center text-white hover:bg-white hover:text-brand-burnt transition-all duration-500 group-hover:scale-95">
                <PiArrowRightLight size={24} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-y-6">
              <span className="font-inter text-[10px] uppercase tracking-[0.4em] font-bold text-brand-terracotta">Boutique</span>
              <ul className="flex flex-col gap-y-4 font-spectral italic text-lg opacity-80">
                <li className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer">The Monograph</li>
                <li className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer">Scented Rituals</li>
                <li className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer">Botanical Oils</li>
                <li className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer">Gifting</li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-6">
              <span className="font-inter text-[10px] uppercase tracking-[0.4em] font-bold text-brand-terracotta">Essence</span>
              <ul className="flex flex-col gap-y-4 font-spectral italic text-lg opacity-80">
                <li className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer">Our Philosophy</li>
                <li className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer">Regenerative Farming</li>
                <li className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer">Concierge</li>
                <li className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer">Press</li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-6">
              <span className="font-inter text-[10px] uppercase tracking-[0.4em] font-bold text-brand-terracotta">Legal</span>
              <ul className="flex flex-col gap-y-4 font-spectral italic text-lg opacity-80">
                <li className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer">Shipping</li>
                <li className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer">Returns</li>
                <li className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer">Privacy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Social */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-y-8">
          <div className="flex items-center gap-x-12 opacity-50">
            <span className="font-inter text-[9px] uppercase tracking-[0.3em] font-bold">© 2024 Célune Studios</span>
            <span className="font-inter text-[9px] uppercase tracking-[0.3em] font-bold">Berlin / Bangkok</span>
          </div>

          <div className="flex items-center gap-x-8">
            <PiInstagramLogo size={22} className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer" />
            <PiPinterestLogo size={22} className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer" />
            <PiTwitterLogo size={22} className="hover:text-brand-terracotta transition-colors duration-300 cursor-pointer" />
          </div>

          <div className="flex items-center gap-x-2">
            <span className="font-inter text-[9px] uppercase tracking-[0.4em] font-bold opacity-30">Designed by</span>
            <span className="font-playfair italic text-brand-terracotta">The Curator</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
