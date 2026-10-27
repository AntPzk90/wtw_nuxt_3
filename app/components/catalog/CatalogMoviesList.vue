<template>
  <div class="catalog__movies-list">
    <SmallMovieCard
      v-for="film in films"
      :id="film.id"
      :key="film.id"
      :name="film.name"
      :preview-image="film.previewImage"
    />
    <p v-if="films.length === 0">Films list is empty</p>
  </div>
</template>

<script setup lang="ts">
import type { Film } from '~/types'

defineProps<{ films: Film[] }>()
</script>
