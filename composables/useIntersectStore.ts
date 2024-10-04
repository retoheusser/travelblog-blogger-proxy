export const useIntersectStore = defineStore('intersect', () => {
  const currentlyVisibleTitle = ref('home')

  // TODO: store array of visible titles and display the topmost

  return { currentlyVisibleTitle }
})
