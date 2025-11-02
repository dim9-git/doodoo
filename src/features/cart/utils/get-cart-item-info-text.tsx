import {
  mapPizzaType,
  PizzaSize,
  PizzaType,
} from "@/features/products/constants/pizza"
import { Ingredient } from "@prisma/client"

export const getCartItemInfoText = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: Ingredient[]
): string => {
  const details = []

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType]
    details.push(`${typeName} ${pizzaSize} пицца`)
  }

  if (ingredients && ingredients.length > 0) {
    details.push(...ingredients.map((ingr) => ingr.name))
  }

  return details.join(", ")
}
