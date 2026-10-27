<template>
  <section class="movie-card movie-card--full">
    <LoaderBlock v-if="status === 'pending'"></LoaderBlock>
    <div v-else-if="film" class="movie-card__header">
      <MovieBackground :src="film.backgroundImage" :alt="film.name" />

      <h1 class="visually-hidden">WTW</h1>

      <PageHeader>
        <AppBreadcrumbs :name="film.name" :film-id="film.id" />
      </PageHeader>

      <MoviePoster :src="film.posterImage" :alt="film.name" class="movie-card__poster--small" />
    </div>

    <AddReviewForm v-if="film" :film-id="film.id" />
  </section>
</template>

<script setup lang="ts">
import type { Film } from '~/types'

definePageMeta({ middleware: 'auth' })

const route = useRoute()

const { data: film, status, error } = await useApiFetch<Film>(() => `/films/${route.params.id}`)

if (error.value) {
  throw createError({ statusCode: error.value.statusCode, statusMessage: 'Film not found' })
}

watch(error, (newError) => {
  if (newError) {
    showError({ statusCode: newError.statusCode, statusMessage: newError.statusText })
  }
})
</script>
