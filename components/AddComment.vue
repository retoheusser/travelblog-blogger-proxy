<script lang="ts" setup>
import { logEvent } from 'firebase/analytics'
import { onAuthStateChanged, updateProfile } from 'firebase/auth'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'

const props = defineProps<{ postId: string, modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const goTo = useGoTo()

const step = ref(0)
const comment = ref('')
const name = ref('')
const user = ref()
const isLoading = ref(false)
const { modelValue } = toRefs(props)
const commentForm = ref<HTMLFormElement & { validate: () => Promise<{ valid: boolean }> }>()
const commentInput = ref<HTMLInputElement>()
const nameForm = ref<HTMLFormElement & { validate: () => Promise<{ valid: boolean }> }>()

const requiredRule = (value: string) => !!value || 'Bitte gib etwas ein'

onAuthStateChanged(firebaseAuth, async (u) => {
  name.value = u?.displayName ?? ''
  user.value = u
})

async function proceed() {
  const { valid } = await commentForm.value!.validate()
  if (valid) {
    step.value = 1
  }
}

async function send() {
  const { valid } = await nameForm.value!.validate()
  if (valid) {
    isLoading.value = true
    try {
      await addDoc(collection(firestoreDb, 'posts', props.postId, 'comments'), {
        comment: comment.value,
        uid: user.value.uid,
        name: name.value,
        timestamp: serverTimestamp(),
      })
      await updateProfile(user.value, { displayName: name.value })
      logEvent(firebaseAnalytics, 'comment_post', { post_id: props.postId })

      emit('update:modelValue', false)
      reset()
    }
    finally {
      isLoading.value = false
    }
  }
}

function reset() {
  step.value = 0
  comment.value = ''
}

watch(modelValue, async (isCommenting) => {
  if (isCommenting) {
    await nextTick()
    goTo(commentInput.value!, {
      duration: 500,
      offset: -80,
    })
  }
})
</script>

<template>
  <v-tabs-window
    v-if="props.modelValue"
    v-model="step"
    class="pt-6"
  >
    <v-tabs-window-item :value="0">
      <v-form
        ref="commentForm"
        @submit.prevent=""
      >
        <v-textarea
          ref="commentInput"
          v-model="comment"
          density="compact"
          variant="outlined"
          label="Gib deinen Senf dazu"
          autofocus
          :rows="1"
          :rules="[requiredRule]"
          auto-grow
          append-icon="mdi-arrow-right"
          @click:append="proceed"
        />
      </v-form>
    </v-tabs-window-item>

    <v-tabs-window-item :value="1">
      <v-form
        ref="nameForm"
        class="d-flex"
        @submit.prevent=""
      >
        <v-text-field
          v-model="name"
          density="compact"
          variant="outlined"
          label="Name"
          name="name"
          autocomplete="given-name"
          :rules="[requiredRule]"
          prepend-icon="mdi-arrow-left"
          @click:prepend="step = 0"
          @keyup.enter="send"
        />
        <HiddenFormFields />
        <v-btn
          color="primary"
          class="ml-4 font-weight-bold"
          @click="send"
        >
          Speichern
        </v-btn>
      </v-form>
    </v-tabs-window-item>
  </v-tabs-window>
</template>
