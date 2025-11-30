"use client"

import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function VerifySuccessToast() {
  const searchParams = useSearchParams()
  const verified = searchParams.get("verified")

  if (verified === "true") {
    toast.success("Email успешно подтвержден 🎉.", {
      description: "Вы можете теперь входить в систему.",
    })
  }

  return null
}
