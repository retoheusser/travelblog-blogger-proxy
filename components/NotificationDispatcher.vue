<script lang="ts" setup>
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { $fetch } from 'ofetch'
import type { ImagePreview } from '~/utils/htmlParser'

const props = defineProps<{ title: string, paragraphs: string[], images: ImagePreview[] }>()

const showNotificationDispatcher = ref(false)
const loading = ref(false)
const sent = ref(false)
const snackbar = ref(false)

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
  <div>
    <v-menu v-if="showNotificationDispatcher">
      <template #activator="{ props: menuProps }">
        <v-btn
          size="small"
          icon="mdi-dots-vertical"
          variant="text"
          v-bind="menuProps"
          :loading="loading"
          :disabled="sent"
        />
      </template>
      <v-list density="compact">
        <v-list-item @click="snackbar = true">
          <v-list-item-title>Push Notification senden</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-snackbar
      v-model="snackbar"
      color="primary"
      timer
    >
      Bitte bestätige das Senden

      <template #actions>
        <v-btn
          color="white"
          @click="send(); snackbar=false"
        >
          Bestätigen
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
