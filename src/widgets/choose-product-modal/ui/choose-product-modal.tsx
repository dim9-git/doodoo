"use client"

import { useRouter } from "next/navigation"

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
  cn,
} from "@/shared"

import { ProductDetailsDTO } from "@/entities/products"

import { ProductSwitchForm } from "@/widgets/product-switch-form"

interface Props {
  product: ProductDetailsDTO
  className?: string
}

export default function ChooseProductModal({ product, className }: Props) {
  const router = useRouter()

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "w-[1060px] max-w-[1060px] min-h-[500px] p-0 bg-white overflow-hidden",
          className
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Выберите продукт</DialogTitle>
          <DialogDescription>Выберите продукт</DialogDescription>
        </DialogHeader>

        <ProductSwitchForm product={product} _onSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  )
}
