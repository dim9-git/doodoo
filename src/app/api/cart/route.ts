import { NextRequest, NextResponse } from "next/server"
import { prisma } from "db/prisma"

import {
  findOrCreateCart,
  updateCartTotal,
  withItems,
  findCartItem,
  findCartByToken,
} from "@/entities/cart"
import { CreateCartItemDTO } from "@/entities/cart-items"
import { getRateLimitIdentifier, moderateRateLimit } from "@/shared"

export async function GET(req: NextRequest) {
  const token = req.cookies.get("cartToken")?.value

  if (!token) {
    return NextResponse.json({ data: { id: null, items: [] } })
  }

  try {
    const userCart = await findCartByToken(token)

    if (!userCart) {
      return NextResponse.json({ data: { id: null, items: [] } })
    }

    return NextResponse.json({ data: userCart })
  } catch (error) {
    console.error("[CART_GET] error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const identifier = getRateLimitIdentifier(req)

  const { success, reset } = await moderateRateLimit.limit(identifier)

  if (!success) {
    const retryAfter = Math.round((reset - Date.now()) / 1000)
    return NextResponse.json(
      { message: "Слишком много попыток. Попробуйте позже.", retryAfter },
      { status: 429, headers: { "Retry-After": retryAfter.toString() } }
    )
  }

  let token = req.cookies.get("cartToken")?.value

  if (!token) {
    token = crypto.randomUUID()
  }

  try {
    const data = (await req.json()) as CreateCartItemDTO
    const userCart = await findOrCreateCart(token)

    const cartItem = findCartItem(
      userCart,
      data.productItemId,
      data.ingredientsIds
    )

    let newCart
    // Если товар уже есть в корзине, увеличиваем количество
    if (cartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: { quantity: cartItem.quantity + 1 },
        select: {
          Cart: {
            include: withItems,
          },
        },
      })
      newCart = updatedCartItem.Cart
    } else {
      const createdCartItem = await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          ingredients: {
            connect: data.ingredientsIds?.map((id) => ({ id })),
          },
        },
        select: {
          Cart: {
            include: withItems,
          },
        },
      })
      newCart = createdCartItem.Cart
    }

    if (!newCart) {
      throw new Error("Something went wrong with updating cart")
    }

    const updatedCart = await updateCartTotal(newCart)

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
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
