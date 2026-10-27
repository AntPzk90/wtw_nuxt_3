<template>
  <div class="review">
    <blockquote class="review__quote">
      <p class="review__text">
        {{ comment }}
      </p>

      <footer class="review__details">
        <cite class="review__author">{{ user.name }}</cite>
        <time class="review__date" :datetime="reviewDateAttr">{{ reviewDate }}</time>
      </footer>
    </blockquote>

    <div class="review__rating">{{ rating }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Review } from '~/types'

const { date } = defineProps<Omit<Review, 'id'>>()

const reviewDate = computed(() => formatReviewDate(date))

const reviewDateAttr = computed(() => formatDateAttr(date))
</script>
