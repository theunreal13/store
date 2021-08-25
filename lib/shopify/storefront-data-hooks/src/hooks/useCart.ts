import { useContext, useState, useEffect } from 'react'
import { Context } from '../Context'
import { Cart } from '../types'

export function useCart(): Cart | null {
  const [cart, setCart] = useState(null)
  const { swell } = useContext(Context)
  // return cart

  useEffect(() => {
    const fetchData = async () => {

      try {
        const result = await swell.cart.get();
        setCart(result);  
      } catch(error) {}
    }

    fetchData();
  }, [])

  return cart;
}
