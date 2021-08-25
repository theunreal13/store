import { useCartItems } from './useCartItems'

export function useGetLineItem() {
  const cartItems = useCartItems()
  console.log('usecartitems', cartItems);

  function getLineItem(itemId: string | number): ShopifyBuy.LineItem | null {
    if (cartItems.length < 1) {
      return null
    }

    const item = cartItems.find((cartItem) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      return cartItem.id === itemId
    })

    if (item == null) {
      return null
    }

    return item
  }

  return getLineItem
}