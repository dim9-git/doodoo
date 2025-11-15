"use server"

import { randomUUID } from "node:crypto"
import { cookies } from "next/headers"
import { OrderStatus } from "@prisma/client"
import { prisma } from "db/prisma"

import { CheckoutFormValues } from "../model/schema"
import { stripe } from "../lib/stripe"
import { CANCEL_URL, DELIVERY_PRICE, SUCCESS_URL } from "../model/constants"
import {
  StripeCheckoutResponseDTO,
  StripeSessionCreateMetadataDTO,
} from "./dto/response"

export const createOrder = async (
  data: CheckoutFormValues
): Promise<StripeCheckoutResponseDTO> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("cartToken")?.value

    if (!token) {
      throw new Error("Cart token not found")
    }

    const userCart = await prisma.cart.findFirst({
      where: { token },
      include: {
        user: true,
        items: {
          include: {
            productItem: {
              include: { product: true },
            },
            ingredients: true,
          },
        },
      },
    })

    if (!userCart) {
      throw new Error("Cart not found")
    }

    const { total } = userCart

    if (total === 0) {
      throw new Error("Cart is empty")
    }

    const finalTotal = total + DELIVERY_PRICE

    const newOrder = await prisma.order.create({
      data: {
        token,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        ...(userCart.user?.id && {
          user: {
            connect: {
              id: userCart.user.id,
            },
          },
        }),
        total: finalTotal,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
      },
    })

    // Create Stripe payment
    const idempotencyKey = `order-${newOrder.id}-${randomUUID()}`

    const stripeSession = await stripe.checkout.sessions.create(
      {
        success_url: SUCCESS_URL,
        cancel_url: CANCEL_URL,
        payment_method_types: ["card"],
        mode: "payment",
        customer_email: data.email,
        line_items: [
          {
            price_data: {
              currency: "kzt",
              product_data: {
                name: "Заказ #" + newOrder.id,
              },
              unit_amount: finalTotal * 100,
            },
            quantity: 1,
          },
        ],
        metadata: {
          orderId: newOrder.id,
          userId: newOrder.userId,
        } satisfies StripeSessionCreateMetadataDTO,
      },
      {
        idempotencyKey,
      }
    )

    // Clear cart
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        total: 0,
      },
    })

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    })

    return {
      paymentUrl: stripeSession.url,
    }
  } catch (error) {
    console.error("[CREATE_ORDER] error:", error)
    return {
      paymentUrl: null,
      error: "Internal server error",
    }
  }
}
