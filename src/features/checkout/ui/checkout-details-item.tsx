import { cn } from "@/shared"

interface Props {
  title?: React.ReactNode
  value?: React.ReactNode
  className?: string
}

export default function CheckoutDetailsItem({
  title,
  value,
  className,
}: Props) {
  return (
    <div className={cn("flex my-4", className)}>
      <span className="flex flex-1 text-lg text-neutral-500">
        {title}
        <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
      </span>

      <span className="font-bold text-lg">{value}</span>
    </div>
  )
}
