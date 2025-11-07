import { Ingredient, ProductItem } from "@prisma/client"

import { cn } from "@/shared/lib/utils"
import { Title } from "@/shared/ui/title"
import { Button } from "@/shared/ui/sh"

import { IngredientItem } from "@/entities/ingredients"
import {
  PizzaSize,
  PizzaType,
  pizzaTypes,
  ProductCover,
  getPizzaTextAndPrice,
} from "@/entities/products"

import { AddToCartItem } from "@/features/add-to-cart"

import { usePizzaConfiguration } from "../model/use-pizza-configuration"
import GroupPizzaOptions from "./group-pizza-params"

interface Props {
  className?: string
  name: string
  coverUrl: string
  ingredients: Ingredient[]
  items: ProductItem[]
  isLoading?: boolean
  onSubmit: (payload: AddToCartItem) => void
}

export default function PizzaBuidlerForm({
  className,
  name,
  coverUrl,
  items,
  ingredients,
  isLoading,
  onSubmit,
}: Props) {
  const {
    size,
    setSize,
    type,
    setType,
    selectedIngredients,
    toggleIngredient,
    availableSizes,
    currentItem,
  } = usePizzaConfiguration(items)

  const { price, text } = getPizzaTextAndPrice(
    items,
    size,
    type,
    ingredients,
    selectedIngredients
  )

  const productItemId = currentItem ? currentItem.id : -1

  const onClickAdd = () => {
    console.log("Adding to cart:", {
      productItemId,
      size,
      type,
      selectedIngredients,
    })
    onSubmit({
      productItemId,
      ui: {
        id: productItemId,
        quantity: 1,
        pizzaSize: size,
        pizzaType: type,
        ingredients: ingredients.filter((ingr) =>
          selectedIngredients.has(ingr.id)
        ),
        name,
        price,
        coverImageUrl: coverUrl,
      },
      ingredientsIds: Array.from(selectedIngredients),
    })
  }

  return (
    <div className={cn("flex flex-1", className)}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <ProductCover coverUrl={coverUrl} size={size} />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-sm text-gray-500 mb-1">{text}</p>

        <div className="space-y-5">
          <GroupPizzaOptions
            items={availableSizes}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
            value={size.toString()}
          />

          <GroupPizzaOptions
            items={pizzaTypes}
            onClick={(value) => setType(Number(value) as PizzaType)}
            value={type.toString()}
          />
        </div>

        <div className="max-h-[420px] md:max-h-[300px] bg-gray-50 p-5 mt-5 rounded-md overflow-auto scrollbar">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => toggleIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          isLoading={isLoading}
          onClick={onClickAdd}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  )
}
