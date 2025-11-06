import type { Metadata } from "next"
import { Nunito } from "next/font/google"

import { cn } from "@/shared/lib/utils"

import { Providers } from "@/widgets/providers"

import "./globals.css"

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "DooDoo Pizza",
  description: "DooDoo Pizza - Лучшая пицца в городе",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(nunito.className, "antialiased")}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
