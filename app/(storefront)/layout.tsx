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
    <>
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={null}>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
