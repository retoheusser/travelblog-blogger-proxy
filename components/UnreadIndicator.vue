<script lang="ts" setup>
import { onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const props = defineProps<{ postId: string, postPublished: string }>()

const isRead = ref(true)
const userId = ref()
const userCreated = ref()

onAuthStateChanged(firebaseAuth, async (user) => {
  userId.value = user?.uid
  userCreated.value = user?.metadata.creationTime
})

const isUnread = computed(() => !isRead.value && new Date(userCreated.value) < new Date(props.postPublished))

watch(userId, async (uid) => {
  const snapshot = await getDoc(doc(firestoreDb, 'posts', props.postId, 'read', uid))
  isRead.value = snapshot.data()?.read
})
</script>

<template>
  <v-chip
    v-if="isUnread"
    size="x-small"
    rounded
    class="mx-2"
    color="red"
  >
    Neu
  </v-chip>
</template>
