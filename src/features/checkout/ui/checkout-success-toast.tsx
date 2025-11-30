"use client"

import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function CheckoutSuccessToast() {
  const searchParams = useSearchParams()
  const paid = searchParams.get("paid")

  if (paid === "true") {
    toast.success("Заказ успешно оплачен 🎉.", {
      description:
        "Вся информация о заказе отправлена на вашу электронную почту.",
    })
  } 

  if (paid === "false") {
    toast.error("Заказ не оплачен 🚫.", {
      description:
        "Пожалуйста, оплатите заказ, чтобы получить его.",
    })
  }

  return null
}
