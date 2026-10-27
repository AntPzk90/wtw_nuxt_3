<template>
  <div ref="player" class="player">
    <video
      ref="video"
      :src="videoLink"
      class="player__video"
      :poster="poster"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @loadedmetadata="onLoadedMetadata"
      @timeupdate="onTimeUpdate"
    ></video>

    <NuxtLink :to="filmUrl" class="player__exit">Exit</NuxtLink>

    <div class="player__controls">
      <div class="player__controls-row">
        <div class="player__time">
          <progress class="player__progress" :value="progress" max="100"></progress>
          <div class="player__toggler" :style="{ left: `${progress}%` }">Toggler</div>
        </div>
        <div class="player__time-value">{{ timeLeft }}</div>
      </div>

      <div class="player__controls-row">
        <button type="button" class="player__play" @click="onPlayBtnClick">
          <Transition name="tabs" mode="out-in">
            <svg v-if="!isPlaying" viewBox="0 0 19 19" width="19" height="19">
              <use href="#play-s" />
            </svg>
            <svg v-else viewBox="0 0 14 21" width="14" height="21">
              <use href="#pause" />
            </svg>
          </Transition>
          <span>{{ isPlaying ? 'Pause' : 'Play' }}</span>
        </button>
        <div class="player__name">{{ name }}</div>

        <button type="button" class="player__full-screen" @click="onFullScreenBtnClick">
          <svg viewBox="0 0 27 27" width="27" height="27">
            <use href="#full-screen" />
          </svg>
          <span>Full screen</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { filmId } = defineProps<{
  videoLink: string
  name: string
  poster: string
  filmId: number
}>()

const video = useTemplateRef<HTMLVideoElement>('video')
const player = useTemplateRef<HTMLDivElement>('player')

const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

const onPlayBtnClick = () => {
  if (isPlaying.value) {
    video.value?.pause()
  } else {
    video.value?.play().catch((error) => {
      console.error(error)
    })
  }
}

const onLoadedMetadata = () => {
  duration.value = video.value?.duration ?? 0
}

const onTimeUpdate = () => {
  currentTime.value = video.value?.currentTime ?? 0
}

const progress = computed(() => (duration.value ? (currentTime.value / duration.value) * 100 : 0))

const timeLeft = computed(() => formatPlayerRunTime(duration.value - currentTime.value))

const filmUrl = computed(() => `/films/${filmId}`)

const onFullScreenBtnClick = () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    player.value?.requestFullscreen()
  }
}

onMounted(() => {
  if (video.value && video.value.readyState >= 1) onLoadedMetadata()
})
</script>
