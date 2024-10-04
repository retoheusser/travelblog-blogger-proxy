<script lang="ts" setup>
import DepartureBoard from '../lib/departure-board/departure-board.js'

const { width } = useWindowSize()
const { currentlyVisibleTitle } = storeToRefs(useIntersectStore())
const letterCount = computed(() => Math.min(Math.round(width.value / 22), 24))
const departureBoardRef = ref<HTMLDivElement | null>(null)
let isInitialized = false
let board: { setValue: (content: string | string[]) => void }

function initDepartureBoard() {
  departureBoardRef.value?.replaceChildren() // empties the DOM node
  board = new DepartureBoard(departureBoardRef.value, { rowCount: 2, letterCount: letterCount.value })
  board.setValue(['wendy & reto at'])
  setTimeout(() => {
    isInitialized = true
    board.setValue(['we    - re  .at/', currentlyVisibleTitle.value])
  }, 6000)
}

function updateDepartureBoard() {
  if (isInitialized) {
    departureBoardRef.value?.replaceChildren() // empties the DOM node
    board = new DepartureBoard(departureBoardRef.value, { rowCount: 2, letterCount: letterCount.value })
    board.setValue(['we-re.at/', currentlyVisibleTitle.value])
  }
}

onMounted(initDepartureBoard)
watch(width, updateDepartureBoard)
watch(currentlyVisibleTitle, () => {
  if (isInitialized) {
    board.setValue(['we-re.at/', currentlyVisibleTitle.value])
  }
})
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
