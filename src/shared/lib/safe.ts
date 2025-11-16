import { logger } from "./logger"

export async function safe<T>(
  fn: () => Promise<T>,
  context?: string
): Promise<T | null> {
  try {
    return await fn()
  } catch (error) {
    if (context) {
      logger.error(`[${context}] Operation failed`, error)
    }
    return null
  }
}
