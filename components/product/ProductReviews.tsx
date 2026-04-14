import React from 'react'
import { PiStarFourFill } from 'react-icons/pi'

const reviewsData = [
  {
    id: 1,
    name: "Eleanor V.",
    rating: 5,
    date: "October 12, 2024",
    title: "A revelation for compromised skin.",
    content: "After months of dealing with a damaged barrier, the Radiance Nectar healed my skin in less than a week. The scent is grounding, not overpowering. It feels like a genuine daily ritual rather than just another skincare step."
  },
  {
    id: 2,
    name: "Julian H.",
    rating: 5,
    date: "September 28, 2024",
    title: "Lightweight yet deeply restorative.",
    content: "I usually avoid oils or nectars entirely, but the fermentation process here creates something completely unique. It absorbs instantly, leaving a matte but radiant finish."
  },
  {
    id: 3,
    name: "Clara S.",
    rating: 4,
    date: "August 15, 2024",
    title: "Beautiful craft, waiting on the refill.",
    content: "The efficacy is undeniable. My only wish is for the refill program to expand to more rural areas, as I am hesitant to discard the beautiful heavy glass vessel."
  }
]

const ProductReviews = () => {
  return (
    <section className="w-full mt-32 py-24 border-t border-brand-burnt/10 bg-surface-container-low px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
        
        {/* Left Side: Aggregate & CTA */}
        <div className="md:col-span-4 flex flex-col items-start gap-y-6 sticky top-32 h-fit">
          <span className="font-inter text-[10px] uppercase tracking-[0.4em] font-bold text-brand-terracotta">
            Community Voice
          </span>
          <h2 className="font-playfair text-5xl md:text-6xl text-brand-burnt italic leading-tight">
            Ritual <br /> Experiences
          </h2>
          
          <div className="flex items-end gap-x-4 mt-4">
            <span className="font-outfit text-6xl text-brand-burnt font-light leading-none">4.9</span>
            <div className="flex gap-x-1 pb-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <PiStarFourFill key={s} size={16} className="text-brand-terracotta" />
              ))}
            </div>
          </div>
          <span className="font-inter text-xs text-brand-burnt/60 uppercase tracking-widest">Based on 142 Reviews</span>

          <button className="mt-8 px-8 py-4 border border-brand-burnt text-brand-burnt font-inter text-xs uppercase tracking-[0.2em] font-medium hover:bg-brand-burnt hover:text-white active:scale-95 transition-all duration-500 w-fit cursor-pointer">
            Write a Review
          </button>
        </div>

        {/* Right Side: Review List */}
        <div className="md:col-span-8 flex flex-col gap-y-12">
          {reviewsData.map((review) => (
            <div key={review.id} className="flex flex-col gap-y-4 pb-12 border-b border-brand-burnt/10 last:border-0 relative">
              <div className="flex justify-between items-center">
                <div className="flex gap-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <PiStarFourFill key={i} size={12} className="text-brand-terracotta" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <PiStarFourFill key={i} size={12} className="text-brand-burnt/20" />
                  ))}
                </div>
                <span className="font-inter text-[10px] uppercase tracking-widest text-brand-burnt/40 font-bold">
                  {review.date}
                </span>
              </div>

              <h4 className="font-playfair text-2xl text-brand-burnt italic">"{review.title}"</h4>
              
              <p className="font-inter text-[14px] leading-relaxed text-brand-burnt/70 font-medium">
                {review.content}
              </p>

              <div className="flex items-center gap-x-4 mt-2">
                <div className="w-8 h-8 rounded-full bg-brand-terracotta/20 flex items-center justify-center">
                  <span className="font-spectral text-xs italic text-brand-burnt">{review.name.charAt(0)}</span>
                </div>
                <span className="font-inter text-xs uppercase tracking-widest text-brand-burnt/80 font-bold">{review.name}</span>
                <span className="font-inter text-[10px] uppercase tracking-widest text-brand-terracotta bg-white/40 border border-white/20 px-2 py-0.5 rounded-full">
                  Verified Ritualist
                </span>
              </div>
            </div>
          ))}
          
          <button className="self-center font-inter text-xs text-brand-burnt uppercase tracking-[0.3em] font-bold hover:text-brand-terracotta active:scale-95 transition-all duration-300 py-4 underline underline-offset-8 decoration-brand-burnt/20 cursor-pointer">
            Load More Experiences
          </button>
        </div>

      </div>
    </section>
  )
}

export default ProductReviews
