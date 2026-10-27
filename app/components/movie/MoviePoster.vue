<!-- Size modifiers (movie-card__poster--big / --small) are passed as class from the page. -->
<template>
  <div class="movie-card__poster">
    <img :src :alt width="218" height="327" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ src: string; alt: string }>()
</script>
