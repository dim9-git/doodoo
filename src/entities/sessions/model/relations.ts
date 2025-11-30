import { Prisma } from "db/generated/client"

export const withUser = {
  user: {
    select: {
      email: true,
      firstName: true,
      lastName: true,
      picture: true,
      role: true,
    },
  },
} satisfies Prisma.SessionInclude
