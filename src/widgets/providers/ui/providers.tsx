import NextTopLoader from "nextjs-toploader"

import QCProvider from "@/shared/ui/qc-provider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <QCProvider>{children}</QCProvider>
      <NextTopLoader showSpinner={false} />
    </>
  )
}
