<script lang="ts" setup>
import { setUserId } from 'firebase/analytics'
import { onAuthStateChanged, setPersistence, signInAnonymously, browserLocalPersistence } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { UAParser } from 'ua-parser-js'
import { firebaseAuth } from '~/utils/firebase'

const { data } = useFetch('/api/posts')
const posts = computed(() => data.value?.items)
const coordinates = computed(() => posts.value?.map(({ location }) => location).filter(location => !!location) || [])
const firstPosts = computed(() => posts.value?.slice(0, 1) ?? [])
const otherPosts = computed(() => posts.value?.slice(1) ?? [])

onAuthStateChanged(firebaseAuth, async (user) => {
  if (user) {
    console.log('user', user)
    setUserId(firebaseAnalytics, user.uid)

    const parser = new UAParser()
    const userRef = doc(firestoreDb, 'users', user.uid)
    const userInDB = await getDoc(userRef)

    const updates = {
      displayName: user.displayName,
      browser: parser.getBrowser().name,
      os: parser.getOS().name,
    }
    if (userInDB.exists()) {
      await updateDoc(userRef, updates)
    }
    else {
      await setDoc(userRef, updates)
    }
  }
  else {
    try {
      await setPersistence(firebaseAuth, browserLocalPersistence)
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
    <MapBox :coordinates="coordinates" />
    <BlogPost
      v-for="post in firstPosts"
      :key="post.id"
      :value="post"
    />
    <IOSPrompt />
    <PushNotificationPrompt />
    <BlogPost
      v-for="post in otherPosts"
      :key="post.id"
      :value="post"
    />
  </ClientOnly>
</template>
