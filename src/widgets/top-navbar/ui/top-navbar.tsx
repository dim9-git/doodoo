import { Container, cn } from "@/shared"

import { getCategoriesShort } from "@/entities/product-categories"

import { Categories } from "./categories"
import SortPopup from "./sort-popup"

interface Props {
  className?: string
}

export default async function TopNavbar({ className }: Props) {
  const categories = await getCategoriesShort()
  return (
    <div
      className={cn(
        "sticky top-0 py-5 bg-white shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between lg:flex-col xl:flex-row max-lg:flex-col max-xl:gap-2">
        <Categories
          categories={categories}
          className="whitespace-nowrap max-lg:w-full max-lg:overflow-x-auto scrollbar-none"
        />
        <SortPopup />
      </Container>
    </div>
  )
}
