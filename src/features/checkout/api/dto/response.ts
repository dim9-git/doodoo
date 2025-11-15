export type StripeCheckoutResponseDTO = {
  paymentUrl: string | null
  error?: string
}

export type StripeSessionCreateMetadataDTO = {
  orderId: number
  userId: number | null
}
