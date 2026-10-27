<template>
  <div class="sign-in user-page__content">
    <form class="sign-in__form" novalidate @submit.prevent="onSubmit">
      <div v-if="showEmailError || showPasswordError" class="sign-in__message">
        <p v-if="showEmailError">Please enter a valid email address</p>
        <p v-if="showPasswordError">Please enter a valid password</p>
      </div>
      <div v-if="isServerError" class="sign-in__message">
        <p>Something went wrong</p>
      </div>
      <div class="sign-in__fields">
        <div class="sign-in__field" :class="{ 'sign-in__field--error': showEmailError }">
          <input
            id="user-email"
            v-model="authModel.email"
            class="sign-in__input"
            type="email"
            placeholder="Email address"
            name="user-email"
            autocomplete="email"
          />
          <label class="sign-in__label visually-hidden" for="user-email">Email address</label>
        </div>
        <div class="sign-in__field" :class="{ 'sign-in__field--error': showPasswordError }">
          <input
            id="user-password"
            v-model="authModel.password"
            class="sign-in__input"
            type="password"
            placeholder="Password"
            name="user-password"
            autocomplete="current-password"
          />
          <label class="sign-in__label visually-hidden" for="user-password">Password</label>
        </div>
      </div>
      <div class="sign-in__submit">
        <button class="sign-in__btn" type="submit" :disabled="isSubmitting">Sign in</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const { $toast } = useNuxtApp()

const EMAIL_REGEXP = /^\S+@\S+\.\S+$/
const PASSWORD_REGEXP = /^(?=.*[a-zA-Z])(?=.*\d).+$/

const authModel = ref({ email: '', password: '' })
const isSubmitted = ref(false)
const isServerError = ref(false)
const isSubmitting = ref(false)

const isEmailValid = computed(() => EMAIL_REGEXP.test(authModel.value.email))
const isPasswordValid = computed(() => PASSWORD_REGEXP.test(authModel.value.password))

const showEmailError = computed(() => isSubmitted.value && !isEmailValid.value)
const showPasswordError = computed(() => isSubmitted.value && !isPasswordValid.value)

const route = useRoute()

const onSubmit = async () => {
  if (isSubmitting.value) return

  isSubmitted.value = true
  if (!isEmailValid.value || !isPasswordValid.value) return

  isSubmitting.value = true
  isServerError.value = false

  try {
    await authStore.login({ ...authModel.value })
    $toast.success('Signed in')
  } catch {
    isServerError.value = true
    $toast.error('Could not sign in')
    return
  } finally {
    isSubmitting.value = false
  }

  await navigateTo(getSafeRedirect(route.query.redirect), { replace: true })
}
</script>
