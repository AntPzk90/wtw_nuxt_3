<template>
  <div class="movie-card__text movie-card__row">
    <div class="movie-card__text-col">
      <p class="movie-card__details-item">
        <strong class="movie-card__details-name">Director</strong>
        <span class="movie-card__details-value">{{ director }}</span>
      </p>
      <p class="movie-card__details-item">
        <strong class="movie-card__details-name">Starring</strong>
        <span class="movie-card__details-value">
          <template v-for="actor in starring" :key="actor"> {{ actor }} <br /> </template>
        </span>
      </p>
    </div>

    <div class="movie-card__text-col">
      <p class="movie-card__details-item">
        <strong class="movie-card__details-name">Run Time</strong>
        <span class="movie-card__details-value">{{ formatTime }}</span>
      </p>
      <p class="movie-card__details-item">
        <strong class="movie-card__details-name">Genre</strong>
        <span class="movie-card__details-value">{{ genre }}</span>
      </p>
      <p class="movie-card__details-item">
        <strong class="movie-card__details-name">Released</strong>
        <span class="movie-card__details-value">{{ released }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { runTime } = defineProps<{
  director: string
  starring: string[]
  runTime: number
  genre: string
  released: number
}>()

const formatTime = computed(() => {
  return formatRunTime(runTime)
})
</script>
