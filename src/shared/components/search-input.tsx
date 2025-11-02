"use client"

import React, { useState } from "react"
import Link from "next/link"

import { Search } from "lucide-react"
import { useDebounce } from "react-use"

import { Input } from "@/shared/components/ui"
import { cn } from "@/shared/lib/utils"

import { useSearchQuery } from "@/features/search-products"

interface Props {
  className?: string
}

export default function SearchInput({ className }: Props) {
  const [focused, setFocused] = useState(false)
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  useDebounce(
    () => {
      setDebouncedQuery(query)
    },
    250,
    [query]
  )

  console.log(debouncedQuery)

  const { products } = useSearchQuery({
    query: debouncedQuery,
  })

  return (
    <>
      {focused && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setFocused(false)}
        />
      )}
      <div
        className={cn(
          "relative z-50 flex flex-1 justify-between h-11 rounded-2xl",
          className
        )}
      >
        <Search className="h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-[50%]" />
        <Input
          className="rounded-2xl bg-gray-100 pl-11 h-full focus-visible:ring-0"
          name="query"
          placeholder="Поиск"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />

        <div
          className={cn(
            "absolute z-40 top-14 w-full bg-white rounded-xl shadow-md transition-all duration-300 invisible opacity-0",
            focused && "top-12 visible opacity-100"
          )}
        >
          {products
            ? products.map((product) => (
                <Link
                  key={product.id}
                  className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                  href={`/products/${product.id}`}
                >
                  {product.coverUrl ? (
                    <img
                      className="rounded-sm h-8 w-8"
                      src={product.coverUrl}
                      alt={product.name}
                    />
                  ) : null}
                  <span>{product.name}</span>
                </Link>
              ))
            : null}
        </div>
      </div>
    </>
  )
}
