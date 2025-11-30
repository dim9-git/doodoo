import { NextRequest, NextResponse } from "next/server"
import { prisma } from "db/prisma"

import {
  updateCartTotal,
  updateCartTotalByToken,
  withItems,
} from "@/entities/cart/server"
import { UpdateCartItemDTO } from "@/entities/cart-items"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get("cartToken")?.value

  if (!token) {
    return NextResponse.json(
      { message: "Не найден токен корзины" },
      { status: 401 }
    )
  }

  try {
    const { id: idString } = await params
    const id = Number(idString)

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Некорректный ID корзины" },
        { status: 400 }
      )
    }

    const body = (await req.json()) as UpdateCartItemDTO

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    })

    if (!cartItem) {
      return NextResponse.json(
        { message: "Товар в корзине не найден" },
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
      throw new Error("Something went wrong with updating cart")
    }

    const updatedCart = await updateCartTotal(userCart)

    if (!updatedCart) {
      return NextResponse.json(
        { message: "Не удалось обновить корзину" },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: updatedCart })
    // TODO: Return updated item
  } catch (error) {
    console.error("[CART_${ID}_PATCH] error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get("cartToken")?.value

  if (!token) {
    return NextResponse.json(
      { message: "Не найден токен корзины" },
      { status: 401 }
    )
  }

  try {
    const { id: idString } = await params
    const id = Number(idString)

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Некорректный ID корзины" },
        { status: 400 }
      )
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    })

    if (!cartItem) {
      return NextResponse.json(
        { message: "Товар в корзине не найден" },
        { status: 404 }
      )
    }

    await prisma.cartItem.delete({
      where: { id },
    })

    const userCart = await updateCartTotalByToken(token)

    if (!userCart) {
      return NextResponse.json(
        { message: "Не удалось обновить корзину" },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: userCart })

    // TODO: Return deleted item ID
  } catch (error) {
    console.error("[CART_${ID}_DELETE] error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
