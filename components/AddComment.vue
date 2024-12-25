<script lang="ts" setup>
import { onAuthStateChanged } from 'firebase/auth'

const props = defineProps<{ postId: string, modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const step = ref(0)
const comment = ref('')
const name = ref('')
const commentForm = ref<HTMLFormElement & { validate: () => Promise<{ valid: boolean }> }>()
const nameForm = ref<HTMLFormElement & { validate: () => Promise<{ valid: boolean }> }>()

const requiredRule = (value: string) => !!value || 'Bitte gib etwas ein'

onAuthStateChanged(firebaseAuth, async (user) => {
  name.value = user?.displayName ?? ''
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
    console.log(name.value, comment.value)

    emit('update:modelValue', false)
    reset()
  }
}

function reset() {
  step.value = 0
  comment.value = ''
  name.value = ''
}
</script>

<template>
  <v-tabs-window
    v-if="props.modelValue"
    v-model="step"
    class="pt-6"
  >
    <v-tabs-window-item :value="0">
      <v-form ref="commentForm">
        <v-textarea
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
        />
        <v-btn
          color="primary"
          class="ml-4"
          @click="send"
        >
          Senden
        </v-btn>
      </v-form>
    </v-tabs-window-item>
  </v-tabs-window>
</template>
