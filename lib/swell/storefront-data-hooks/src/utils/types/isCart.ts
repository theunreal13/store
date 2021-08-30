
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCart(potentialCart: any) {
  return (
    potentialCart != null &&
    potentialCart.id != null &&
    potentialCart.webUrl != null &&
    potentialCart.items != null &&
    potentialCart.type != null &&
    potentialCart.type.name === 'Checkout' &&
    potentialCart.type.kind === 'OBJECT'
  )
}
