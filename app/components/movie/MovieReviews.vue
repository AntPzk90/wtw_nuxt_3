<template>
  <ErrorBlock v-if="status === 'error'">Failed to load reviews.</ErrorBlock>
  <div v-else-if="reviews.length > 0" class="movie-card__reviews movie-card__row">
    <div class="movie-card__reviews-col">
      <MovieReview
        v-for="review in reviewColumns.leftColumn"
        :key="review.id"
        :comment="review.comment"
        :rating="review.rating"
        :date="review.date"
        :user="review.user"
      />
    </div>
    <div class="movie-card__reviews-col">
      <MovieReview
        v-for="review in reviewColumns.rightColumn"
        :key="review.id"
        :comment="review.comment"
        :rating="review.rating"
        :date="review.date"
        :user="review.user"
      />
    </div>
  </div>
  <p v-else>Ooops, no reviews...</p>
</template>

<script setup lang="ts">
import type { Review } from '~/types'

const { filmId } = defineProps<{ filmId: number }>()

const { data: reviews, status } = useApiFetch<Review[]>(() => `/comments/${filmId}`, {
  default: () => [],
})

const reviewColumns = computed(() => {
  const middle = Math.ceil(reviews.value.length / 2)

  return {
    leftColumn: reviews.value.slice(0, middle),
    rightColumn: reviews.value.slice(middle),
  }
})
</script>
