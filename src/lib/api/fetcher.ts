export type FetchOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE'
  body?: unknown
  headers?: Record<string, string>
}

export type FetchError = {
  status: number
  message: string
}

export async function fetcher<T>(
  url: string,
  options: FetchOptions = {},
  signal?: AbortSignal,
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options

  const apiUrl = url.startsWith('http')
    ? url
    : `/api${url.startsWith('/') ? '' : '/'}${url}`

  const response = await fetch(apiUrl, {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body ? JSON.stringify(body) : undefined,
    signal,
  })

  const data = await response.json()

  if (!response.ok) {
    const error: FetchError = {
      status: response.status,
      message: data.message || 'Something went wrong',
    }
    throw error
  }

  return data
}

export const api = {
  get: <T>(
    url: string,
    options?: Omit<FetchOptions, 'method' | 'body'>,
    signal?: AbortSignal,
  ) => fetcher<T>(url, { ...options, method: 'GET' }, signal),

  post: <T>(
    url: string,
    data: unknown,
    options?: Omit<FetchOptions, 'method'>,
    signal?: AbortSignal,
  ) => fetcher<T>(url, { ...options, method: 'POST', body: data }, signal),

  patch: <T>(
    url: string,
    data: unknown,
    options?: Omit<FetchOptions, 'method'>,
    signal?: AbortSignal,
  ) => fetcher<T>(url, { ...options, method: 'PATCH', body: data }, signal),

  delete: <T>(
    url: string,
    options?: Omit<FetchOptions, 'method' | 'body'>,
    signal?: AbortSignal,
  ) => fetcher<T>(url, { ...options, method: 'DELETE' }, signal),
}
