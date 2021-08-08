/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useMemo, useState, useEffect } from 'react'
import { Themed, jsx } from 'theme-ui'
import { Grid, Button } from '@theme-ui/components'
import OptionPicker from '@components/common/OptionPicker'
import { NextSeo } from 'next-seo'
import { useUI } from '@components/ui/context'
import { useAddItemToCart } from '@lib/shopify/storefront-data-hooks'
import {
  prepareVariantsWithOptions,
  prepareVariantsImages,
  getPrice,
} from '@lib/shopify/storefront-data-hooks/src/utils/product'
import { ImageCarousel, LoadingDots } from '@components/ui'
import ProductLoader from './ProductLoader'

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

interface Props {
  className?: string
  children?: any
  product: SwellProduct
  renderSeo?: boolean
  description?: string
  title?: string
}

const ProductBox: React.FC<Props> = ({
  product,
  renderSeo = true,
  description = product.description,
  title = product.name,
}) => {

  const [loading, setLoading] = useState(false)
  const addItem = useAddItemToCart()
  const colors: string[] | undefined = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'color')
    ?.values?.map((op) => op.name as string)

  const sizes: string[] | undefined = product?.options
    ?.find((option) => option?.name?.toLowerCase() === 'size')
    ?.values?.map((op) => op.name as string)

  const variants = useMemo(
    () => prepareVariantsWithOptions(product),
    [product]
  )
  const images = useMemo(() => prepareVariantsImages(variants, 'color'), [
    variants,
  ])

  const { openSidebar } = useUI()

  const [variant, setVariant] = useState(variants[0] || {})
  const [color, setColor] = useState(variant.color)
  const [size, setSize] = useState(variant.size)

  useEffect(() => {
    const newVariant = variants.find((variant) => {
      return (
        (variant.size === size || !size) && (variant.color === color || !color)
      )
    })

    if (variant.id !== newVariant?.id) {
      setVariant(newVariant)
    }
  }, [size, color, variants, variant.id])

  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem(variant.id, 1)
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  const allImages = images
    .map((image) => ({ src: image.src}))
    .concat(
      product.images &&
        product.images.filter(
          ({ file }) => !images.find((image) => image.file?.url === file?.url)
        ).map(productImage => ({ ...productImage, src: productImage.file?.url ?? 'https://via.placeholder.com/1050x1050' }))
    )

  return (
    <React.Fragment>
      {renderSeo && (
        <NextSeo
          title={title}
          description={description}
          openGraph={{
            type: 'website',
            title: title,
            description: description,
            images: [
              {
                url: product.images?.[0]?.file.url!,
                width: 800,
                height: 600,
                alt: title,
              },
            ],
          }}
        />
      )}
      <Grid gap={4} columns={[1, 2]}>
        <div>
          <div
            sx={{
              border: '1px solid gray',
              padding: 2,
              marginBottom: 2,
            }}
          >
            <ImageCarousel
              showZoom
              alt={title}
              width={1050}
              height={1050}
              priority
              onThumbnailClick={(index) => {
                if (images[index]?.color) {
                  setColor(images[index].color)
                }
              }}
              images={allImages?.length > 0 ? allImages : [{
                  src: `https://via.placeholder.com/1050x1050`,
                }]}
            ></ImageCarousel>
          </div>
        </div>
        <div sx={{ display: 'flex', flexDirection: 'column' }}>
          <span sx={{ mt: 0, mb: 2 }}>
            <Themed.h1>{title}</Themed.h1>
            <Themed.h4 aria-label="price" sx={{ mt: 0, mb: 2 }}>
              {getPrice(variant.price, 'USD')} 
              {/* TODO: add variant currency */}
            </Themed.h4>
          </span>
          <div dangerouslySetInnerHTML={{ __html: description! }} />
          <div>
            <Grid padding={2} columns={2}>
              {colors?.length && (
                <OptionPicker
                  key="Color"
                  name="Color"
                  options={colors}
                  selected={color}
                  onChange={(event) => setColor(event.target.value)}
                />
              )}
              {sizes?.length && (
                <OptionPicker
                  key="Size"
                  name="Size"
                  options={sizes}
                  selected={size}
                  onChange={(event) => setSize(event.target.value)}
                />
              )}
            </Grid>
          </div>
          <Button
            name="add-to-cart"
            disabled={loading}
            sx={{ margin: 2, display: 'block' }}
            onClick={addToCart}
          >
            Add to Cart {loading && <LoadingDots />}
          </Button>
        </div>
      </Grid>
    </React.Fragment>
  )
}

const ProductView: React.FC<{
  product: string | ShopifyBuy.Product
  renderSeo?: boolean
  description?: string
  title?: string
}> = ({ product, ...props }) => {
  return (
    <ProductLoader product={product}>
      {(productObject) => <ProductBox {...props} product={productObject} />}
    </ProductLoader>
  )
}
export default ProductView
