import type { HttpMethod } from '~/types'

const getAuthHeaders = (token: string | null | undefined): Record<string, string> =>
  token ? { 'X-Token': token } : {}

// For actions (clicks, submits, store actions): a plain request, no SSR payload.
export function apiFetch<T>(
  url: string,
  method: HttpMethod = 'GET',
  body?: Record<string, unknown>,
): Promise<T> {
  const config = useRuntimeConfig()
  const token = useTokenCookie()

  return $fetch<T>(url, {
    method,
    baseURL: config.public.apiBase,
    headers: getAuthHeaders(token.value),
    body,
  })
}

export const useApiFetch = createUseFetch(() => {
  const config = useRuntimeConfig()
  const token = useTokenCookie()

  return {
    baseURL: config.public.apiBase,
    headers: computed(() => getAuthHeaders(token.value)),
  }
})
