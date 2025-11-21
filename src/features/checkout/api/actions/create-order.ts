"use server"

import { randomUUID } from "node:crypto"
import { cookies } from "next/headers"
import { OrderStatus } from "@prisma/client"
import { prisma } from "db/prisma"

import { APP_NAME } from "@/shared"
import { moderateRateLimit, sendMail } from "@/shared/lib"

import { CheckoutFormValues } from "../../model/schema"
import { DELIVERY_PRICE } from "../../model/constants"
import { PayOrderTemplate } from "../../ui/mail-templates/pay-order-template"
import { createStripeSession } from "../../lib/create-stripe-session"

export const createOrder = async (data: CheckoutFormValues) => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("cartToken")?.value

    if (!token) {
      throw new Error("Cart token not found")
    }

    const { success } = await moderateRateLimit.limit(`server-action:${token}`)

    if (!success) {
      throw new Error("Rate limit exceeded. Please try again later.")
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

    const stripeSession = await createStripeSession(
      data.email,
      newOrder.id,
      newOrder.userId,
      finalTotal,
      idempotencyKey
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

    const paymentUrl = stripeSession.url

    const { error: sendMailError } = await sendMail(
      data.email,
      `${APP_NAME} - Оплатите заказ #${newOrder.id}`,
      PayOrderTemplate({
        orderId: newOrder.id,
        totalAmount: newOrder.total,
        paymentUrl: paymentUrl ?? "",
      })
    )

    if (sendMailError) {
      throw new Error("Failed to send email")
    }

    return {
      paymentUrl,
    }
  } catch (error) {
    console.error("[CREATE_ORDER] error:", error)
    throw error
  }
}
