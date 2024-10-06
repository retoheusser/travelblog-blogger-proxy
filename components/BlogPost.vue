<script lang="ts" setup>
import { logEvent } from 'firebase/analytics'
import type { BlogPostItem } from '../types/blogger.types'

const props = defineProps<{ value: BlogPostItem }>()
const intersectStore = useIntersectStore()
const { width: windowWidth } = useWindowSize()

const textExpanded = ref(false)
const postUrlHttps = computed(() => {
  const url = new URL(props.value.url)
  url.protocol = 'https:'
  return url.toString()
})
const images = computed(() => parseImages(props.value.content))
const paragraphs = computed(() => parseParagraphs(props.value.content))
const visibleParagrahps = computed(() => textExpanded.value ? paragraphs.value : paragraphs.value.slice(0, 1))
const published = computed(() => new Date(props.value.published).toLocaleDateString())

function expand() {
  textExpanded.value = true
  logEvent(firebaseAnalytics, 'expand_text', { post_id: props.value.id })
}

function onIntersect(isIntersecting: boolean) {
  if (isIntersecting) {
    logEvent(firebaseAnalytics, 'view_post', { post_id: props.value.id })
    intersectStore.currentlyVisibleTitle = props.value.title
  }
}
</script>

<template>
  <v-sheet class="my-4 pa-0">
    <div class="px-4 mb-4 d-flex align-center justify-space-between">
      <div
        class="font-weight-bold d-flex align-start"
        style="position:relative"
      >
        <v-icon color="primary">
          mdi-map-marker
        </v-icon>
        <div class="marker-extension" />
        <span>{{ props.value.title }}</span>
        <NotificationDispatcher
          :title="props.value.title"
          :paragraphs="paragraphs"
          :images="images"
        />
      </div>
      <div class="text-body-2 text-medium-emphasis">
        {{ published }}
      </div>
    </div>
    <div class="bg-primary">
      <v-carousel
        show-arrows="hover"
        :height="windowWidth < 500 ? windowWidth : 500"
        hide-delimiter-background
      >
        <v-carousel-item
          v-for="image in images"
          :key="image"
          cover
          :src="image"
        />
      </v-carousel>
    </div>
    <div v-intersect="onIntersect" />
    <div class="ml-7">
      <div class="border-left pa-4 text-body-2">
        <p
          v-for="(p, i) in visibleParagrahps"
          :key="i"
          class="mb-4"
        >
          {{ p }}
        </p>
        <p
          v-if="!textExpanded && paragraphs > visibleParagrahps"
          class="font-italic cursor-pointer"
          @click="expand"
        >
          weiterlesen
        </p>
      </div>
    </div>
    <v-lazy v-if="textExpanded || paragraphs <= visibleParagrahps">
      <!-- invisibly loading the real blogpost page counts as a view on Blogger -->
      <iframe
        class="d-none"
        :src="postUrlHttps"
      />
    </v-lazy>
  </v-sheet>
</template>

<style lang="css" scoped>
.marker-extension {
  position: absolute;
  height: 200px;
  top: 21px;
  width: 1px;
  left: 12px;
  background-color: #37503D;
}

.border-left {
  border-left: solid 1px #37503D;
}
</style>
