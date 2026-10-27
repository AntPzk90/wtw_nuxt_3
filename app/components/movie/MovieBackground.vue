<template>
  <div class="movie-card__bg">
    <img :src :alt />
  </div>
</template>

<script setup lang="ts">
defineProps<{ src: string; alt: string }>()
</script>
