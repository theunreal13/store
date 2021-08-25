import { useContext, useState, useEffect } from 'react'
import { Context } from '../Context'

export function useCheckoutUrl(): string | null {
  
  const [checkoutUrl, setCheckoutUrl] = useState('')
  const { swell } = useContext(Context)
  // return cart

  useEffect(() => {
    const fetchData = async () => {

      try {
        const result = await swell.cart.get();
        setCheckoutUrl(result?.checkout_url);  
      } catch(error) {}
    }
    
    fetchData();
  }, [])

  return checkoutUrl;
}
