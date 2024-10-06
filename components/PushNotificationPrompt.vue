<script lang="ts" setup>
import { getToken } from 'firebase/messaging'
import { firebaseMessaging } from '~/utils/firebase'

const isSupported = computed(() => window.Notification && window.PushManager)
const isGranted = computed(() => window.Notification.permission === 'granted')

async function subscribe(value: unknown) {
  console.log(value)
  if (value) {
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        console.log('notification permission granted')
        const currentToken = await getToken(firebaseMessaging, { vapidKey: 'BECJIm9x3Jpwj4xoRmBOi4DsUlic0zgTG1NfGwV4NhPsYH7qrWOmg2XimZX3AKyEf6IgFzu7cQaT7lYIyO8c0ng' })
        if (currentToken) {
          console.log('currentToken', currentToken)
        }
      }
      else {
        console.log('notification permission not granted')
      }
    }
    catch (error) {
      console.error(error)
    }
  }
}
</script>

<template>
  <section
    v-if="isSupported && isGranted"
    class="mx-4 mb-4 d-flex align-center justify-space-between"
  >
    <p class="text-body-2 d-flex">
      <v-icon class="mr-2">
        mdi-bell
      </v-icon>
      <span>
        Benachrichtigungen bei neuen Beiträgen erhalten (1x pro Tag)
      </span>
    </p>
    <v-switch
      class="ml-2 flex-shrink-0"
      color="primary"
      hide-details
      @update:model-value="subscribe"
    />
  </section>
</template>
