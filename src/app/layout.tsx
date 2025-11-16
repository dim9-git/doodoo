import type { Metadata } from "next"
import { Nunito } from "next/font/google"

import { cn, APP_NAME } from "@/shared"

import { Providers } from "@/widgets/providers"

import "./globals.css"

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_NAME + " - Лучшая пицца в городе",
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
