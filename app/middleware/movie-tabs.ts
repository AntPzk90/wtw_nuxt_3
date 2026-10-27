export default defineNuxtRouteMiddleware((to) => {
  const tab = to.query.tab

  if (tab === undefined || isMovieTab(tab)) {
    return
  }

  return navigateTo({ ...to, query: { ...to.query, tab: 'overview' } }, { replace: true })
})
