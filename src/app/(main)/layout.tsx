import { Metadata } from "next"

import { APP_NAME, Toaster } from "@/shared"

import Header from "@/widgets/header"

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_NAME + " - Лучшая пицца в городе",
}

export default function MainLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      <main className="min-h-screen">
        <Header />
        {children}
      </main>
      {modal}
      <Toaster richColors />
    </>
  )
}
