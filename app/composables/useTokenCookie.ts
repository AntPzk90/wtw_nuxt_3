import { TOKEN_COOKIE_NAME } from '~/constants/constants'
export function useTokenCookie() {
  return useCookie<string | null>(TOKEN_COOKIE_NAME, {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
    secure: !import.meta.dev,
    path: '/',
  })
}
