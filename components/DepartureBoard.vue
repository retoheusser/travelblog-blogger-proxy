<script lang="ts" setup>
import DepartureBoard from '../lib/departure-board/departure-board.js'

const { width } = useWindowSize()
const letterCount = computed(() => Math.min(Math.round(width.value / 22), 24))
const departureBoardRef = ref<HTMLDivElement | null>(null)

function initDepartureBoard() {
  departureBoardRef.value?.replaceChildren() // empties the DOM node
  const board = new DepartureBoard(departureBoardRef.value, { rowCount: 1, letterCount: letterCount.value })
  board.setValue('wendy & reto at')
  setTimeout(() => {
    board.setValue('we-re.at/home')
  }, 8000)
}

onMounted(initDepartureBoard)
watch(width, initDepartureBoard)
</script>

<template>
  <div ref="departureBoardRef" />
</template>

<style lang="css" scoped>
/* .departure-board ::v-deep {
  transform: scale(1.5);
  transform-origin: left;
} */
</style>
