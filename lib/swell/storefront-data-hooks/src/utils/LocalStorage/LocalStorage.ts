import { LocalStorageKeys } from './keys'
import { isCart } from '..'

function set(key: string, value: string) {
  const isBrowser = typeof window !== 'undefined'
  if (isBrowser) {
    window.localStorage.setItem(key, value)
  }
}

function get(key: string) {
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) {
    return null
  }

  try {
    const item = window.localStorage.getItem(key)
    return item
  } catch {
    return null
  }
}

function getInitialCart(): any | null {
  const existingCartString = get(LocalStorageKeys.CART)
  if (existingCartString == null) {
    return null
  }

  try {
    const existingCart = JSON.parse(existingCartString)
    if (!isCart(existingCart)) {
      return null
    }

    return existingCart as any
  } catch {
    return null
  }
}

export const LocalStorage = {
  get,
  set,
  getInitialCart,
}
