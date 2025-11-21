"use server"

import { Prisma } from "@prisma/client"
import { hashSync } from "bcrypt"
import { prisma } from "db/prisma"

import { APP_NAME } from "@/shared"
import { sendMail } from "@/shared/lib"

import UserVerification from "../../ui/mail-templates/user-verification"

export type RegisterUserDTO = Prisma.UserCreateInput

export const actionRegister = async (payload: RegisterUserDTO) => {
  try {
    const { firstName, email, password } = payload

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    })

    if (user) {
      if (!user.verified) {
        throw new Error("Почта не подтверждена")
      }

      throw new Error("Пользователь уже существует")
    }

    const createdUser = await prisma.user.create({
      data: {
        firstName,
        email,
        password: hashSync(password, 10),
      },
    })

    const code = Math.floor(100000 + Math.random() * 900000).toString()

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    })

    await sendMail(
      createdUser.email,
      `${APP_NAME} / 📝 Подтверждение регистрации`,
      UserVerification({
        code,
      })
    )
  } catch (err) {
    console.error("[REGISTER_USER] error:", err)
    throw err
  }
}
