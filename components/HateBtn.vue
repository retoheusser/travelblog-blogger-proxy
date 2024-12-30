<script lang="ts" setup>
import { onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, setDoc, doc, deleteDoc } from 'firebase/firestore'
import { logEvent } from 'firebase/analytics'

const props = defineProps<{ postId: string }>()

const hated = ref(false)
const hateCount = ref(0)
const userId = ref()
let unsubscribeHate: ReturnType<typeof onSnapshot>

onAuthStateChanged(firebaseAuth, async (user) => {
  userId.value = user?.uid
})

watch(userId, async (uid) => {
  unsubscribeHate = onSnapshot(doc(firestoreDb, 'posts', props.postId, 'hates', uid), (snapshot) => {
    hated.value = snapshot.data()?.hated
  })
})

const unsubscribeHateCount = onSnapshot(collection(firestoreDb, 'posts', props.postId, 'hates'), (snapshot) => {
  hateCount.value = snapshot.size
})

async function toggleHate() {
  if (!hated.value) {
    await setDoc(doc(firestoreDb, 'posts', props.postId, 'hates', userId.value), {
      hated: true,
    })
    logEvent(firebaseAnalytics, 'hate_post', { post_id: props.postId })
  }
  else {
    await deleteDoc(doc(firestoreDb, 'posts', props.postId, 'hates', userId.value))
    logEvent(firebaseAnalytics, 'unhate_post', { post_id: props.postId })
  }
}

onUnmounted(() => {
  if (unsubscribeHate) {
    unsubscribeHate()
  }
  if (unsubscribeHateCount) {
    unsubscribeHateCount()
  }
})
</script>

<template>
  <v-tooltip
    location="top"
    text="Fickt euch"
  >
    <template #activator="{ props: tooltipProps }">
      <div class="d-flex align-center">
        <span
          v-if="hateCount"
          class="mr-n2"
        >{{ hateCount }}</span>
        <v-btn
          size="small"
          variant="text"
          v-bind="tooltipProps"
          icon
          :class="{ bounce: hated }"
          @click="toggleHate"
        >
          <v-icon>
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="512.000000pt"
              height="512.000000pt"
              viewBox="0 0 512.000000 512.000000"
              preserveAspectRatio="xMidYMid meet"
            >

              <g
                transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                fill="currentColor"
                stroke="none"
              >
                <path
                  d="M2414 5111 c-51 -13 -134 -63 -166 -100 -17 -19 -43 -60 -57 -91
l-26 -55 -5 -935 c-3 -514 -6 -927 -8 -917 -5 38 -52 115 -97 156 -69 64 -124
85 -220 85 -97 0 -167 -28 -232 -93 -59 -59 -85 -119 -97 -222 l-10 -88 -69
-15 c-215 -49 -388 -223 -433 -435 -10 -50 -14 -160 -14 -450 l0 -383 375
-469 375 -469 0 -315 0 -315 951 0 951 0 -3 323 -4 322 258 400 257 400 -2
695 -3 695 -23 45 c-48 98 -114 155 -212 184 -67 20 -112 20 -176 1 -106 -31
-176 -96 -219 -201 l-23 -56 -4 104 c-3 80 -9 113 -27 149 -102 211 -368 259
-532 96 -41 -41 -86 -121 -91 -162 -2 -11 -5 410 -8 935 l-5 955 -27 50 c-32
62 -104 130 -166 157 -50 23 -157 32 -208 19z"
                />
              </g>
            </svg>
          </v-icon>
        </v-btn>
      </div>
    </template>
  </v-tooltip>
</template>

<style lang="css" scoped>
@keyframes bounceIn {
  0%, 100% {
    transform: translateY(0);
  }
  10% {
    transform: translateY(-6px);
  }
}

.bounce {
  animation: bounceIn 0.2s;
  animation-iteration-count: 10;
}
</style>
