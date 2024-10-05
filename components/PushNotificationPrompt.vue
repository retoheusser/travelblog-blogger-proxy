<script lang="ts" setup>
const isSupported = computed(() => window.Notification && window.PushManager)

function subscribe(value: unknown) {
  // TODO: push notification code here
  console.log(value)
}
</script>

<template>
  <section
    v-if="isSupported"
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
