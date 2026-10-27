<template>
  <section class="movie-card">
    <ErrorBlock v-if="status === 'error'">Failed to load the promo film.</ErrorBlock>
    <template v-else-if="film">
      <MovieBackground :src="film.backgroundImage" :alt="film.name" />

      <h1 class="visually-hidden">WTW</h1>

      <PageHeader class="movie-card__head" />

      <div class="movie-card__wrap">
        <div class="movie-card__info">
          <MoviePoster :src="film.posterImage" :alt="film.name" />
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
    </template>
  </section>
</template>

<script setup lang="ts">
import type { Film } from '~/types'

const { data: film, status } = useApiFetch<Film>('/promo')
</script>
