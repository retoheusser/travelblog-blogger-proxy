<script lang="ts" setup>
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean | null): void
}>()
</script>

<template>
  <section class="px-4 d-flex align-center justify-space-between bg-grey-lighten-2">
    <p class="text-body-2 d-flex">
      <v-icon class="mr-2">
        mdi-glasses
      </v-icon>
      <span>
        Papi-Modus
      </span>
    </p>
    <v-switch
      :model-value="props.modelValue"
      class="ml-2 flex-shrink-0"
      color="primary"
      hide-details
      @update:model-value="(v) => emit('update:modelValue', v)"
    />
  </section>
</template>
