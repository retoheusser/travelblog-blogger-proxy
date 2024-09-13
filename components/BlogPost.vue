<script lang="ts" setup>
import type { BlogPostItem } from '../types/blogger.types'

const { value } = defineProps<{ value: BlogPostItem }>()
</script>

<template>
  <div>
    <div>{{ value.title }}</div>
    <div
      @click="e => $emit('click', e)"
      v-html="value.content"
    />
  </div>
</template>
