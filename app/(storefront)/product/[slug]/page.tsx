import React, { Suspense } from 'react'
import ProductLoading from './loading'
import ProductPageContent from '@/components/product/ProductPageContent'

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {

  return (
    <Suspense fallback={<ProductLoading />}>
      <ProductPageContent params={params} />
    </Suspense>
  )
}

