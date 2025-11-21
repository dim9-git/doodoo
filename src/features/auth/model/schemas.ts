import { z } from "zod"

export const passwordSchema = z
  .string()
  .min(4, { message: "Введите корректный пароль" })

export const formLoginSchema = z.object({
  email: z.email({ message: "Введите корректную почту" }),
  password: passwordSchema,
})

export const formRegisterSchema = formLoginSchema
  .extend({
    firstName: z.string().min(2, { message: "Введите имя" }),
    // lastName: z.string().min(2, { message: "Введите фамилию" }),
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })

export type FormLoginValues = z.infer<typeof formLoginSchema>
export type FormRegisterValues = z.infer<typeof formRegisterSchema>
