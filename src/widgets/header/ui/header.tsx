import { User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cookies } from "next/headers"

import SearchInput from "@/features/search-products/ui/search-input"
import Container from "@/shared/ui/container"
import { Button } from "@/shared/ui/sh"
import { cn } from "@/shared/lib/utils"

import { findCartByToken } from "@/entities/cart"

import HeaderCartButton from "./header-cart-button"

interface Props {
  className?: string
  hasSearch?: boolean
}

export default async function Header({ className, hasSearch = true }: Props) {
  const token = (await cookies()).get("cartToken")?.value
  const cart = token ? await findCartByToken(token) : null

  return (
    <header className={cn("border border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
            <div>
              <h1 className="text-2xl uppercase font-black">Doodoo Pizza</h1>
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
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-3">
            <User className="size-4" size={16} />
            Войти
          </Button>

          <HeaderCartButton initialData={cart} />
        </div>
      </Container>
    </header>
  )
}
