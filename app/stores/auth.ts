import type { User, AuthData, AuthInfo } from '~/types'
import type { FetchError } from 'ofetch'

export const useAuthStore = defineStore('auth', () => {
  const token = useTokenCookie()

  const user = ref<User | null>(null)

  const isAuthorized = computed(() => user.value !== null)

  const login = async (authData: AuthData) => {
    const { token: newToken, ...userData } = await apiFetch<AuthInfo>('/login', 'POST', authData)
    token.value = newToken
    user.value = userData
  }

  const resetAuth = () => {
    token.value = null
    user.value = null
  }

  const logout = async () => {
    try {
      await apiFetch('/logout', 'DELETE')
    } finally {
      resetAuth()
    }
  }

  const checkAuth = async () => {
    if (!token.value || user.value) return

    try {
      const { token: _, ...userData } = await apiFetch<AuthInfo>('/login')
      user.value = userData
    } catch (error) {
      if ((error as FetchError).statusCode === 401) {
        resetAuth()
      }
    }
  }

  return { user, isAuthorized, login, logout, checkAuth, resetAuth }
})
