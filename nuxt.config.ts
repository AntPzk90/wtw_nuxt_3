// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // disableAuthorization: skip the "unlock via terminal link" step for local dev.
  devtools: { enabled: true, disableAuthorization: true },
  modules: ['@nuxt/eslint', '@pinia/nuxt', 'vue-sonner/nuxt'],
  css: ['~/assets/css/main.css', '~/assets/css/toast.css'],
  // Folders in components/ only group files: components/movie/MovieTabs.vue is <MovieTabs>.
  components: [{ path: '~/components', pathPrefix: false }],
  app: {
    head: {
      title: 'WTW',
      htmlAttrs: { lang: 'en' },
      meta: [{ name: 'robots', content: 'noindex, nofollow' }],
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001',
    },
  },
})
