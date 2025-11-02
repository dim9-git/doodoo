import { NextRequest, NextResponse } from "next/server"
import { prisma } from "db/prisma"

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    const body = await req.json()
    const token = req.cookies.get("cartToken")?.value

    if (!token) {
      return NextResponse.json({ message: "No cart token was found" })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    })

    if (!cartItem) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      )
    }

    await prisma.cartItem.update({
      where: { id },
      data: {
        quantity: body.quantity,
      },
    })

    // TODO: Return updated item
  } catch (error) {
    console.error("[CART_PATCH] error:", error)
    return NextResponse.json(
      { message: "[CART_PATCH] Server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)
    const token = req.cookies.get("cartToken")?.value

    if (!token) {
      return NextResponse.json({ message: "No cart token was found" })
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    })

    if (!cartItem) {
      return NextResponse.json(
        { message: "Cart item not found" },
        { status: 404 }
      )
    }

    await prisma.cartItem.delete({
      where: { id },
    })

    // TODO: Return deleted item ID
  } catch (error) {
    console.error("[CART_DELETE] error:", error)
    return NextResponse.json(
      { message: "[CART_DELETE] Server error" },
      { status: 500 }
    )
  }
}
