import { Ingredient, ProductItem } from "@prisma/client"
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza"
import { calcPizzaTotalPrice } from "./calc-pizza-total-price"

export const getPizzaTextAndPrice = (
  items: ProductItem[],
  size: PizzaSize,
  type: PizzaType,
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const totalPrice = calcPizzaTotalPrice({
    items,
    currentSize: size,
    currentType: type,
    ingredients,
    selectedIngredients,
  })
  const text = `${size} см, ${mapPizzaType[type]} пицца`

  return { price: totalPrice, text }
}
