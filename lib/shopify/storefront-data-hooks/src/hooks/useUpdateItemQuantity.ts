import { useContext } from 'react'
import { Context } from '../Context'

import { useGetLineItem } from './useGetLineItem'

export function useUpdateItemQuantity() {
  const { client, cart, setCart, swell } = useContext(Context)
  const getLineItem = useGetLineItem()

  async function updateItemQuantity(
    itemId: string | number,
    quantity: number
  ) {
    if (itemId == null) {
      throw new Error('Must provide an item id')
    }

    if (quantity == null || Number(quantity) < 0) {
      throw new Error('Quantity must be greater than 0')
    }

    const lineItem = getLineItem(itemId)
    if (lineItem == null) {
      throw new Error(`Item with product ${itemId} not in cart`)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // const newCart = await client.checkout.updateLineItems(cart.id, [
    //   { id: lineItem.id, quantity },
    // ])
    const newCart = await swell.cart.updateItem(itemId, { quantity })
    setCart(newCart)
  }

  return updateItemQuantity
}
