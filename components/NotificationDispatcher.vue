<script lang="ts" setup>
import { $fetch } from 'ofetch'

const props = defineProps<{ title: string, paragraphs: string[], images: string[] }>()
const route = useRoute()

const showNotificationDispatcher = computed(() => route.query.action === 'notification')

const loading = ref(false)
const sent = ref(false)

async function send() {
  try {
    loading.value = true
    await $fetch('/api/messaging/blogpost/notification', {
      method: 'POST',
      body: {
        title: props.title,
        body: props.paragraphs[0],
        imageUrl: props.images[0],
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
  <v-btn
    v-if="showNotificationDispatcher"
    color="primary"
    class="ml-2"
    size="x-small"
    :loading="loading"
    :disabled="sent"
    @click="send"
  >
    <v-icon class="mr-2">
      mdi-bell
    </v-icon>Senden
  </v-btn>
</template>
