"use client"

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { FormInput, Button } from "@/shared"

import { FormRegisterValues, formRegisterSchema } from "../model/schemas"
import { useRegister } from "../model/use-register"

interface Props {
  onClose: () => void
}

export default function RegisterForm({ onClose }: Props) {
  const form = useForm<FormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
  })
  const {
    formState: { isSubmitting },
  } = form

  const { registerAsync } = useRegister()

  const onSubmit = (data: FormRegisterValues) => {
    registerAsync(data, {
      onSuccess: () => {
        toast.success("Регистрация успешна")
        onClose()
      },
      onError: () => {
        toast.error("Ошибка при регистрации")
      },
    })
  }

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="firstName" label="Имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          required
        />

        <Button
          isLoading={isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  )
}
