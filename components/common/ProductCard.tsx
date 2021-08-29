/** @jsxRuntime classic */
/** @jsx jsx */
import { Themed, jsx } from 'theme-ui'
import { Card, Text } from '@theme-ui/components'
import { Link, ImageCarousel } from '@components/ui'
import { getPrice } from '@lib/swell/storefront-data-hooks/src/utils/product'
import { useState } from 'react'

type SwellProductOption = {
  id: string
  name: string
  values: any[]
}

export interface SwellProduct {
  id: string
  description: string
  name: string
  slug: string
  currency: string
  price: number
  images: any[]
  options: SwellProductOption[]
  variants: any[]
}

export interface ProductCardProps {
  className?: string
  product: SwellProduct
  imgWidth: number | string
  imgHeight: number | string
  imgLayout?: 'fixed' | 'intrinsic' | 'responsive' | undefined
  imgPriority?: boolean
  imgLoading?: 'eager' | 'lazy'
  imgSizes?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  imgWidth,
  imgHeight,
  imgPriority,
  imgLoading,
  imgSizes,
  imgLayout = 'responsive',
}) => {
  const handle = (product as any).handle
  // TODO: fix price for no variants
  // const productVariant: any = product?.variants[0] ?? { price: 5 }//product.variants[0]
  const price = getPrice(
    product.price + '',
    'USD' // TODO pass currency in variants //productVariant.priceV2.currencyCode
  )

  return (
    <Card
      sx={{
        maxWidth: [700, imgWidth || 540],
        p: 3,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* TODO: update link to /product */}
      <Link href={`/product/${handle}/`}>
        <div sx={{ flexGrow: 1 }}>
          <ImageCarousel
            currentSlide={product.images ? product.images.length - 1 : 0}
            width={imgWidth}
            height={imgHeight}
            priority={imgPriority}
            loading={imgLoading}
            layout={imgLayout}
            sizes={imgSizes}
            alt={product.name}
            images={
              product.images?.length ? product.images : [{
                src: `https://via.placeholder.com/${imgWidth}x${imgHeight}`,
              }]
            }
          />
        </div>
        <div sx={{ textAlign: 'center' }}>
          <Themed.h2 sx={{ mt: 4, mb: 0, fontSize: 14 }}>
            {product.name}
          </Themed.h2>
          <Text sx={{ fontSize: 12, mb: 2 }}>{price}</Text>
        </div>
      </Link>
    </Card>
  )
}

export default ProductCard
