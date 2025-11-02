import { mapPizzaType, PizzaType } from "@/entities/products"


export const getCartItemInfoText = (
  pizzaType: number | null,
  pizzaSize: number | null,
  ingredients: Array<{ name: string }>
): string => {
  const details = []

  if (pizzaSize && pizzaType) {
    const typeName = mapPizzaType[pizzaType as PizzaType]
    details.push(`${typeName} ${pizzaSize} пицца`)
  }

  if (ingredients && ingredients.length > 0) {
    details.push(...ingredients.map((ingr) => ingr.name))
  }

  return details.join(", ")
}
