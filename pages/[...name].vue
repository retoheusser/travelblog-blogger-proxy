<script lang="ts" setup>
import { setUserId } from 'firebase/analytics'
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { firebaseAuth } from '~/utils/firebase'

const { data } = useFetch('/api/posts')
const posts = computed(() => data.value?.items)
const firstPosts = computed(() => posts.value?.slice(0, 1) ?? [])
const otherPosts = computed(() => posts.value?.slice(1) ?? [])

onAuthStateChanged(firebaseAuth, async (user) => {
  if (user) {
    console.log('user', user)
    setUserId(firebaseAnalytics, user.uid)
  }
  else {
    try {
      await signInAnonymously(firebaseAuth)
    }
    catch (error) {
      console.error(error)
    }
  }
})
</script>

<template>
  <ClientOnly>
    <InstallPrompt />
    <BlogPost
      v-for="post in firstPosts"
      :key="post.id"
      :value="post"
    />
    <PushNotificationPrompt />
    <BlogPost
      v-for="post in otherPosts"
      :key="post.id"
      :value="post"
    />
  </ClientOnly>
</template>
