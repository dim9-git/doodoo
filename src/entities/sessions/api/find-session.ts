import { prisma as prismaInstance } from "db/prisma"
import { PrismaClient } from "db/generated/client"

import { withUser } from "../model/relations"

export const findSession = async (sessionId: string, pc?: PrismaClient) => {
  const prisma = pc || prismaInstance

  return await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  })
}

export const findSessionWithUser = async (
  sessionId: string,
  pc?: PrismaClient
) => {
  const prisma = pc || prismaInstance

  return await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: withUser,
  })
}
