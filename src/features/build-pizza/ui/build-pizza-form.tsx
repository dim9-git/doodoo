"use client"

import { Ingredient, ProductItem } from "@prisma/client"

import { Button, Title, cn } from "@/shared"

import { IngredientItem } from "@/entities/ingredients"
import {
  PizzaSize,
  PizzaType,
  pizzaTypes,
  ProductCover,
  getPizzaTextAndPrice,
} from "@/entities/products"

import { AddToCartVariables } from "@/features/add-to-cart"

import { usePizzaBuilder } from "../model/use-pizza-builder"
import GroupPizzaOptions from "./group-pizza-params"

interface Props {
  className?: string
  name: string
  coverUrl: string
  ingredients: Ingredient[]
  items: ProductItem[]
  isLoading?: boolean
  onSubmit: (payload: AddToCartVariables) => void
}

export default function BuildPizzaForm({
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
    enabledSizes,
    currentItem,
  } = usePizzaBuilder(items)

  const { price, text } = getPizzaTextAndPrice(
    items,
    size,
    type,
    ingredients,
    selectedIngredients
  )

  const productItemId = currentItem ? currentItem.id : -1

  const onClickAdd = () => {
    onSubmit({
      payload: {
        productItemId,
        ingredientsIds: Array.from(selectedIngredients),
      },
      optItem: {
        id: Number(`${productItemId}${Math.random()}`),
        name,
        price,
        quantity: 1,
        pizzaSize: size,
        pizzaType: type,
        ingredients: ingredients.filter((ingr) =>
          selectedIngredients.has(ingr.id)
        ),
        coverImageUrl: coverUrl,
      },
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
            items={enabledSizes}
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
          Добавить в корзину за {price} ₸
        </Button>
      </div>
    </div>
  )
}
