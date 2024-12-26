<script lang="ts" setup>
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import type { BlogPostComment } from '~/types/firestore.types'

const props = defineProps<{ postId: string }>()
const emit = defineEmits<{
  (e: 'click:add'): void
}>()

const comments = ref<(BlogPostComment & { id: string })[]>([])

const unsubscribe = onSnapshot(
  query(
    collection(firestoreDb, 'posts', props.postId, 'comments'), orderBy('timestamp'),
  ),
  (snapshot) => {
    comments.value = [
      ...comments.value,
      ...snapshot.docChanges()
        .filter(change => change.type === 'added')
        .map(addition => ({ ...addition.doc.data() as BlogPostComment, id: addition.doc.id })),
    ]
  })

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})
</script>

<template>
  <div class="mt-4">
    <div
      v-for="comment in comments"
      :key="comment.id"
      class="d-flex mb-2"
    >
      <div class="font-weight-bold mr-2">
        {{ comment.name }}
      </div>
      <div class="font-italic">
        {{ comment.comment }}
      </div>
    </div>
    <v-btn
      size="x-small"
      variant="tonal"
      class="font-weight-bold"
      @click="emit('click:add')"
    >
      Kommentar hinzufügen
    </v-btn>
  </div>
</template>
