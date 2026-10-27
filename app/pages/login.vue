<template>
  <div class="user-page">
    <PageHeader class="user-page__head">
      <h1 class="page-title user-page__title">Sign in</h1>
    </PageHeader>

    <SignInForm />

    <PageFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'guest' })
</script>
