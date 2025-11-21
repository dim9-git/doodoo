import { PrismaClient } from "@prisma/client"
import { prisma as prismaInstance } from "db/prisma"

export const deleteSession = async (
  sessionId: string,
  pc?: PrismaClient
): Promise<void> => {
  const prisma = pc || prismaInstance
  await prisma.session.delete({
    where: {
      id: sessionId,
    },
  })
}
