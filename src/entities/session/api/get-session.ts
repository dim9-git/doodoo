import { Prisma, PrismaClient } from "@prisma/client"
import { prisma as prismaInstance } from "db/prisma"

import { deleteSession } from "./delete-session"

export const getSession = async (
  sessionId: string,
  pc?: PrismaClient
): Promise<Prisma.SessionGetPayload<Prisma.SessionDefaultArgs> | null> => {
  const prisma = pc || prismaInstance
  const now = new Date()

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  })

  if (session === null) {
    return null
  }

  if (now.getTime() >= session.expiresAt.getTime()) {
    await deleteSession(sessionId, pc)
    return null
  }

  return session
}
