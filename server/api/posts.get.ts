import { $fetch } from 'ofetch'
import type { BlogOverview } from '~/types/blogger.types'

export default eventHandler((event) => {
  const { blogger: { apiKey, blogId } } = useRuntimeConfig()
  const query = getQuery(event)

  return $fetch<BlogOverview>(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`, {
    params: {
      key: apiKey,
      maxResults: 10,
      pageToken: query.nextPageToken,
    },
  })
})
