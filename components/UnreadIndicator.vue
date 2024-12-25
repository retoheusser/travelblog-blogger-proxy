<script lang="ts" setup>
import { onAuthStateChanged } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'

const props = defineProps<{ postId: string, postPublished: string }>()

const isRead = ref(false)
const userId = ref()
const userCreated = ref()

onAuthStateChanged(firebaseAuth, async (user) => {
  userId.value = user?.uid
  userCreated.value = user?.metadata.creationTime
})
let unsubscribeReadSnapshot: ReturnType<typeof onSnapshot>

const isUnread = computed(() => !isRead.value && new Date(userCreated.value) < new Date(props.postPublished))

watch(userId, async (uid) => {
  unsubscribeReadSnapshot = onSnapshot(doc(firestoreDb, 'posts', props.postId, 'read', uid), (snapshot) => {
    isRead.value = snapshot.data()?.read
  })
})

onUnmounted(() => {
  if (unsubscribeReadSnapshot) {
    unsubscribeReadSnapshot()
  }
})
</script>

<template>
  <v-chip
    v-if="isUnread"
    size="small"
    rounded
    class="mx-2"
    color="red"
  >
    Neu
  </v-chip>
</template>
