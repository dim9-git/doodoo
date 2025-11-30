import { absoluteUrl } from "@/shared/lib/utils"

export const VAT_PERCENT = 12
export const DELIVERY_PRICE = 2250

export const SUCCESS_URL = absoluteUrl("/?paid=true")
export const CANCEL_URL = absoluteUrl("/?paid=false")
