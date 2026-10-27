export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthorized) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }
})
