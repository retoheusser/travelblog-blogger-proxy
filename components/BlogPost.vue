<script lang="ts" setup>
import type { BlogPostItem } from '../types/blogger.types'

const props = defineProps<{ value: BlogPostItem }>()
const postUrlHttps = computed(() => {
  const url = new URL(props.value.url)
  url.protocol = 'https:'
  return url.toString()
})
defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <v-sheet
    color="amber-lighten-5"
    class="my-8 pa-4"
  >
    <div class="text-h5 font-weight-bold mb-4">
      {{ props.value.title }}
    </div>
    <div
      @click="e => $emit('click', e)"
      v-html="props.value.content"
    />
    <v-lazy>
      <!-- invisibly loading the real blogpost page counts as a view on Blogger -->
      <iframe
        class="d-none"
        :src="postUrlHttps"
      />
    </v-lazy>
  </v-sheet>
</template>
