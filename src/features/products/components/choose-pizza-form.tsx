import React from "react"
import { Ingredient, ProductItem } from "@prisma/client"

import { ProductNested } from "../server/db"
import ProductCover from "./product-cover"

import { cn } from "@/shared/lib/utils"
import { Title } from "@/shared/components/title"
import { Button } from "@/shared/components/ui"
import GroupPizzaOptions from "./group-pizza-options"
import { PizzaSize, PizzaType, pizzaTypes } from "../constants/pizza"
import IngredientItem from "@/shared/components/ingredient-item"
import usePizzaOptions from "../hooks/use-pizza-options"
import { getPizzaTextAndPrice } from "../utils/get-pizza-details"

interface Props {
  product: ProductNested
  name: string
  coverUrl: string
  ingredients: Ingredient[]
  items: ProductItem[]
  className?: string
  isLoading?: boolean
  onSubmit?: () => void
}

export default function ChoosePizzaForm({
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
  } = usePizzaOptions(items)
  const { price: totalPrice, text } = getPizzaTextAndPrice(
    items,
    size,
    type,
    ingredients,
    selectedIngredients
  )

  const handleSubmit = () => {
    onSubmit?.()
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
          onClick={() => handleSubmit()}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
