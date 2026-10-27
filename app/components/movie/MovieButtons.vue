<template>
  <div class="movie-card__buttons">
    <NuxtLink :to="playerUrl" class="btn btn--play movie-card__button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use href="#play-s" />
      </svg>
      <span>Play</span>
    </NuxtLink>
    <button
      class="btn btn--list movie-card__button"
      type="button"
      :disabled="isFavoriteUpdating"
      @click="onFavoriteBtnClick"
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <Transition name="tabs" mode="out-in">
          <use v-if="isFavorite" href="#in-list" />
          <use v-else href="#add" />
        </Transition>
      </svg>
      <span>My list</span>
    </button>
    <NuxtLink :to="reviewUrl" class="btn movie-card__button">Add review</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { FetchError } from 'ofetch'
import type { Film } from '~/types'

const { filmId, isFavorite } = defineProps<{ filmId: number; isFavorite: boolean }>()
const authStore = useAuthStore()
const { $toast } = useNuxtApp()
const redirectToLogin = useLoginRedirect()

const emit = defineEmits<{
  favoriteChange: [film: Film]
}>()

const isFavoriteUpdating = ref(false)

const reviewUrl = computed(() => `/films/${filmId}/review`)
const playerUrl = computed(() => `/player/${filmId}`)

const onFavoriteBtnClick = async () => {
  if (!authStore.isAuthorized) {
    await redirectToLogin()
    return
  }

  isFavoriteUpdating.value = true

  try {
    const status = isFavorite ? 0 : 1
    const film = await apiFetch<Film>(`/favorite/${filmId}/${status}`, 'POST')
    emit('favoriteChange', film)
    $toast.success(film.isFavorite ? 'Added to My list' : 'Removed from My list')
  } catch (error) {
    if ((error as FetchError).statusCode === 401) {
      await redirectToLogin()
      return
    }
    $toast.error('Could not update My list')
    console.error(error)
  } finally {
    isFavoriteUpdating.value = false
  }
}
</script>
