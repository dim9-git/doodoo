import { X } from "lucide-react"

import { cn } from "../lib/utils"

interface Props {
  className?: string
  onClick?: VoidFunction
}

export default function ClearButton({ className, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "z-10 absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer",
        className
      )}
    >
      <X className="size-5" />
    </button>
  )
}
