"use client"

import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function CheckoutSuccessToast() {
  const searchParams = useSearchParams()
  const paid = searchParams.get("paid")

  if (paid) {
    toast.success("Заказ успешно оплачен 🎉.", {
      description:
        "Вся информация о заказе отправлена на вашу электронную почту.",
    })
  }

  return null
}
