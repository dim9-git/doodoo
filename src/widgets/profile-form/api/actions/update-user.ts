"use server"

import { hashSync } from "bcrypt"

import { findUser, updateUser } from "@/entities/users"

import { getSessionFromCookie } from "@/features/auth/api"

import { FormProfileValues } from "../../model/schemas"

export const actionUpdateUser = async (payload: FormProfileValues) => {
  const session = await getSessionFromCookie()

  if (!session?.userId) {
    throw new Error("Session not found")
  }

  const user = await findUser(session.userId)

  if (!user) {
    throw new Error("User not found")
  }

  return await updateUser(session.userId, {
    firstName: payload.firstName,
    email: payload.email,
    password: payload.password
      ? hashSync(payload.password as string, 10)
      : user?.password,
  })
}
