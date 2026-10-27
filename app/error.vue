<!-- Nuxt renders this instead of app.vue for any error: unknown routes and createError() from pages. -->
<template>
  <div class="user-page">
    <PageHeader class="user-page__head">
      <h1 class="page-title user-page__title">{{ title }}</h1>
    </PageHeader>

    <div class="user-page__content error-page">
      <p class="error-page__text">{{ text }}</p>
      <button class="btn" type="button" @click="goHome">Back to main page</button>
    </div>

    <PageFooter />
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{ error: NuxtError }>()

const isNotFound = computed(() => error.statusCode === 404)

const title = computed(() => (isNotFound.value ? '404. Page not found' : 'Something went wrong'))
const text = computed(() =>
  isNotFound.value
    ? 'The page you are looking for does not exist or has been moved.'
    : 'Please try again later.',
)

useHead({ title })

// The error state lives outside the router, so a plain link would keep showing this page.
function goHome() {
  clearError({ redirect: '/' })
}
</script>

<style>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding-top: 60px;
  text-align: center;
}

.error-page__text {
  margin: 0;
  font-size: 20px;
}
</style>
