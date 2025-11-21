import { prisma } from "db/prisma"

import { UserProvider } from "../model/user.provider"

export const createUserWithGoogleId = async (
  email: string,
  name: string,
  provider: UserProvider,
  providerId: string
) => {
  const newUser = await prisma.user.create({
    data: {
      provider,
      providerId,
      email,
      password: "",
      firstName: name,
    },
  })
  return newUser
}
