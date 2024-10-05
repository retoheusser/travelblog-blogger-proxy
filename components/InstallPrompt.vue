<script lang="ts" setup>
const isInstallable = ref(false)

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<{ outcome: 'accepted' | 'dismissed' }>
}

let event: BeforeInstallPromptEvent | null
useEventListener(window, 'beforeinstallprompt', (e: BeforeInstallPromptEvent) => {
  e.preventDefault()
  event = e
  isInstallable.value = true
})

async function install() {
  const outcome = (await event?.prompt())?.outcome
  event = null
  if (outcome === 'accepted' || outcome === 'dismissed') {
    isInstallable.value = false
  }
}
</script>

<template>
  <section
    v-if="isInstallable"
    class="mx-4 mb-4 d-flex align-center justify-space-between"
  >
    <p class="text-body-2">
      Installiere diesen Reiseblog als App auf deinem Gerät, um die Reise möglichst bequem mitzuverfolgen.
    </p>
    <v-btn
      variant="outlined"
      @click="install"
    >
      Installieren
    </v-btn>
  </section>
</template>
