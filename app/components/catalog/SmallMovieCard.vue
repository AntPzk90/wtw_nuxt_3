<template>
  <article class="small-movie-card catalog__movies-card">
    <div class="small-movie-card__image">
      <img :src="previewImage" :alt="name" width="280" height="175" />
    </div>
    <h3 class="small-movie-card__title">
      <NuxtLink
        class="small-movie-card__link"
        :to="{ path: filmUrl, query: { tab: 'overview' } }"
        >{{ name }}</NuxtLink
      >
    </h3>
  </article>
</template>

<script setup lang="ts">
import type { Film } from '~/types'

const { id } = defineProps<Pick<Film, 'id' | 'name' | 'previewImage'>>()

const filmUrl = computed(() => `/films/${id}`)
</script>
