<template>
  <Transition name="tabs" mode="out-in">
    <div v-if="authStore.isAuthorized" class="user-block">
      <div class="user-block__avatar">
        <img :src="authStore.user?.avatarUrl" :alt="authStore.user?.name" width="63" height="63" />
      </div>
      <a href="#" class="user-block__link" @click.prevent="onSignOutBtnClick">Sign out</a>
    </div>
    <div v-else class="user-block">
      <NuxtLink to="/login" class="user-block__link">Sign in</NuxtLink>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const { $toast } = useNuxtApp()

const onSignOutBtnClick = async () => {
  try {
    await authStore.logout()
  } catch {
    // the local session is already cleared in logout's finally
  }

  $toast.success('Signed out')
  await navigateTo('/')
}
</script>
