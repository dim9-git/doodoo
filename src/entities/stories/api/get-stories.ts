import { Api } from "@/shared/lib/http"

import { StoryResponseDTO } from "./dto/response"

export const getStories = async (): Promise<StoryResponseDTO[]> => {
  const stories = await Api.get<StoryResponseDTO[]>("/api/stories")
  return stories.data
}
