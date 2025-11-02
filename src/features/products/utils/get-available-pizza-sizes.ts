import { ProductItem } from "@prisma/client"

import { PizzaType, pizzaSizes } from "@/entities/products"

import { PizzaOption } from "../components/group-pizza-options"

/**
 * Функция для получения доступных размеров пиццы по типу
 * @example
 * ```
 * const availableSizes = getAvailablePizzaSizes(items, 1)
 * ```
 * @param items
 * @param type
 * @returns PizzaOption[]
 */
export const getAvailablePizzaSizes = (
  items: ProductItem[],
  type: PizzaType
): PizzaOption[] => {
  const filteredPizzasByType = items.filter((item) => item.type === type)
  const availableSizes = pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }))

  return availableSizes
}
