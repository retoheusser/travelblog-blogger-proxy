<script lang="ts" setup>
import type { BlogPostItem } from '../types/blogger.types'

const { value } = defineProps<{ value: BlogPostItem }>()
</script>

<template>
  <v-sheet
    color="amber-lighten-5"
    class="my-8 pa-4"
  >
    <div class="text-h5 font-weight-bold mb-4">
      {{ value.title }}
    </div>
    <div
      @click="e => $emit('click', e)"
      v-html="value.content"
    />
    <v-lazy>
      <!-- invisibly loading the real blogpost page counts as a view on Blogger -->
      <iframe
        class="d-none"
        :src="value.url"
      />
    </v-lazy>
  </v-sheet>
</template>
