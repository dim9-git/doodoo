import {
  mapPizzaSize,
  mapPizzaType,
  PizzaSize,
  PizzaType,
} from "@/entities/products"

export const getCartItemInfoText = (
  pizzaType: number | null,
  pizzaSize: number | null,
  ingredients: Array<{ name: string }>
): string => {
  const details = []

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType as PizzaType]
    const pizzaName = mapPizzaSize[pizzaSize as PizzaSize]
    details.push(`${pizzaName} ${typeName.toLocaleLowerCase()} пицца`)
  }

  if (ingredients && ingredients.length > 0) {
    details.push(...ingredients.map((ingr) => ingr.name))
  }

  return details.join(", ")
}
