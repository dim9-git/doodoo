import React from "react"
import { ArrowRight, Package, Percent, Truck } from "lucide-react"

import { WhiteBlock, Button, Skeleton, cn } from "@/shared"

import CheckoutDetailsItem from "./checkout-details-item"
import { VAT_PERCENT, DELIVERY_PRICE } from "../model/constants"

interface Props {
  totalAmount: number
  isLoading?: boolean
  isUpdating?: boolean
  isSubmitting?: boolean
  className?: string
}

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  isLoading,
  isUpdating,
  isSubmitting,
  className,
}) => {
  const finalPrice = totalAmount + DELIVERY_PRICE
  const vatPrice = (totalAmount * VAT_PERCENT) / 100

  return (
    <WhiteBlock className={cn("p-6 sticky top-4", className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {isLoading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span
            className={cn(
              "h-11 text-[34px] font-extrabold",
              isUpdating && "shimmer"
            )}
          >
            {finalPrice} ₸
          </span>
        )}
      </div>

      <CheckoutDetailsItem
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-400" />
            Стоимость корзины:
          </div>
        }
        value={
          isLoading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${totalAmount} ₸`
          )
        }
      />
      <CheckoutDetailsItem
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-400" />
            Налоги:
          </div>
        }
        value={
          isLoading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${vatPrice} ₸`
          )
        }
      />
      <CheckoutDetailsItem
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-400" />
            Доставка:
          </div>
        }
        value={
          isLoading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${DELIVERY_PRICE} ₸`
          )
        }
      />

      <Button
        isLoading={isLoading || isSubmitting}
        disabled={isUpdating || isSubmitting}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold disabled:bg-primary/80"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  )
}
