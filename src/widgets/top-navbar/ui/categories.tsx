"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

import { cn } from "@/shared"

import { useCategoryStore } from "@/entities/product-categories"

interface Props {
  className?: string
  categories: {
    id: number
    name: string
  }[]
}

export function Categories({ className, categories }: Props) {
  const activeId = useCategoryStore((state) => state.activeId)
  const containerRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<Map<number, HTMLAnchorElement>>(new Map())

  useEffect(() => {
    if (!activeId || !containerRef.current) return

    const activeLink = linkRefs.current.get(activeId)
    if (!activeLink) return

    // Only scroll on mobile (check if container is scrollable)
    const container = containerRef.current
    if (container.scrollWidth <= container.clientWidth) return

    const containerRect = container.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()

    // Calculate scroll position to center the active link
    const scrollLeft =
      container.scrollLeft +
      (linkRect.left - containerRect.left) -
      containerRect.width / 2 +
      linkRect.width / 2

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    })
  }, [activeId])

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
      ref={containerRef}
    >
      {categories.map(({ name, id }, index) => (
        <Link
          key={index}
          ref={(el) => {
            if (el) linkRefs.current.set(id, el)
          }}
          className={cn(
            "flex items-center h-11 px-5 rounded-2xl font-bold ",
            activeId === id
              ? "bg-white shadow-md shadow-gray-200 text-primary"
              : null
          )}
          href={`/#${name}`}
        >
          <button type="button">{name}</button>
        </Link>
      ))}
    </div>
  )
}
