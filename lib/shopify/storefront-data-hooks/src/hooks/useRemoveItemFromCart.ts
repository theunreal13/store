import { useContext } from 'react'
import { useRemoveItemsFromCart } from './useRemoveItemsFromCart'
import { Context } from '../Context'

export function useRemoveItemFromCart() {
  const { swell } = useContext(Context)
  async function removeItemFromCart(itemId: number | string) {
    if (itemId === '' || itemId == null) {
      throw new Error('ItemId must not be blank or null')
    }
    await swell.cart.removeItem(itemId);
  }

  return removeItemFromCart
}
