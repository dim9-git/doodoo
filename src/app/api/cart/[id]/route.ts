import { NextRequest, NextResponse } from "next/server"
import { prisma } from "db/prisma"

import {
  updateCartTotal,
  updateCartTotalByToken,
  withItems,
} from "@/entities/cart"
import { UpdateCartItemDTO } from "@/entities/cart-items"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number((await params).id)
    const body = (await req.json()) as UpdateCartItemDTO
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

    const updatedCartItem = await prisma.cartItem.update({
      where: { id },
      data: {
        quantity: body.quantity,
      },
      select: {
        Cart: {
          include: withItems,
        },
      },
    })
    const userCart = updatedCartItem.Cart

    if (!userCart) {
      throw new Error("User cart not found")
    }

    const updatedCart = await updateCartTotal(userCart)

    if (!updatedCart) {
      return NextResponse.json(
        { message: "User cart not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: updatedCart })

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
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = Number((await params).id)
    console.log("DELETE CART ITEM ID:", id)

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

    const token = req.cookies.get("cartToken")?.value
    if (!token) {
      return NextResponse.json({ message: "No cart token was found" })
    }

    const userCart = await updateCartTotalByToken(token)

    if (!userCart) {
      return NextResponse.json(
        { message: "User cart not found" },
        { status: 404 }
      )
    }

    console.log("UPDATED CART AFTER DELETE:", userCart)

    return NextResponse.json({ data: userCart })

    // TODO: Return deleted item ID
  } catch (error) {
    console.error("[CART_DELETE] error:", error)
    return NextResponse.json(
      { message: "[CART_DELETE] Server error" },
      { status: 500 }
    )
  }
}
