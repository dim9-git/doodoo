import { Container, cn } from "@/shared"

import { Categories } from "./categories"
import SortPopup from "./sort-popup"
import { getCategoriesShort } from "@/entities/product-categories"

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
      <Container className="flex items-center justify-between ">
        <Categories categories={categories} />
        <SortPopup />
      </Container>
    </div>
  )
}
