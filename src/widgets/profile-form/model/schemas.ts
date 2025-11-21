import z from "zod"

import { formRegisterSchema } from "@/features/auth"

export const formProfileSchema = formRegisterSchema

export type FormProfileValues = z.infer<typeof formProfileSchema>
