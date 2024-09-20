<script lang="ts" setup>
import type { BlogPostItem } from '../types/blogger.types'

const props = defineProps<{ value: BlogPostItem }>()
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
        :src="props.value.url"
      />
    </v-lazy>
  </v-sheet>
</template>
