import React from "react"

import { cn } from "../lib/utils"

interface Props extends React.PropsWithChildren {
  className?: string
}

export function Container({ className, children }: Props) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] max-xl:px-4", className)}>
      {children}
    </div>
  )
}
