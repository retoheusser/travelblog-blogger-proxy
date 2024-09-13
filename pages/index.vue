<script lang="ts" setup>
const { data } = useFetch('/api/posts')
const posts = computed(() => data.value?.items)
</script>

<template>
  <LightBox>
    <template #activator="{ on }">
      <BlogPost
        v-for="post in posts"
        :key="post.id"
        :value="post"
        v-on="on"
      />
    </template>
  </LightBox>
</template>
