import {
  HttpError,
  HttpResponse,
  RequestConfig,
  RequestInterceptor,
  RequestInterceptorFulfilled,
  RequestInterceptorRejected,
  ResponseInterceptor,
  ResponseInterceptorFulfilled,
  ResponseInterceptorRejected,
} from "./http.types"

class HttpClient {
  private baseUrl: string = ""
  private defaultHeaders: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  }

  private requestInterceptors: (RequestInterceptor | null)[] = []
  private responseInterceptors: (ResponseInterceptor | null)[] = []

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  protected interceptors = {
    request: {
      use: (
        fulfilled?: RequestInterceptorFulfilled,
        rejected?: RequestInterceptorRejected
      ) => {
        const id = this.requestInterceptors.length
        this.requestInterceptors.push({ fulfilled, rejected })
        return id
      },
      eject: (id: number) => {
        if (this.requestInterceptors[id]) {
          this.requestInterceptors[id] = null
        }
      },
    },
    response: {
      use: (
        fulfilled: ResponseInterceptorFulfilled,
        rejected: ResponseInterceptorRejected
      ) => {
        const id = this.responseInterceptors.length
        this.responseInterceptors.push({ fulfilled, rejected })
        return id
      },
      eject: (id: number) => {
        if (this.responseInterceptors[id]) {
          this.responseInterceptors[id] = null
        }
      },
    },
  }

  private buildUrl(url: string, params?: any): string {
    let fullURL = url.startsWith("http") ? url : `${this.baseUrl}${url}`

    if (params) {
      const searchParams = new URLSearchParams()

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })

      const queryString = searchParams.toString()
      if (queryString) {
        fullURL += (fullURL.includes("?") ? "&" : "?") + queryString
      }
    }

    return fullURL
  }

  async request<T>(config: RequestConfig): Promise<HttpResponse<T>> {
    const controller = config.signal ? null : new AbortController()
    const signal = config.signal || controller?.signal

    let timeoutId: ReturnType<typeof setTimeout> | null = null
    if (config.timeout && !config.signal) {
      timeoutId = setTimeout(() => controller!.abort(), config.timeout)
    }

    try {
      let finalConfig = { ...config }
      for (const interceptor of this.requestInterceptors) {
        if (interceptor && interceptor.fulfilled) {
          finalConfig = await interceptor.fulfilled(finalConfig)
        }
      }

      const url = this.buildUrl(finalConfig.url!, finalConfig.params)

      let body: BodyInit | undefined = undefined
      if (finalConfig.data) {
        if (
          finalConfig.data instanceof FormData ||
          finalConfig.data instanceof URLSearchParams
        ) {
          body = finalConfig.data
        } else {
          body = JSON.stringify(finalConfig.data)
        }
      }

      const headers = new Headers({
        ...this.defaultHeaders,
        ...finalConfig.headers,
      })

      const request = new Request(url, {
        method: finalConfig.method || "GET",
        body,
        headers,
        signal,
        ...finalConfig,
      })

      const response = await fetch(request)

      if (timeoutId) clearTimeout(timeoutId)

      let data: T
      const contentType = response.headers.get("content-type") || ""
      if (contentType.includes("application/json")) {
        data = await response.json()
      } else if (contentType.includes("text/")) {
        data = (await response.text()) as T
      } else {
        data = (await response.blob()) as T
      }

      const httpResponse: HttpResponse<T> = {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config: finalConfig,
        request,
      }

      if (!response.ok) {
        const error = new HttpError(
          `Request failed with status code ${response.status}`,
          response,
          request,
          finalConfig
        )
        throw error
      }

      let finalResponse = httpResponse
      for (const interceptor of this.responseInterceptors) {
        if (interceptor && interceptor.fulfilled) {
          finalResponse = (await interceptor.fulfilled(
            finalResponse
          )) as HttpResponse<T>
        }
      }

      return finalResponse
    } catch (error) {
      if (timeoutId) clearTimeout(timeoutId)

      if (error instanceof Error && error.name === "AbortError") {
        const abortError = new HttpError(
          config.timeout
            ? "timeout of " + config.timeout + "ms exceeded"
            : "Request aborted",
          undefined,
          undefined,
          config
        )

        // Apply request interceptors (rejected)
        for (const interceptor of this.requestInterceptors) {
          if (interceptor && interceptor.rejected) {
            try {
              await interceptor.rejected(abortError)
            } catch (e) {
              // Ignore errors in rejected handlers
            }
          }
        }

        // Apply response interceptors (rejected)
        for (const interceptor of this.responseInterceptors) {
          if (interceptor && interceptor.rejected) {
            try {
              await interceptor.rejected(abortError)
            } catch (e) {
              // Ignore errors in rejected handlers
            }
          }
        }

        throw abortError
      }

      // Handle other errors
      let httpError: HttpError
      if (error instanceof HttpError) {
        httpError = error
      } else {
        httpError = new HttpError(
          error instanceof Error ? error.message : "Unknown error",
          undefined,
          undefined,
          config
        )
      }

      // Apply request interceptors (rejected)
      for (const interceptor of this.requestInterceptors) {
        if (interceptor && interceptor.rejected) {
          try {
            await interceptor.rejected(httpError)
          } catch (e) {
            // Ignore errors in rejected handlers
          }
        }
      }

      // Apply response interceptors (rejected)
      for (const interceptor of this.responseInterceptors) {
        if (interceptor && interceptor.rejected) {
          try {
            const result = await interceptor.rejected(httpError)
            // If interceptor returns a value, use it as the response
            if (result) {
              return result as HttpResponse<T>
            }
          } catch (e) {
            // If interceptor throws, continue with original error
          }
        }
      }

      throw httpError
    }
  }

  get<T>(url: string, config?: RequestConfig): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, method: "GET", url })
  }

  post<T = unknown>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: "POST", data })
  }

  put<T = unknown>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: "PUT", data })
  }

  patch<T = unknown>(
    url: string,
    data?: any,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: "PATCH", data })
  }

  delete<T = unknown>(
    url: string,
    config?: RequestConfig
  ): Promise<HttpResponse<T>> {
    return this.request<T>({ ...config, url, method: "DELETE" })
  }
}

export { HttpClient }
