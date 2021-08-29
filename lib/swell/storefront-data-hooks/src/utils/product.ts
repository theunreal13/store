import { SwellProduct } from '../../../../../blocks/ProductView/ProductView'

export function prepareVariantsWithOptions(
  product: SwellProduct
) {
  return product.variants.map((variant) => {
    const optionsDictionary = variant.option_value_ids?.reduce((optionValues: any, optionId: string) => {
      product.options.find((option) => {
        const matchingOptionValue = option.values.find(value => {
          return value?.id === optionId
        })
        if (matchingOptionValue) {
          optionValues[`${option?.name?.toLowerCase()}`] = matchingOptionValue?.name
        }
      });
      return optionValues
    }, {});
    return {
      ...optionsDictionary,
      ...variant,
    }
  }) as any[]
}

export const getPrice = (price: string, currency: string) =>
  Intl.NumberFormat(undefined, {
    currency,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? price : '0'))

export function prepareVariantsImages(
  variants: any[],
  optionKey: any
): any[] {
  const imageDictionary = variants.reduce(
    (images, variant) => {
      if (variant[optionKey]) {
        images[variant[optionKey]] = variant.image
      }
      return images
    },
    {}
  )

  const images = Object.keys(imageDictionary).map((key) => {
    return {
      [optionKey]: key,
      src: imageDictionary[key] ?? 'https://via.placeholder.com/1050x1050',
    }
  })


  return images
}
