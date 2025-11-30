import { Ingredient, ProductItem } from "db/generated/client"
import { PizzaSize, PizzaType } from "@/entities/products"

interface ICalcPizzaTotalPrice {
  items: ProductItem[]
  currentSize: PizzaSize
  currentType: PizzaType
  ingredients: Ingredient[]
  selectedIngredients: Set<number>
}

/**
 * Функция для подсчета общей стоимости пиццы
 * @example
 * ```
 * const totalPrice = calcPizzaTotalPrice({
 *   items,
 *   currentSize: 20,
 *   currentType: 1,
 *   ingredients,
 *   selectedIngredients: new Set([1, 2, 3])
 * })
 * ```
 * @param obj
 * @returns number
 */
export const calcPizzaTotalPrice = ({
  items,
  currentSize,
  currentType,
  ingredients,
  selectedIngredients,
}: ICalcPizzaTotalPrice) => {
  const pizzaPrice =
    items.find((item) => item.size === currentSize && item.type === currentType)
      ?.price || 0

  const totalIngridientsPrice = ingredients
    .filter((ingr) => selectedIngredients.has(ingr.id))
    .reduce((acc, ingr) => acc + ingr.price, 0)

  const totalPrice = pizzaPrice + totalIngridientsPrice
  return totalPrice
}
