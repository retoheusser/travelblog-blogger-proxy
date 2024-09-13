<script lang="ts" setup>
const { data } = useFetch('/api/posts')
const posts = computed(() => data.value?.items)
</script>

<template>
  <div>
    <div
      v-for="post in posts"
      :key="post.id"
    >
      <div>{{ post.title }}</div>
      <div v-html="post.content" />
    </div>
  </div>
</template>
