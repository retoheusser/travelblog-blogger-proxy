<script lang="ts" setup>
import { onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore'

const props = defineProps<{ postId: string }>()

const liked = ref(false)
const likeCount = ref(0)
const userId = ref()
let unsubscribeLike: ReturnType<typeof onSnapshot>
let unsubscribeLikeCount: ReturnType<typeof onSnapshot>

onAuthStateChanged(firebaseAuth, async (user) => {
  userId.value = user?.uid
})

watch(userId, async (uid) => {
  unsubscribeLike = onSnapshot(doc(firestoreDb, 'posts', props.postId, 'likes', uid), (snapshot) => {
    liked.value = snapshot.data()?.liked
  })
  unsubscribeLikeCount = onSnapshot(collection(firestoreDb, 'posts', props.postId, 'likes'), (snapshot) => {
    likeCount.value = snapshot.size
  })
})

async function toggleLike() {
  if (!liked.value) {
    await setDoc(doc(firestoreDb, 'posts', props.postId, 'likes', userId.value), {
      liked: true,
    })
  }
  else {
    await deleteDoc(doc(firestoreDb, 'posts', props.postId, 'likes', userId.value))
  }
}

onUnmounted(() => {
  if (unsubscribeLike) {
    unsubscribeLike()
  }
  if (unsubscribeLikeCount) {
    unsubscribeLikeCount()
  }
})
</script>

<template>
  <v-tooltip
    location="top"
    text="Find ich gut"
  >
    <template #activator="{ props: tooltipProps }">
      <div class="d-flex align-center">
        <span v-if="likeCount">{{ likeCount }}</span>
        <v-btn
          size="small"
          icon="mdi-heart"
          variant="text"
          v-bind="tooltipProps"
          :color="liked ? 'red' : undefined"
          @click="toggleLike"
        />
      </div>
    </template>
  </v-tooltip>
</template>
