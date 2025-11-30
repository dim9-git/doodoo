import { PrismaClient } from "db/generated/client"

import {
  createSession,
  deleteSession,
  getSessionWithUser,
} from "@/entities/session"

import {
  constantTimeEqual,
  hashSecret,
  generateSecureRandomString,
} from "../lib/utils"

export const SESSION_EXPIRES_IN_SECONDS = 60 * 60 * 24 // 1 day

export const createSessionToken = async (
  userId: number,
  pc?: PrismaClient
): Promise<{
  token: string
  expiresAt: Date
}> => {
  const now = new Date()
  const id = generateSecureRandomString()
  const secret = generateSecureRandomString()
  const secretHash = await hashSecret(secret)

  const token = id + "." + secret

  const expiresAt = new Date(now.getTime() + SESSION_EXPIRES_IN_SECONDS * 1000)

  await createSession(
    {
      id,
      secretHash,
      expiresAt: new Date(now.getTime() + SESSION_EXPIRES_IN_SECONDS * 1000),
      user: {
        connect: {
          id: userId,
        },
      },
    },
    pc
  )

  return { token, expiresAt }
}

export const validateSession = async (token: string, pc?: PrismaClient) => {
  const now = new Date()

  const tokenParts = token.split(".")
  if (tokenParts.length !== 2) {
    return null
  }
  const sessionId = tokenParts[0]
  const sessionSecret = tokenParts[1]

  const session = await getSessionWithUser(sessionId, pc)
  if (session === null) {
    return null
  }

  if (now.getTime() >= session.expiresAt.getTime()) {
    await deleteSession(sessionId, pc)
    return null
  }

  const tokenSecretHash = await hashSecret(sessionSecret)

  const validSecret = constantTimeEqual(tokenSecretHash, session.secretHash)
  if (!validSecret) {
    return null
  }

  return session
}
