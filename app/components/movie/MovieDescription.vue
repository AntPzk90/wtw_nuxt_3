<template>
  <div class="movie-card__desc">
    <h2 class="movie-card__title">{{ title }}</h2>
    <p class="movie-card__meta">
      <span class="movie-card__genre">{{ genre }}</span>
      <span class="movie-card__year">{{ year }}</span>
    </p>

    <MovieButtons
      :film-id="filmId"
      :is-favorite="isFavorite"
      @favorite-change="emit('favoriteChange', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Film } from '~/types'

defineProps<{
  title: string
  genre: string
  year: string | number
  filmId: number
  isFavorite: boolean
}>()

const emit = defineEmits<{
  favoriteChange: [film: Film]
}>()
</script>
