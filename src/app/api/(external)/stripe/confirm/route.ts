import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { OrderStatus } from "@prisma/client"
import { prisma } from "db/prisma"
import Stripe from "stripe"

import { StripeSessionCreateMetadataDTO, stripe } from "@/features/checkout"

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

    if (event.type === "checkout.session.completed") {
      const sessionMetadata =
        session.metadata as unknown as StripeSessionCreateMetadataDTO

      const orderId = Number(sessionMetadata.orderId)

      if (!orderId) {
        return NextResponse.json(
          { message: "Missing orderId in session metadata" },
          { status: 400 }
        )
      }

      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.PROCESSING,
          paymentId: session.payment_intent?.toString(),
        },
      })
    }

    return NextResponse.json(null, { status: 200 })
  } catch (error) {
    console.error("[STRIPE_CONFIRM_POST] error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
