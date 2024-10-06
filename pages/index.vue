<script lang="ts" setup>
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'
import { firebaseAuth } from '~/utils/firebase'

const { data } = useFetch('/api/posts')
const posts = computed(() => data.value?.items)

onAuthStateChanged(firebaseAuth, async (user) => {
  if (user) {
    console.log('user', user)
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
    <PushNotificationPrompt />
    <BlogPost
      v-for="post in posts"
      :key="post.id"
      :value="post"
    />
  </ClientOnly>
</template>
