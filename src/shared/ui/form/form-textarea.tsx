"use client"

import { useFormContext } from "react-hook-form"

import { Textarea } from "../sh/textarea"
import RequiredSymbol from "../required-symbol"
import ClearButton from "../clear-button"
import ErrorMessage from "../error-message"

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label?: string
  required?: boolean
  className?: string
}

export default function FormTextarea({
  name,
  label,
  required,
  className,
  ...props
}: Props) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const value = watch(name)
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

      <div className="relative">
        <Textarea className="h-12 text-md" {...register(name)} {...props} />
        {value && <ClearButton onClick={onClear} />}
      </div>

      {errorMessage && (
        <ErrorMessage message={errorMessage} className="pl-0.5" />
      )}
    </div>
  )
}
