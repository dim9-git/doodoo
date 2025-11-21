"use client"

import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { FormInput, Title, Button } from "@/shared"

import { formLoginSchema, FormLoginValues } from "../model/schemas"
import { useLogin } from "../model/use-login"

interface Props {
  onClose: () => void
}

export default function LoginForm({ onClose }: Props) {
  const form = useForm<FormLoginValues>({
    resolver: zodResolver(formLoginSchema),
  })

  const { loginAsync, isPending } = useLogin()

  const onSubmit = (data: FormLoginValues) => {
    loginAsync(data, {
      onSuccess: () => {
        onClose()
      },
      onError: () => {
        toast.error("Ошибка при входе в аккаунт")
      },
    })
  }

  const isLoading = isPending || form.formState.isSubmitting

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button isLoading={isLoading} className="h-12 text-base" type="submit">
          Войти
        </Button>
      </form>
    </FormProvider>
  )
}
