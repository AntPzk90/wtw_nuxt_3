<template>
  <div class="user-page">
    <PageHeader class="user-page__head">
      <h1 class="page-title user-page__title">My list</h1>
    </PageHeader>

    <section class="catalog">
      <h2 class="catalog__title visually-hidden">Catalog</h2>
      <LoaderBlock v-if="status === 'pending' && !films.length"></LoaderBlock>
      <ErrorBlock v-else-if="status === 'error'"> Failed to load My list. </ErrorBlock>
      <CatalogMoviesList v-else :films="films" />
    </section>

    <PageFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
const { data: films, status } = useApiFetch<Film[]>('/favorite', { default: () => [] })
</script>
