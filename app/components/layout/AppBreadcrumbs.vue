<template>
  <nav class="breadcrumbs">
    <ul class="breadcrumbs__list">
      <li class="breadcrumbs__item">
        <NuxtLink :to="computedUrlToFilm" class="breadcrumbs__link">{{ name }}</NuxtLink>
      </li>
      <li class="breadcrumbs__item">
        <a class="breadcrumbs__link">Add review</a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const { filmId } = defineProps<{ name: string; filmId: number }>()

const computedUrlToFilm = computed(() => `/films/${filmId}`)
</script>
