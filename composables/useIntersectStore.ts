export const useIntersectStore = defineStore('intersect', () => {
  const currentlyVisibleTitle = ref('home')

  return { currentlyVisibleTitle }
})
