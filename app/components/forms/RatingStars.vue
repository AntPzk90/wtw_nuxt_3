<template>
  <div class="rating">
    <div class="rating__stars">
      <template v-for="n in 5" :key="n">
        <input
          :id="`star-${n}`"
          v-model="rating"
          class="rating__input"
          type="radio"
          name="rating"
          :value="n"
        />
        <label class="rating__label" :for="`star-${n}`">Rating {{ n }}</label>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const rating = defineModel<number>()
</script>
