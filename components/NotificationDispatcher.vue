<script lang="ts" setup>
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { $fetch } from 'ofetch'
import type { ImagePreview } from '~/utils/htmlParser'

const props = defineProps<{ title: string, paragraphs: string[], images: ImagePreview[] }>()

const showNotificationDispatcher = ref(false)
const loading = ref(false)
const sent = ref(false)

onAuthStateChanged(firebaseAuth, async (user) => {
  if (user) {
    const userRef = doc(firestoreDb, 'users', user.uid)
    const userInDB = await getDoc(userRef)
    showNotificationDispatcher.value = userInDB.data()?.admin
  }
})

async function send() {
  try {
    loading.value = true
    await $fetch('/api/messaging/blogpost/notification', {
      method: 'POST',
      body: {
        title: props.title,
        body: props.paragraphs[0],
        imageUrl: props.images[0].thumbnail,
      },
    })
    sent.value = true
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <v-tooltip
    v-if="showNotificationDispatcher"
    location="top"
    text="Als Push verschicken"
  >
    <template #activator="{ props: tooltipProps }">
      <v-btn
        size="small"
        icon="mdi-bell"
        variant="text"
        v-bind="tooltipProps"
        :loading="loading"
        :disabled="sent"
        @click="send"
      />
    </template>
  </v-tooltip>
</template>
