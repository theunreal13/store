import React, { useState, useEffect } from 'react'
import swell from 'swell-js';
import { Context } from './Context'
import swellConfig from '@config/swell'
import { Cart } from './types'

export interface CommerceProviderProps {
  children: React.ReactNode
}

export function CommerceProvider({
  children,
}: CommerceProviderProps) {

  const [cart, setCart] = useState<Cart | null>(null)


  useEffect(() => {
    async function loadSwell() {
      await swell.init(swellConfig.storeId, swellConfig.publicKey)
      
      const newCart = await swell.cart.get()
      setCart(newCart)
    }

    loadSwell();
  }, [])

  return (
    <Context.Provider
      value={{
        swell,
        cart,
        setCart
      }}
    >
      {children}
    </Context.Provider>
  )
}
