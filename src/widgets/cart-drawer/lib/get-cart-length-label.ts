export const getCartLengthLabel = (length: number | undefined) => {
  if (!length) return "товаров"
  if (length === 1) return "товар"
  if (length >= 2 && length <= 4) return "товара"
  return "товаров"
}
