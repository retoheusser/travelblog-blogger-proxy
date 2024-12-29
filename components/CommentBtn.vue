<script lang="ts" setup>
import { collection, onSnapshot } from 'firebase/firestore'

const props = defineProps<{ postId: string }>()
const emit = defineEmits<{
  (e: 'click'): void
}>()

const commentCount = ref(0)
const unsubscribeCommentCount = onSnapshot(collection(firestoreDb, 'posts', props.postId, 'comments'), (snapshot) => {
  commentCount.value = snapshot.size
})

onUnmounted(() => {
  if (unsubscribeCommentCount) {
    unsubscribeCommentCount()
  }
})
</script>

<template>
  <v-tooltip
    location="top"
    text="Senf dazugeben"
  >
    <template #activator="{ props: tooltipProps }">
      <div class="d-flex align-center">
        <span
          v-if="commentCount"
          class="mr-n2"
        >{{ commentCount }}</span>
        <v-btn
          size="small"
          icon="mdi-comment"
          variant="text"
          v-bind="tooltipProps"
          @click="emit('click')"
        />
      </div>
    </template>
  </v-tooltip>
</template>
