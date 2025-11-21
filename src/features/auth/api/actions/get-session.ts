"use server"

import { getSessionFromCookie } from "../cookie"

export const actionGetSession = async () => {
  return await getSessionFromCookie()
}
