import { hashSync } from "bcrypt"
import { prisma } from "db/prisma"

import { UserProvider } from "../model/user.provider"

const OAUTH_PASSWORD_PLACEHOLDER = hashSync(
  `oauth-placeholder-${crypto.randomUUID()}`,
  10
)

export const createUserWithGoogleId = async (
  email: string,
  name: string,
  picture: string,
  provider: UserProvider,
  providerId: string
) => {
  const nameParts = name.split(" ")
  const firstName = nameParts?.[0]
  const lastName = nameParts?.[1]

  const newUser = await prisma.user.create({
    data: {
      provider,
      providerId,
      email,
      password: OAUTH_PASSWORD_PLACEHOLDER,
      firstName,
      lastName,
      picture,
    },
  })
  return newUser
}
