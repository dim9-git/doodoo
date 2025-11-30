"use server"

import { deleteSession } from "@/entities/sessions"
import { deleteSessionTokenCookie, getSessionFromCookie } from "../cookies"

export const actionLogout = async () => {
  try {
    const session = await getSessionFromCookie()

    if (!session?.id) {
      throw new Error("Session not found")
    }

    await deleteSession(session.id)
    await deleteSessionTokenCookie()

    return {
      success: true,
    }
  } catch (error) {
    console.error("[LOGOUT_USER] error:", error)
    throw error
  }
}
