import { useState, useEffect, useContext } from 'react'
import { Context } from '../Context'

export function useCartItems() {
  
  const [ cart, setCart ] = useState()
  const { swell } = useContext(Context)
 
  useEffect(() => {
    const fetchCart = async () => {
      const cart = await swell.cart.get()
      if (!cart || !Array.isArray(cart.items)) {
        return
      }
      setCart(cart)
    }
   fetchCart()
  }, [])

  return cart?.items
}
