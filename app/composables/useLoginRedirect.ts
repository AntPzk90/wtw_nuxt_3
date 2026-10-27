export function useLoginRedirect() {
  const authStore = useAuthStore()
  const route = useRoute()
  const { $toast } = useNuxtApp()

  return () => {
    authStore.resetAuth()
    $toast.error('Please sign in to continue')
    return navigateTo({ path: '/login', query: { redirect: route.fullPath } })
  }
}
