import { $fetch } from 'ofetch'
import type { BlogOverview } from '~/types/blogger.types'

export default eventHandler(() => {
  const { blogger: { apiKey, blogId } } = useRuntimeConfig()

  return $fetch<BlogOverview>(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`, {
    params: {
      key: apiKey,
    },
  })
})
