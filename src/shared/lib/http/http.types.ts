type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

export interface RequestConfig extends RequestInit {
  url?: string
  method?: Method
  data?: unknown
  params?: Record<string, string | number | boolean>
  baseURL?: string
  timeout?: number
  headers?: HeadersInit
}

export interface HttpResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: Headers
  config: RequestConfig
  request?: Request
}

export class HttpError extends Error {
  constructor(
    message: string,
    public response?: Response,
    public request?: Request,
    public config?: RequestConfig
  ) {
    super(message)
    this.name = "HttpError"
  }
}

export type RequestInterceptorFulfilled = (
  config: RequestConfig
) => RequestConfig | Promise<RequestConfig>
export type RequestInterceptorRejected = (error: any) => any | Promise<any>

export type ResponseInterceptorFulfilled<T = unknown> = (
  response: HttpResponse<T>
) => HttpResponse<T> | Promise<HttpResponse<T>>
export type ResponseInterceptorRejected = (
  error: HttpError
) => any | Promise<any>

export type RequestInterceptor = {
  fulfilled?: RequestInterceptorFulfilled
  rejected?: RequestInterceptorRejected
}
export type ResponseInterceptor = {
  fulfilled?: ResponseInterceptorFulfilled
  rejected?: ResponseInterceptorRejected
}
