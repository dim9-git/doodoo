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

import { ProductResponseDTO } from "@/entities/products"

import { ProductSwitchForm } from "@/widgets/product-switch-form"

interface Props {
  product: ProductResponseDTO
  className?: string
}

export default function ChooseProductModal({ product, className }: Props) {
  const router = useRouter()

  return (
    <Dialog open={true} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "lg:w-[1060px] lg:max-w-[1060px] lg:min-h-[500px] overflow-hidden p-0 bg-white w-full",
          className
        )}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Выберите продукт</DialogTitle>
          <DialogDescription>Выберите продукт</DialogDescription>
        </DialogHeader>

        <ProductSwitchForm
          product={product}
          onFormSubmit={() => router.back()}
        />
      </DialogContent>
    </Dialog>
  )
}
