type ApiErrorResponse = {
  message: string
  code: number
}

class ApiError extends Error {
  code = 500
  constructor(message: string, code: number) {
    super(message)
    this.code = code
  }
}

const jsonIsApiError = (json: Record<string, any>): json is ApiErrorResponse => {
  return typeof json.code === 'number' && typeof json.message === 'string'
}

export const apiFetch = async <T = any>(
  endpoint: string,
  params?: Record<string, string | number | null | undefined>,
  body?: object,
  headers?: HeadersInit,
) => {
  let _params = ''

  // NOTE: filter empty values
  if (params && Object.entries(params).length) {
    params = Object.fromEntries(Object.entries(params).filter((param) => !!param[1]))
    if (Object.entries(params).length > 0) {
      _params = '?' + new URLSearchParams(params as Record<string, string>).toString()
    }
  }

  const url = `${process.env.NEXT_PUBLIC_APP_URL}/api${endpoint}${_params}`
  const result = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers,
    body: typeof body === 'object' ? JSON.stringify(body) : undefined,
  })

  const json = await result.json()

  if (result.ok) {
    return json as T
  }

  if (jsonIsApiError(json)) {
    throw new ApiError(json.message, json.code)
  }

  throw new ApiError('Something went wrong', 500)
}