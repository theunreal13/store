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

/*
  prepareVariantsImages()

  This function distills the variants images into a non-redundant
  group that includes an option 'key' (most likely color). The
  datastructure coming into this function looks like this:

  {
    "shopifyId": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zMTc4NDQ4MTAzMDE4OA==",
    "image": image1,
    "color": "Red",
    "size": "Small"
  },
  {
    "shopifyId": "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaW1l2C8zMTc4NDQ4MTAzMDE4OA==",
    "image": image1,
    "color": "Red",
    "size": "Medium"
  },

  And condenses them so that there is only one unique
  image per key value:

  {
    "image": image1,
    "color": "Red",
  },
*/

export function prepareVariantsImages(
  variants: any[],
  // variants: Readonly<GatsbyTypes.ShopifyProductVariant[]>,
  optionKey: any
): any[] {
  // Go through the variants and reduce them into non-redundant
  // images by optionKey. Output looks like this:
  // {
  //   [optionKey]: image
  // }
  const imageDictionary = variants.reduce(
    (images, variant) => {
      if (variant[optionKey]) {
        images[variant[optionKey]] = variant.image
      }
      return images
    },
    {}
  )

  // prepare an array of image objects that include both the image
  // and the optionkey value.
  const images = Object.keys(imageDictionary).map((key) => {
    return {
      [optionKey]: key,
      src: imageDictionary[key] ?? 'https://via.placeholder.com/1050x1050',
    }
  })


  return images
}
