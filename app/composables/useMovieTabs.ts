import type { MovieTab } from '~/types'

export function useMovieTabs() {
  const route = useRoute()

  const activeTab = computed<MovieTab>(() => {
    const tab = route.query.tab
    return isMovieTab(tab) ? tab : 'overview'
  })

  return { activeTab }
}
