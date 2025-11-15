import { cn } from "../lib/utils"

interface Props {
  className?: string
}

export default function RequiredSymbol({ className }: Props) {
  return <span className={cn("text-red-500", className)}>*</span>
}
