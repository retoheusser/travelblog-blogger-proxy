<script lang="ts" setup>
import { UAParser } from 'ua-parser-js'

const parser = new UAParser()
const isBrowserDisplayMode = useMediaQuery('(display-mode: browser)')
const isIOS = ref(parser.getOS().name === 'iOS')

const isPWAInstallableOnIOS = computed(() => isBrowserDisplayMode.value && isIOS.value)
</script>

<template>
  <section
    v-if="isPWAInstallableOnIOS"
    class="px-4 py-8 d-flex align-center justify-space-between bg-grey-lighten-2"
  >
    <div class="text-body-2 d-flex">
      <v-icon class="mr-2">
        mdi-bell
      </v-icon>
      <div>
        <p class="mb-2">
          Du willst Benachrichtigungen bei neuen Beiträgen direkt auf deinem iPhone erhalten?
        </p>
        <p class="mb-2">
          Klicke unten in deinem Safari-Browser auf
          <v-icon size="small">
            mdi-export-variant
          </v-icon>
          und füge die Website zum Home-Screen hinzu
          <v-icon size="small">
            mdi-plus-box-outline
          </v-icon>
          .
        </p>
        <p class="mb-2">
          Sobald die unsere Travelblog-App auf deinem iPhone installiert ist, hast du die Möglichkeit, Push-Benachrichtigungen einzuschalten.
        </p>
      </div>
    </div>
  </section>
</template>
