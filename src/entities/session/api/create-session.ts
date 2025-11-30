import { Prisma, PrismaClient } from "db/generated/client"
import { prisma as prismaInstance } from "db/prisma"

export const createSession = async (
  data: Prisma.SessionCreateInput,
  pc?: PrismaClient
) => {
  const prisma = pc || prismaInstance
  return await prisma.session.create({
    data,
  })
}
