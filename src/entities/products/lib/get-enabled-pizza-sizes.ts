import { ProductItem } from "db/generated/client"

import { PizzaType, pizzaSizes } from "@/entities/products"

import { PizzaParam } from "@/features/build-pizza"

/**
 * Функция для получения доступных размеров пиццы по типу
 * @example
 * ```
 * const availableSizes = getAvailablePizzaSizes(items, 1)
 * ```
 * @param items
 * @param type
 * @returns PizzaParam[]
 */
export const getEnabledPizzaSizes = (
  items: ProductItem[],
  type: PizzaType
): PizzaParam[] => {
  const filteredPizzasByType = items.filter((item) => item.type === type)
  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }))
}
