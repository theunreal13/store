export interface OptionInput {
  [key: string]: string
}

export interface LineItemPatch {
  product_id: string
  quantity: number
  options?: OptionInput[]
}

export interface Product {
  id: string
  description: string
  name: string
  slug: string
  currency: string
  price: number
  images: any[]
  options: any[]
  variants: Variant[]
}

export type Variant = {
  id: string
  option_value_ids: string[]
  name: string
  price?: number
  stock_status?: string
}


export type CartItem = {
  id: string
  product: Product
  price: number
  variant: {
    name: string | null
    sku: string | null
    id: string
  }
  quantity: number
}

export type Cart = {
  id: string
  account_id: number
  currency: string
  tax_included_total: number
  sub_total: number
  grand_total: number
  discount_total: number
  quantity: number
  items: CartItem[]
  item_quantity: number
  checkout_url: string
  date_created: string
  discounts?: { id: number; amount: number }[] | null
}

export type Image = {
  file: {
    url: String
    height: Number
    width: Number
  }
  id: string
}
