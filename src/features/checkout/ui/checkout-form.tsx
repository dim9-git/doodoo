"use client"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCart } from "@/entities/cart"

import { useSession } from "@/features/auth"

import CheckoutCart from "./checkout-cart"
import CheckoutAddressFields from "./checkout-address-fields"
import CheckoutPersonalFields from "./checkout-personal-fields"
import { CheckoutSidebar } from "./checkout-sidebar"
import { CheckoutFormValues, checkoutFormSchema } from "../model/schema"
import { usePlaceOrder } from "../model/use-place-order"
import { useEffect } from "react"

export default function CheckoutForm() {
  const router = useRouter()

  const { session } = useSession()

  const { cart, isLoading, setIsUpdating, isUpdating } = useCart()
  const cartItems = cart?.items ?? []
  const totalAmount = cart?.total ?? 0

  const { placeOrderAsync, isPending: isPlacingOrder } = usePlaceOrder()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: session?.user?.firstName ?? "",
      lastName: session?.user?.lastName ?? "",
      email: session?.user?.email ?? "", 
    },
  })

  useEffect(() => {
    if (session?.user) {
      form.reset({
        firstName: session.user.firstName ?? "",
        lastName: session.user.lastName ?? "",
        email: session.user.email ?? "",
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

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
              isUpdating={isUpdating}
              isSubmitting={isPlacingOrder}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
