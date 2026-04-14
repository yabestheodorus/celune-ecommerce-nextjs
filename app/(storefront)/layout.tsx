import { Suspense } from "react";
import SmoothScroll from "@/components/home/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <Suspense fallback={<div className="min-h-screen bg-surface" />}>
    <SmoothScroll>
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </SmoothScroll>
    // </Suspense>
  );
}
