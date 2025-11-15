import React from "react"

import { Title } from "./title"
import { cn } from "../lib/utils"

interface Props extends React.PropsWithChildren {
  title?: string
  endAdornment?: React.ReactNode
  className?: string
  contentClassName?: string
}

export default function WhiteBlock({
  title,
  endAdornment,
  className,
  contentClassName,
  children,
}: Props) {
  return (
    <div className={cn("bg-white rounded-3xl", className)}>
      {title && (
        <div className="flex items-center justify-between py-5 px-7 border-b border-gray-100">
          <Title text={title} size="sm" className="font-bold" />
          {endAdornment}
        </div>
      )}

      <div className={cn("px-5 py-4", contentClassName)}>{children}</div>
    </div>
  )
}
