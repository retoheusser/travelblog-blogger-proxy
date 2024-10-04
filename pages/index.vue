<script lang="ts" setup>
const { data } = useFetch('/api/posts')
const posts = computed(() => data.value?.items)
</script>

<template>
  <ClientOnly>
    <BlogPost
      v-for="post in posts"
      :key="post.id"
      :value="post"
    />
  </ClientOnly>
</template>
