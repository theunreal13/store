import React, { useState, useEffect } from 'react'
import ShopifyBuy from 'shopify-buy'
import swell from 'swell-js';
import { Context } from './Context'
import { LocalStorage, LocalStorageKeys } from './utils'
import swellConfig from '@config/swell'

export interface CommerceProviderProps extends ShopifyBuy.Config {
  children: React.ReactNode
}

export function CommerceProvider({
  storefrontAccessToken,
  domain,
  children,
}: CommerceProviderProps) {
  if (domain == null || storefrontAccessToken == null) {
    throw new Error(
      'Unable to build shopify-buy client object. Please make sure that your access token and domain are correct.'
    )
  }

  // const [cart, setCart] = useState<ShopifyBuy.Cart | null>(null)

  const isCustomDomain = domain.includes('.')

  const client = ShopifyBuy.buildClient({
    storefrontAccessToken,
    domain: isCustomDomain ? domain : `${domain}.myshopify.com`,
  })

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
        client,
        // cart,
        // setCart,
        domain,
        storefrontAccessToken,
      }}
    >
      {children}
    </Context.Provider>
  )
}
