import { useAddItemsToCart } from './useAddItemsToCart'
import { OptionInput } from '../types'

export function useAddItemToCart() {
  const addItemsToCart = useAddItemsToCart()

  async function addItemToCart(
    product_id: string,
    quantity: number,
    options?: OptionInput[]
  ) {
    const item = [{ product_id, quantity, options }]

    return await addItemsToCart(item)
  }

  return addItemToCart
}
