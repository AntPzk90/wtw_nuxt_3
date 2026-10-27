<template>
  <div class="logo">
    <NuxtLink to="/" class="logo__link" :class="{ 'logo__link--light': isLight }">
      <span class="logo__letter logo__letter--1">W</span>
      <span class="logo__letter logo__letter--2">T</span>
      <span class="logo__letter logo__letter--3">W</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{ isLight?: boolean }>()
</script>
