<template>
  <div class="catalog__more">
    <button class="catalog__button" type="button" @click="emit('showMore')">Show more</button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  showMore: []
}>()
</script>
