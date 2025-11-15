"use client"

import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCart } from "@/entities/cart"

import CheckoutCart from "./checkout-cart"
import CheckoutAddressFields from "./checkout-address-fields"
import CheckoutPersonalFields from "./checkout-personal-fields"
import { CheckoutSidebar } from "./checkout-sidebar"
import { CheckoutFormValues, checkoutFormSchema } from "../model/schema"
import { usePlaceOrder } from "../model/use-place-order"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function CheckoutForm() {
  const { cart, isLoading, setIsUpdating, isUpdating } = useCart()
  const cartItems = cart?.items ?? []
  const totalAmount = cart?.total ?? 0

  const router = useRouter()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
  })

  const { placeOrderAsync, isPending: isPlacingOrder } = usePlaceOrder()

  const onSubmit = async (data: CheckoutFormValues) => {
    await placeOrderAsync(data, {
      onSuccess: ({ paymentUrl }) => {
        if (paymentUrl) {
          router.push(paymentUrl)
        }
      },
      onError: () => {
        toast.error("Ошибка при оформлении заказа")
      },
    })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-10">
          {/* Левая часть */}
          <div className="flex flex-col gap-10 flex-1 mb-20">
            <CheckoutCart
              setIsUpdating={setIsUpdating}
              items={cartItems}
              isLoading={isLoading}
              className={
                isLoading || isPlacingOrder
                  ? "opacity-50 pointer-events-none"
                  : ""
              }
            />

            <CheckoutPersonalFields
              className={isLoading ? "opacity-50 pointer-events-none" : ""}
            />

            <CheckoutAddressFields
              className={isLoading ? "opacity-50 pointer-events-none" : ""}
            />
          </div>

          {/* Правая часть */}
          <div className="w-[450px]">
            <CheckoutSidebar
              totalAmount={totalAmount}
              isLoading={isLoading}
              isButtonDisabled={isUpdating}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
