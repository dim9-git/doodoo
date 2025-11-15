import { forwardRef } from "react"
import { IMaskMixin } from "react-imask"

import { Input } from "./sh/input"
import { cn } from "../lib/utils"

const IMInput = IMaskMixin(({ inputRef, ...props }) => (
  <Input ref={inputRef as React.Ref<HTMLInputElement>} {...props} />
))

export interface MaskedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "required"> {
  name: string
  mask: string
}

const MaskedInput = forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ className, mask, placeholder, type, ...props }, ref) => {
    return (
      <IMInput
        inputRef={ref}
        mask={mask}
        className={cn("h-12 text-md", className)}
        placeholder={placeholder}
        type={type}
        {...props}
      />
    )
  }
)

MaskedInput.displayName = "MaskedInput"

export default MaskedInput
