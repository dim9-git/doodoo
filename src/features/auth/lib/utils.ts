export const generateSecureRandomString = (): string => {
  const alphabet = "abcdefghijkmnpqrstuvwxyz23456789"

  // Generate 24 bytes = 192 bits of entropy.
  // We're only going to use 5 bits per byte so the total entropy will be 192 * 5 / 8 = 120 bits
  const bytes = new Uint8Array(24)
  crypto.getRandomValues(bytes)

  let id = ""
  for (let i = 0; i < bytes.length; i++) {
    id += alphabet[bytes[i] >> 3]
  }
  return id
}

export const hashSecret = async (
  secret: string
): Promise<Uint8Array<ArrayBuffer>> => {
  const secretBytes = new TextEncoder().encode(secret)
  const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes)
  return new Uint8Array(secretHashBuffer)
}

export const constantTimeEqual = (a: Uint8Array, b: Uint8Array): boolean => {
  if (a.byteLength !== b.byteLength) {
    return false
  }
  let c = 0
  for (let i = 0; i < a.byteLength; i++) {
    c |= a[i] ^ b[i]
  }
  return c === 0
}
