import { ProductItem } from "@prisma/client"

import { Title, Button, cn } from "@/shared"

import { ProductCover } from "@/entities/products"

import { AddToCartItem } from "@/features/add-to-cart"

interface Props {
  className?: string
  item: ProductItem
  name: string
  coverUrl: string
  price: number
  isLoading?: boolean
  onSubmit: (payload: AddToCartItem) => void
}

export default function AddOnProductForm({
  className,
  item,
  name,
  coverUrl,
  price,
  isLoading,
  onSubmit,
}: Props) {
  const onClickAdd = () => {
    onSubmit({
      productItemId: item.id,
      ui: {
        id: item.id,
        name,
        coverImageUrl: coverUrl,
        price,
        quantity: 1,
        pizzaSize: null,
        pizzaType: null,
        ingredients: [],
      },
    })
  }
  return (
    <div className={cn("flex flex-1", className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <ProductCover coverUrl={coverUrl} size={20} withBorder={false} />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold" />

        <Button
          isLoading={isLoading}
          onClick={onClickAdd}
          className="w-full h-[55px] mt-10 px-10 rounded-[18px] text-base"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  )
}
