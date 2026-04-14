import PromoFlash from "@/components/home/PromoFlash";
import { getProducts } from "@/lib/queries";
import Hero from "@/components/home/Hero";
import SignatureValue from "@/components/home/SignatureValue";
import BrandStatement from "@/components/home/BrandStatement";
import FAQ from "@/components/home/FAQ";


export default async function Home() {
  "use cache";
  const products = await getProducts();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <PromoFlash products={JSON.parse(JSON.stringify(products))} />
      <Hero />
      <SignatureValue />
      <BrandStatement />
      <FAQ />
    </div>
  );
}
