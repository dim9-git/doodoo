import { prisma } from "db/prisma"
import { Prisma } from "@prisma/client"

export const updateUser = async (
  userId: number,
  data: Prisma.UserUpdateInput
) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data,
  })
  return user
}
