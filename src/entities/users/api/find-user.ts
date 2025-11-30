import { prisma } from "db/prisma"

import { UserProvider } from "../model/user.provider"

export const findGoogleUser = async (id: string) => {
  const user = await prisma.user.findFirst({
    where: { provider: UserProvider.GOOGLE, providerId: id },
  })
  return user
}

export const findUser = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: { id },
  })
  return user
}
