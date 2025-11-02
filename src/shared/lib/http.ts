type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

async function request<T>(
  url: string,
  method: Method,
  body?: unknown,
  init?: RequestInit
): Promise<T> {
  const hasBody = body !== undefined

  const res = await fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      // only set Content-Type when we actually send a body
      ...(hasBody ? { "Content-Type": "application/json" } : {}),
      ...(init?.headers || {}),
    },
    body: hasBody ? JSON.stringify(body) : undefined,
    ...init,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(text || res.statusText)
  }

  if (res.status === 204) return undefined as T

  return (await res.json()) as T
}

export const http = {
  get: <T>(url: string, init?: RequestInit) =>
    request<T>(url, "GET", undefined, init),
  delete: <T>(url: string, init?: RequestInit) =>
    request<T>(url, "DELETE", undefined, init),
  post: <T>(url: string, data?: unknown, init?: RequestInit) =>
    request<T>(url, "POST", data, init),
  patch: <T>(url: string, data?: unknown, init?: RequestInit) =>
    request<T>(url, "PATCH", data, init),
  put: <T>(url: string, data?: unknown, init?: RequestInit) =>
    request<T>(url, "PUT", data, init),
}
