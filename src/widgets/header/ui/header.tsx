import Link from "next/link"
import Image from "next/image"
import { cookies } from "next/headers"

import { Container, cn, APP_NAME, safe } from "@/shared"

import { findCartByToken } from "@/entities/cart"

import { SearchInput } from "@/features/search-products"

import HeaderRight from "./header-right"

interface Props {
  className?: string
  hasSearch?: boolean
  hasCart?: boolean
}

export default async function Header({
  className,
  hasSearch = true,
  hasCart = true,
}: Props) {
  const token = (await cookies()).get("cartToken")?.value

  const cart = token
    ? await safe(() => findCartByToken(token), "Header::findCartByToken")
    : null

  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">{APP_NAME}</h1>
              <p className="text-sm text-gray-400 leading-3">
                лучшая пицца в городе
              </p>
            </div>
          </div>
        </Link>

        {hasSearch && (
          <div className="mx-10 flex-1">
            <SearchInput />
          </div>
        )}

        {/* Auth */}
        <HeaderRight hasCart={hasCart} initialCart={cart} />
      </Container>
    </header>
  )
}
