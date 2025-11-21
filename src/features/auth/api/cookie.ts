import { cache } from "react"
import { cookies } from "next/headers"
import { Session } from "@prisma/client"
import { prisma } from "db/prisma"

import { validateSession } from "./session"

export const getSessionFromCookie = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value ?? null

  if (token === null) return null

  return validateSession(token, prisma)
})

export const setSessionTokenCookie = async (
  token: string,
  expiresAt: Date
): Promise<void> => {
  const cookieStore = await cookies()
  cookieStore.set("session", token, {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
  })
}

export const deleteSessionTokenCookie = async (): Promise<void> => {
  const cookieStore = await cookies()
  cookieStore.set("session", "", {
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
  })
}
