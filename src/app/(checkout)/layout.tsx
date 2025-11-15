import { Metadata } from "next"

import { Toaster } from "@/shared"

import Header from "@/widgets/header"

export const metadata: Metadata = {
  title: "DooDoo Pizza | Оформление заказа",
  description: "DooDoo Pizza - Оформление заказа",
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main className="min-h-screen bg-[#F4F1EE]">
        <Header
          hasSearch={false}
          hasCart={false}
          className="border-b-gray-200"
        />

        {children}
      </main>
      <Toaster richColors />
    </>
  )
}
