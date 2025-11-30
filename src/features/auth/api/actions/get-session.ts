"use server"

import { getSessionFromCookie } from "../cookies"

export const actionGetSession = async () => {
  return await getSessionFromCookie()
}
