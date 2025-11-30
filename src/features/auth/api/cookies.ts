import { cache } from "react"
import { cookies } from "next/headers"
import { prisma } from "db/prisma"

import { SessionWithUser } from "@/entities/sessions"

import { validateSession } from "./sessions"

type SessionWithoutSecretHash = Omit<SessionWithUser, "secretHash">

export const getSessionFromCookie = cache(
  async (): Promise<SessionWithoutSecretHash | null> => {
    const cookieStore = await cookies()
    const token = cookieStore.get("session")?.value ?? null

    if (token === null) return null

    const session = await validateSession(token, prisma)
    if (session === null) return null

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { secretHash, ...sessionWithoutSecretHash } = session
    return sessionWithoutSecretHash
  }
)

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
