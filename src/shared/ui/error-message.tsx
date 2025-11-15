import { cn } from "../lib/utils"

interface Props {
  message: string
  className?: string
}

export default function ErrorMessage({ message, className }: Props) {
  return <p className={cn("text-red-500 text-sm", className)}>{message}</p>
}
