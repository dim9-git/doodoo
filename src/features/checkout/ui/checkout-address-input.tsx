import { ErrorMessage, RequiredSymbol } from "@/shared"
import { Controller, useFormContext } from "react-hook-form"

import { AddressAutocomplete } from "@/features/geosuggest"

interface Props {
  name: string
  label?: string
  required?: boolean
  className?: string
  inputClassName?: string
}

export default function CheckoutAddressInput({
  name,
  label,
  required,
  className,
  inputClassName,
}: Props) {
  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext()

  const onClear = () => {
    setValue(name, "", { shouldValidate: true })
  }

  const errorMessage = errors[name]?.message as string | undefined

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="font-medium mb-2">
          {label}
          {required && <RequiredSymbol />}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <AddressAutocomplete
              value={field.value}
              onChange={field.onChange}
              onClear={onClear}
              className={inputClassName}
            />
          )
        }}
      />

      {errorMessage && (
        <ErrorMessage message={errorMessage} className="pl-0.5" />
      )}
    </div>
  )
}
