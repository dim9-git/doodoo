import Container from "@/shared/ui/container"
import { cn } from "@/shared/lib/utils"

import { Categories } from "./categories"
import SortPopup from "./sort-popup"

interface Props {
  className?: string
}

export default function TopNavbar({ className }: Props) {
  return (
    <div
      className={cn(
        "sticky top-0 py-5 bg-white shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between ">
        <Categories />
        <SortPopup />
      </Container>
    </div>
  )
}
