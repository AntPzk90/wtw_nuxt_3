<template>
  <div>
    <MoviePromo />

    <div class="page-content">
      <section class="catalog">
        <h2 class="catalog__title visually-hidden">Catalog</h2>
        <LoaderBlock v-if="status === 'pending' && !films.length"></LoaderBlock>
        <ErrorBlock v-else-if="status === 'error'">
          Failed to load films. Please try again later.
        </ErrorBlock>
        <template v-else>
          <CatalogGenres :genres="genres" :active-genre="activeGenre" />
          <CatalogMoviesList :films="filteredFilms.slice(0, filmsCount)" />
          <ShowMoreButton v-if="hasMoreFilms" @show-more="onShowMore" />
        </template>
      </section>

      <PageFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Film } from '~/types'
import { FILMS_COUNT } from '~/constants/constants'

const route = useRoute()

const { data: films, status } = useApiFetch<Film[]>('/films', { default: () => [] })

const genres = computed(() => [...new Set(films.value.map((film) => film.genre))])

const activeGenre = computed(() => {
  const genre = route.query.genre
  return typeof genre === 'string' && genres.value.includes(genre) ? genre : null
})

const filteredFilms = computed(() =>
  activeGenre.value ? films.value.filter((film) => film.genre === activeGenre.value) : films.value,
)

const filmsCount = ref(FILMS_COUNT)
const hasMoreFilms = computed(() => filmsCount.value < filteredFilms.value.length)

watch(activeGenre, () => {
  filmsCount.value = FILMS_COUNT
})

const onShowMore = () => {
  filmsCount.value += FILMS_COUNT
}
</script>
