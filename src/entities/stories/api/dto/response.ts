import { Prisma } from "db/generated/browser"

export type StoryResponseDTO = Prisma.StoryGetPayload<{
  include: {
    items: true
  }
}>
