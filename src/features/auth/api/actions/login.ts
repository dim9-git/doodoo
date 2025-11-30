"use server"

import { compare } from "bcrypt"
import { prisma } from "db/prisma"

import { FormLoginValues } from "../../model/schemas"
import { setSessionTokenCookie } from "../cookie"
import { createSessionToken } from "../session"


export type LoginUserDTO = FormLoginValues

export const actionLogin = async (payload: LoginUserDTO) => {
  try {
    const { email, password } = payload

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error("Пользователь не найден")
    }

    if (user.provider) {
      throw new Error("Неверный пароль")
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new Error("Неверный пароль")
    }

    const { token, expiresAt } = await createSessionToken(user.id)
    await setSessionTokenCookie(token, expiresAt)

    return {
      success: true,
    }
  } catch (error) {
    console.error("[LOGIN_USER] error:", error)
    throw error
  }
}
