<template>
  <SvgSprite />
  <NuxtRouteAnnouncer />
  <Toaster theme="dark" :duration="2500" position="top-left" :toast-options="toastOptions" />
  <NuxtPage />
</template>

<script setup lang="ts">
import type { ToasterProps } from 'vue-sonner'

const toastOptions: ToasterProps['toastOptions'] = {
  class: 'toast',
  classes: { success: 'toast--success', error: 'toast--error' },
}
</script>
