import React, { useState, useEffect } from 'react'
import swell from 'swell-js';
import { Context } from './Context'
import swellConfig from '@config/swell'

export interface CommerceProviderProps {
  children: React.ReactNode
}

export function CommerceProvider({
  children,
}: CommerceProviderProps) {


  useEffect(() => {
    async function loadSwell() {
      await swell.init(swellConfig.storeId, swellConfig.publicKey)
      // const newCart = await swell.cart.get()
      // setCart(newCart)
    }

    loadSwell();
  }, [])

  return (
    <Context.Provider
      value={{
        swell,
      }}
    >
      {children}
    </Context.Provider>
  )
}
