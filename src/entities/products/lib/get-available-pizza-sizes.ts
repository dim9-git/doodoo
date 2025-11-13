import { ProductItem } from "@prisma/client"

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
export const getAvailablePizzaSizes = (
  items: ProductItem[],
  type: PizzaType
): PizzaParam[] => {
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
