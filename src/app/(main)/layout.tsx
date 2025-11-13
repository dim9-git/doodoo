import { Toaster } from "@/shared"

import Header from "@/widgets/header"

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
      <Toaster />
    </>
  )
}
