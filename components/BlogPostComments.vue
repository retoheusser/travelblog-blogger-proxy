<script lang="ts" setup>
import { onAuthStateChanged } from 'firebase/auth'
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import type { BlogPostComment } from '~/types/firestore.types'

const props = defineProps<{ postId: string, isAddingComment: boolean }>()
const emit = defineEmits<{
  (e: 'click:add'): void
  (e: 'click:reply', comment: BlogPostComment): void
}>()

const comments = ref<(BlogPostComment & { id: string })[]>([])
const userId = ref()

onAuthStateChanged(firebaseAuth, async (user) => {
  userId.value = user?.uid
})

const unsubscribe = onSnapshot(
  query(
    collection(firestoreDb, 'posts', props.postId, 'comments'), orderBy('timestamp'),
  ),
  (snapshot) => {
    comments.value = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as BlogPostComment))
  },
)

function isCommentAuthor(comment: BlogPostComment) {
  return comment.uid === userId.value
}

function deleteComment(comment: BlogPostComment) {
  const commentRef = doc(firestoreDb, 'posts', props.postId, 'comments', comment.id)
  deleteDoc(commentRef)
}

onUnmounted(() => {
  if (unsubscribe) {
    unsubscribe()
  }
})
</script>

<template>
  <div class="mt-4 text-body-2">
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
      <v-menu>
        <template #activator="{ props: menuProps }">
          <v-icon
            class="ml-2"
            size="small"
            v-bind="menuProps"
          >
            mdi-dots-vertical
          </v-icon>
        </template>
        <v-list density="compact">
          <v-list-item
            v-if="isCommentAuthor(comment)"
            @click="deleteComment(comment)"
          >
            <v-list-item-title>Kommentar löschen</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="!isCommentAuthor(comment)"
            @click="emit('click:reply', comment)"
          >
            <v-list-item-title>Antworten</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <v-btn
      v-if="!props.isAddingComment"
      size="x-small"
      variant="tonal"
      class="font-weight-bold"
      @click="emit('click:add')"
    >
      Kommentar / Reisetipps hinzufügen
    </v-btn>
  </div>
</template>
