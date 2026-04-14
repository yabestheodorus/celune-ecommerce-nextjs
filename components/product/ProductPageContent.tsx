import { getProductBySlug } from "@/lib/queries";
import { notFound } from "next/navigation";
import Breadcrumbs from "../Breadcrumbs";
import ProductGallery from "./ProductGallery";
import ProductInfo from "./ProductInfo";
import ProductShipping from "./ProductShipping";
import ProductReviews from "./ProductReviews";
import { Metadata } from "next";



export async function generateMetadata({
    params
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) return { title: 'Product Not Found' };

    return {
        title: `${product.name} | Célune`,
        description: product.description || `Discover ${product.name} — a curated formulation by Célune.`,
        openGraph: {
            images: product.images?.[0] ? [product.images[0]] : [],
        }
    }
}

export default async function ProductPageContent({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        notFound()
    }

    return (
        <div className="flex flex-col min-h-screen bg-surface">
            <div className="pt-32 pb-16 px-6 md:px-12 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative items-start">

                {/* Left Side: Sticky Gallery aligned with Breadcrumbs */}
                <div className="w-full lg:w-1/2 lg:sticky lg:top-32 h-fit flex flex-col gap-y-6 lg:gap-y-8 z-20">
                    <Breadcrumbs items={[
                        { label: 'Home', href: '/' },
                        { label: 'Collections', href: '/collections' },
                        { label: product.name }
                    ]} />
                    <ProductGallery product={product} />
                </div>

                {/* Right Side: Scrollable Details */}
                <div className="w-full lg:w-1/2 flex flex-col relative z-20">
                    <ProductInfo product={product} />
                    <ProductShipping />
                </div>
            </div>

            {/* Full Width Community / Reviews Section */}
            <ProductReviews />
        </div>
    )
}