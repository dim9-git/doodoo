import { NextRequest, NextResponse } from "next/server"
import { prisma } from "db/prisma"

import { findByToken, findOrCreateCart, updateCartTotal } from "@/entities/cart"
import { CreateCartItemRequestDTO } from "@/entities/cart-items"
// import logger from "@/shared/lib/logger"

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value

    if (!token) {
      return NextResponse.json({ cart: [] })
    }

    const userCart = await findByToken(token)

    if (userCart) {
      return NextResponse.json({ data: userCart })
    }

    return NextResponse.json({ data: { id: null, items: [] } })
  } catch (error) {
    console.error("[CART_GET] error:", error)
    return NextResponse.json(
      { message: "[CART_GET] Server error" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value

    if (!token) {
      token = crypto.randomUUID()
    }

    const data = (await req.json()) as CreateCartItemRequestDTO
    let userCart = await findOrCreateCart(token)

    // change to in-memory filtering
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          every: {
            id: { in: data.ingredientsIds },
          },
        },
      },
    })

    // Если товар уже есть в корзине, увеличиваем количество
    if (findCartItem) {
      await prisma.cartItem.update({
        where: { id: findCartItem.id },
        data: { quantity: findCartItem.quantity + 1 },
      })
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          ingredients: {
            connect: data.ingredientsIds?.map((id) => ({ id })),
          },
        },
      })
    }

    userCart = await findOrCreateCart(token)
    const updatedCart = await updateCartTotal(userCart)
    // logger.info("[CART_POST] updatedCart", updatedCart)

    const res = NextResponse.json({
      data: updatedCart,
    })

    if (!req.cookies.get("cartToken")) {
      res.cookies.set("cartToken", token, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
      })
    }

    return res
  } catch (error) {
    console.error("[CART_POST] error:", error)
    return NextResponse.json(
      { message: "[CART_POST] Server error" },
      { status: 500 }
    )
  }
}
