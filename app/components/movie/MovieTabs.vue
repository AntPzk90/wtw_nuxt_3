<template>
  <nav class="movie-nav movie-card__nav">
    <ul class="movie-nav__list">
      <li class="movie-nav__item" :class="{ 'movie-nav__item--active': activeTab === 'overview' }">
        <NuxtLink
          :to="{
            query: {
              tab: 'overview',
            },
          }"
          class="movie-nav__link"
          >Overview</NuxtLink
        >
      </li>
      <li class="movie-nav__item" :class="{ 'movie-nav__item--active': activeTab === 'details' }">
        <NuxtLink
          :to="{
            query: {
              tab: 'details',
            },
          }"
          class="movie-nav__link"
          >Details</NuxtLink
        >
      </li>
      <li class="movie-nav__item" :class="{ 'movie-nav__item--active': activeTab === 'reviews' }">
        <NuxtLink
          :to="{
            query: {
              tab: 'reviews',
            },
          }"
          class="movie-nav__link"
          >Reviews</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const { activeTab } = useMovieTabs()
</script>
