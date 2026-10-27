<template>
  <div>
    <LoaderBlock v-if="status === 'pending'" />
    <div v-else-if="film">
      <section class="movie-card movie-card--full">
        <div class="movie-card__hero">
          <MovieBackground :src="film.backgroundImage" :alt="film.name" />

          <h1 class="visually-hidden">WTW</h1>

          <PageHeader class="movie-card__head" />

          <div class="movie-card__wrap">
            <MovieDescription
              :title="film.name"
              :genre="film.genre"
              :year="film.released"
              :film-id="film.id"
              :is-favorite="film.isFavorite"
              @favorite-change="film = $event"
            />
          </div>
        </div>

        <div class="movie-card__wrap movie-card__translate-top">
          <div class="movie-card__info">
            <MoviePoster :src="film.posterImage" :alt="film.name" class="movie-card__poster--big" />

            <div class="movie-card__desc">
              <MovieTabs />
              <Transition name="tabs" mode="out-in">
                <MovieOverview
                  v-if="activeTab === 'overview'"
                  :description="film.description"
                  :rating="film.rating"
                  :director="film.director"
                  :starring="film.starring"
                  :scores-count="film.scoresCount"
                />
                <MovieDetails
                  v-else-if="activeTab === 'details'"
                  :director="film.director"
                  :starring="film.starring"
                  :run-time="film.runTime"
                  :genre="film.genre"
                  :released="film.released"
                />
                <MovieReviews v-else-if="activeTab === 'reviews'" :film-id="film.id" />
              </Transition>
            </div>
          </div>
        </div>
      </section>

      <div class="page-content">
        <section class="catalog catalog--like-this">
          <h2 class="catalog__title">More like this</h2>
          <CatalogMoviesList v-if="similarFilmsStatus === 'success'" :films="similarFilms" />
          <ErrorBlock v-else-if="similarFilmsStatus === 'error'">
            Failed to load similar films.
          </ErrorBlock>
          <LoaderBlock v-else-if="similarFilmsStatus === 'pending'" />
        </section>

        <PageFooter />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Film } from '~/types'

definePageMeta({ middleware: 'movie-tabs' })

const route = useRoute()

const [{ data: film, status, error }, { data: similarFilms, status: similarFilmsStatus }] =
  await Promise.all([
    useApiFetch<Film>(() => `/films/${route.params.id}`),
    useApiFetch<Film[]>(() => `/films/${route.params.id}/similar`, { default: () => [] }),
  ])

if (error.value) {
  throw createError({ statusCode: error.value.statusCode, statusMessage: 'Film not found' })
}

watch(error, (newError) => {
  if (newError) {
    showError({ statusCode: newError.statusCode, statusMessage: newError.statusText })
  }
})

const { activeTab } = useMovieTabs()
</script>
