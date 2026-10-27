<template>
  <LoaderBlock v-if="status === 'pending'" />
  <VideoPlayer
    v-else-if="film"
    :video-link="film.videoLink"
    :name="film.name"
    :poster="film.previewImage"
    :film-id="film.id"
  />
  <ErrorBlock v-else-if="status === 'error'"> Failed to load film. </ErrorBlock>
</template>

<script setup lang="ts">
import type { Film } from '~/types'

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
