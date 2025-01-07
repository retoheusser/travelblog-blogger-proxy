<script lang="ts" setup>
import { onAuthStateChanged } from 'firebase/auth'
import { collection, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore'

const props = defineProps<{ postId: string }>()

const userId = ref()
const userIsAdmin = ref(false)
const readCount = ref(0)

onAuthStateChanged(firebaseAuth, async (user) => {
  userId.value = user?.uid
  if (user) {
    const userRef = doc(firestoreDb, 'users', user.uid)
    const userInDB = await getDoc(userRef)
    userIsAdmin.value = userInDB.data()?.admin
  }
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
    <span v-show="userIsAdmin">{{ readCount }} mal gelesen</span>
  </div>
</template>
