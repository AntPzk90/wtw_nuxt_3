import { MOVIE_TABS } from '~/constants/constants'
import type { MovieTab } from '~/types'

export function isMovieTab(value: unknown): value is MovieTab {
  return MOVIE_TABS.includes(value as MovieTab)
}
