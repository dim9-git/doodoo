import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { prisma } from "db/prisma"
import { OrderStatus } from "@prisma/client"
import Stripe from "stripe"

import { sendMail, stripe, APP_NAME } from "@/shared"

import { CartItemResponseDTO } from "@/entities/cart-items"

import {
  StripeSessionCreateMetadataDTO,
  OrderSuccessTemplate,
} from "@/features/checkout"

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    const headersList = await headers()
    const signature = headersList.get("Stripe-Signature") as string
    if (!signature) {
      return NextResponse.json(
        { message: "Missing Stripe-Signature header" },
        { status: 400 }
      )
    }

    const body = await req.text()

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      WEBHOOK_SECRET
    )

    const session = event.data.object as Stripe.Checkout.Session
    const sessionMetadata =
      session.metadata as unknown as StripeSessionCreateMetadataDTO
    const orderId = Number(sessionMetadata?.orderId)

    if (!orderId) {
      return NextResponse.json(
        { message: "Missing orderId in session metadata" },
        { status: 400 }
      )
    }

    if (event.type === "checkout.session.completed") {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.PROCESSING,
          paymentId: session.payment_intent?.toString(),
        },
      })

      const { error: sendMailError } = await sendMail(
        order.email,
        `${APP_NAME} - Заказ #${orderId}`,
        OrderSuccessTemplate({
          orderId,
          items: JSON.parse(order.items as string) as
            | CartItemResponseDTO[]
            | null,
        })
      )

      if (sendMailError) {
        throw new Error("Failed to send email")
      }

      return NextResponse.json(null, { status: 200 })
    }

    if (event.type === "checkout.session.expired") {
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.CANCELLED,
        },
      })

      return NextResponse.json(null, { status: 200 })
    }

    console.log(`[STRIPE_WEBHOOK] Unhandled event type: ${event.type}`)
    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error("[CHECKOUT_CONFIRM_POST] error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
