import React from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ProductLoading() {
  return (
    <div className="flex flex-col min-h-screen bg-surface animate-pulse">
      <div className="pt-32 pb-16 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">
        
        {/* Left Side: Skeleton Gallery */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-32 h-fit flex flex-col gap-y-6 lg:gap-y-8 z-20">
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Collections', href: '/collections' },
              { label: '...' }
            ]} 
          />
          <div className="aspect-[3/4] md:aspect-[4/5] bg-brand-burnt/5 border border-brand-burnt/5 rounded-2xl" />
          <div className="flex gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-20 h-24 md:w-24 md:h-32 bg-brand-burnt/5 border border-brand-burnt/5 rounded-xl" />
            ))}
          </div>
        </div>

        {/* Right Side: Skeleton Info */}
        <div className="w-full lg:w-1/2 flex flex-col relative z-20 gap-y-8">
          <div className="space-y-4">
            <div className="h-4 w-32 bg-brand-burnt/10 rounded-full" />
            <div className="h-12 w-3/4 bg-brand-burnt/5 rounded-2xl" />
            <div className="h-6 w-1/4 bg-brand-burnt/5 rounded-lg" />
          </div>
          
          <div className="space-y-4 pt-8 border-t border-brand-burnt/5">
            <div className="h-4 w-full bg-brand-burnt/5 rounded-lg" />
            <div className="h-4 w-5/6 bg-brand-burnt/5 rounded-lg" />
            <div className="h-4 w-4/6 bg-brand-burnt/5 rounded-lg" />
          </div>

          <div className="h-16 w-full bg-brand-burnt/5 rounded-full mt-8" />
        </div>
      </div>
    </div>
  );
}
