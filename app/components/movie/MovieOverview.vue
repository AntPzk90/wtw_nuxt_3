<template>
  <div>
    <div class="movie-rating">
      <div class="movie-rating__score">{{ formattedRating }}</div>
      <p class="movie-rating__meta">
        <span class="movie-rating__level">{{ ratingAssessment }}</span>
        <span class="movie-rating__count">{{ scoresCount }} ratings</span>
      </p>
    </div>

    <div class="movie-card__text">
      <p>
        {{ description }}
      </p>

      <p class="movie-card__director">
        <strong>Director: {{ director }}</strong>
      </p>

      <p class="movie-card__starring">
        <strong
          ><template v-for="(actor, actorIndex) in slicedStarring" :key="actor"
            >{{ actor }}<span v-show="actorIndex !== slicedStarring.length - 1">, </span>
          </template>
          <span v-if="starring.length > 5">and other</span></strong
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { rating, starring } = defineProps<{
  description: string
  rating: number
  director: string
  starring: string[]
  scoresCount: number
}>()

const slicedStarring = computed(() => starring.slice(0, 5))

const formattedRating = computed(() => rating.toFixed(1).replace('.', ','))

const ratingAssessment = computed(() => {
  if (rating === 10) return 'Awesome'
  if (rating >= 8) return 'Very good'
  if (rating >= 5) return 'Good'
  if (rating >= 3) return 'Normal'
  return 'Bad'
})
</script>
