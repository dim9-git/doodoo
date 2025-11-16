import { stripe } from "@/shared"

import { CANCEL_URL, SUCCESS_URL } from "../model/constants"
import { StripeSessionCreateMetadataDTO } from "../api/dto/response"

export const createStripeSession = async (
  email: string,
  orderId: number,
  userId: number | null,
  totalAmount: number,
  idempotencyKey?: string
) => {
  return await stripe.checkout.sessions.create(
    {
      success_url: SUCCESS_URL,
      cancel_url: CANCEL_URL,
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "kzt",
            product_data: {
              name: "Заказ #" + orderId,
            },
            unit_amount: totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        orderId,
        userId,
      } satisfies StripeSessionCreateMetadataDTO,
    },
    {
      idempotencyKey,
    }
  )
}
