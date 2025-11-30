import { PrismaClient } from "db/generated/client"
import { prisma as prismaInstance } from "db/prisma"

import { withUser } from "../model/relations"

export const getSession = async (sessionId: string, pc?: PrismaClient) => {
  const prisma = pc || prismaInstance

  return await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
  })
}

export const getSessionWithUser = async (
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
