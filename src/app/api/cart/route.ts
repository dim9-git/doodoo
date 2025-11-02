import { NextRequest, NextResponse } from "next/server"
import { prisma } from "db/prisma"
import { findOrCreateCart, updateCartTotal } from "@/entities/cart"
import { CreateCartItemRequestDTO } from "@/entities/cart-item"

export async function GET(req: NextRequest) {
  try {
    const userId = 1
    const token = req.cookies.get("token")?.value

    if (!token) {
      return NextResponse.json({ cart: [] })
    }

    const userCart = await prisma.cart.findFirst({
      where: { OR: [{ userId }, { token }] },
      include: {
        items: {
          orderBy: { createdAt: "desc" },
          include: {
            productItem: {
              include: { product: true },
            },
            ingredients: true,
          },
        },
      },
    })

    if (userCart) {
      return NextResponse.json({ cart: userCart.items })
    }
  } catch (error) {
    return NextResponse.json({ cart: [], error })
  }
  return NextResponse.json({ cart: [] })
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get("cartToken")?.value

    if (!token) {
      token = crypto.randomUUID()
    }

    const userCart = await findOrCreateCart(token)
    const data = (await req.json()) as CreateCartItemRequestDTO

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
    }

    await prisma.cartItem.create({
      data: {
        cartId: userCart.id,
        productItemId: data.productItemId,
        ingredients: {
          connect: data.ingredientsIds?.map((id) => ({ id })),
        },
      },
    })

    const updatedCart = await updateCartTotal(token)
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
