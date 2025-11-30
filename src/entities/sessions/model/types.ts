import { Prisma, Session as PrismaSession } from "db/generated/client"

import { withUser } from "./relations"

export type Session = PrismaSession

export type SessionWithUser = Prisma.SessionGetPayload<{
  include: typeof withUser
}>
