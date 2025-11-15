"use client"

import { Controller, useFormContext } from "react-hook-form"

import RequiredSymbol from "../required-symbol"
import ClearButton from "../clear-button"
import ErrorMessage from "../error-message"
import MaskedInput, { MaskedInputProps } from "../masked-input"

interface Props extends Omit<MaskedInputProps, "mask"> {
  label?: string
  required?: boolean
}

export default function FormPhoneInput({
  name,
  label,
  required,
  className,
}: Props) {
  const {
    formState: { errors },
    control,
    setValue,
  } = useFormContext()

  const errorMessage = errors[name]?.message as string | undefined

  const onClear = () => {
    setValue(name, "", { shouldValidate: true })
  }

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
        render={({ field }) => (
          <div className="relative">
            <MaskedInput
              {...field}
              mask="+7 (000) 000-00-00"
              placeholder="+7 (___) ___-__-__"
              type="tel"
            />
            {field.value && <ClearButton onClick={onClear} />}
          </div>
        )}
      />

      {errorMessage && (
        <ErrorMessage message={errorMessage} className="pl-0.5" />
      )}
    </div>
  )
}
