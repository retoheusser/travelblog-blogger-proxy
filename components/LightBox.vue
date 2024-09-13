<script lang="ts" setup>
const overlay = ref(false)
const lightboxImage = ref<string | undefined>(undefined)

function click(e: MouseEvent) {
  const targetElement = e.target as HTMLElement
  if (targetElement.tagName === 'IMG') {
    e.preventDefault()
    overlay.value = true
    lightboxImage.value = targetElement.closest('a')?.href
  }
}
</script>

<template>
  <div>
    <slot
      name="activator"
      :on="{ click }"
    />

    <v-overlay
      v-model="overlay"
      class="align-center justify-center"
    >
      <v-img
        style="height: 90vh; width: 90vw;"
        :src="lightboxImage"
        @click="overlay = false"
      />
    </v-overlay>
  </div>
</template>
