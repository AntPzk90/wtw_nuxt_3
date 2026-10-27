<template>
  <ul class="catalog__genres-list">
    <li
      class="catalog__genres-item"
      :class="{ 'catalog__genres-item--active': activeGenre === null }"
    >
      <NuxtLink :to="{ query: {} }" class="catalog__genres-link">All genres</NuxtLink>
    </li>
    <li
      v-for="genre in genres"
      :key="genre"
      class="catalog__genres-item"
      :class="{ 'catalog__genres-item--active': activeGenre === genre }"
    >
      <NuxtLink :to="{ query: { genre } }" class="catalog__genres-link">{{ genre }}</NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ genres: string[]; activeGenre: string | null }>()
</script>
