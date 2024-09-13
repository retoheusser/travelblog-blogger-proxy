<script lang="ts" setup>
import type { BlogPostItem } from '../types/blogger.types'

const { value } = defineProps<{ value: BlogPostItem }>()
</script>

<template>
  <v-sheet>
    <div>{{ value.title }}</div>
    <div
      @click="e => $emit('click', e)"
      v-html="value.content"
    />
    <v-divider />
  </v-sheet>
</template>
