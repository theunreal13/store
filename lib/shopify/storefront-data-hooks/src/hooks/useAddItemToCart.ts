import { OptionInput } from '../types'
import { useContext } from 'react'
import { Context } from '../Context'

export function useAddItemToCart() {
  const { swell } = useContext(Context)
  async function addItemToCart(
    product_id: string,
    quantity: number,
    options?: OptionInput[]
  ) {

    return await swell.cart.addItem({
      product_id,
      quantity,
      options
    })
  }

  return addItemToCart
}
