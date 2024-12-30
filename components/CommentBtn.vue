<script lang="ts" setup>
import { onAuthStateChanged } from 'firebase/auth'
import { collection, deleteField, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import type { BlogPostComment } from '~/types/firestore.types'

const props = defineProps<{ postId: string }>()
const emit = defineEmits<{
  (e: 'click'): void
}>()

const userId = ref()
const commentCount = ref(0)
const comments = ref<BlogPostComment[]>([])

onAuthStateChanged(firebaseAuth, (user) => {
  userId.value = user?.uid
})

const unsubscribeCommentCount = onSnapshot(collection(firestoreDb, 'posts', props.postId, 'comments'), (snapshot) => {
  commentCount.value = snapshot.size
  comments.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as BlogPostComment))
})

const badgeCount = computed(() => {
  return comments.value.filter(comment => comment.mentions === userId.value).length
})

onUnmounted(() => {
  if (unsubscribeCommentCount) {
    unsubscribeCommentCount()
  }
})

function clearBadge() {
  comments.value.forEach((comment) => {
    if (comment.mentions === userId.value) {
      updateDoc(doc(firestoreDb, 'posts', props.postId, 'comments', comment.id), {
        mentions: deleteField(),
      })
    }
  })
}
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
        <v-badge
          :model-value="badgeCount > 0"
          :content="badgeCount"
          color="red"
        >
          <v-btn
            size="small"
            icon="mdi-comment"
            variant="text"
            v-bind="tooltipProps"
            @click="emit('click'); clearBadge()"
          />
        </v-badge>
      </div>
    </template>
  </v-tooltip>
</template>
