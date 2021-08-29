import { useContext } from 'react'
import { Context } from '../Context'

export async function useCartCount() {
  const { swell } = useContext(Context)
  const cart = await swell.cart.get();
  if (cart == null || cart.item_quantity < 1) {
    return 0
  }

  return cart.item_quantity;
}
