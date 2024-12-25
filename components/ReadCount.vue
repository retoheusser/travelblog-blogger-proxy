<script lang="ts" setup>
import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore'

const props = defineProps<{ postId: string }>()

const userId = ref()
const readCount = ref(0)

onAuthStateChanged(firebaseAuth, async (user) => {
  userId.value = user?.uid
})

const unsubscribeReadCountCount = onSnapshot(collection(firestoreDb, 'posts', props.postId, 'read'), (snapshot) => {
  readCount.value = snapshot.size
})

const onIntersect = useDebounceFn(async (isIntersecting: boolean) => {
  if (isIntersecting) {
    await setDoc(doc(firestoreDb, 'posts', props.postId, 'read', userId.value), {
      read: true,
    })
  }
}, 5000)

onUnmounted(() => {
  if (unsubscribeReadCountCount) {
    unsubscribeReadCountCount()
  }
})
</script>

<template>
  <div
    v-intersect="onIntersect"
    class="font-italic"
  >
    {{ readCount }} mal gelesen
  </div>
</template>
