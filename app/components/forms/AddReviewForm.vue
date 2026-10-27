<template>
  <div class="add-review">
    <form class="add-review__form" novalidate @submit.prevent="onSubmit">
      <RatingStars v-model="rating" />

      <div class="add-review__text">
        <textarea
          id="review-text"
          v-model="comment"
          class="add-review__textarea"
          name="review-text"
          placeholder="Review text"
          :maxlength="REVIEW_MAX_LENGTH"
        ></textarea>
        <div class="add-review__submit">
          <button class="add-review__btn" type="submit" :disabled="!isFormValid || isSubmitting">
            Send
          </button>
        </div>
      </div>
    </form>
    <div v-if="isServerError" class="add-review__message">
      <p>Something went wrong</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { REVIEW_MIN_LENGTH, REVIEW_MAX_LENGTH, MAX_RATING } from '~/constants/constants'
import type { Review } from '~/types'
import type { FetchError } from 'ofetch'

const { filmId } = defineProps<{ filmId: number }>()
const { $toast } = useNuxtApp()
const redirectToLogin = useLoginRedirect()

const rating = ref(1)
const comment = ref('')
const isServerError = ref(false)
const isSubmitting = ref(false)

const commentLength = computed(() => comment.value.trim().length)

const isCommentValid = computed(
  () => commentLength.value >= REVIEW_MIN_LENGTH && commentLength.value <= REVIEW_MAX_LENGTH,
)
const isRatingValid = computed(() => rating.value >= 1 && rating.value <= MAX_RATING)

const isFormValid = computed(() => isCommentValid.value && isRatingValid.value)

const onSubmit = async () => {
  if (isSubmitting.value || !isFormValid.value) return

  isSubmitting.value = true
  isServerError.value = false

  try {
    await apiFetch<Review[]>(`/comments/${filmId}`, 'POST', {
      comment: comment.value.trim(),
      rating: rating.value,
    })
    $toast.success('Review posted')
  } catch (error) {
    if ((error as FetchError).statusCode === 401) {
      await redirectToLogin()
      return
    }
    isServerError.value = true
    $toast.error('Could not post review')
    return
  } finally {
    isSubmitting.value = false
  }

  await navigateTo(`/films/${filmId}?tab=reviews`)
}
</script>
