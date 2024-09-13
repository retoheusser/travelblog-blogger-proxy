export interface BlogOverview {
  kind: string
  items: BlogPost[]
  etag: string
}

export interface BlogPost {
  kind: string
  id: string
  blog: Blog
  published: string
  updated: string
  url: string
  selfLink: string
  title: string
  content: string
  author: Author
  replies: Replies
  etag: string
}

export interface Blog {
  id: string
}

export interface Author {
  id: string
  displayName: string
  url: string
  image: Image
}

export interface Image {
  url: string
}

export interface Replies {
  totalItems: string
  selfLink: string
}

export default eventHandler(() => {
  const { blogger: { apiKey, blogId } } = useRuntimeConfig()

  return $fetch<BlogOverview>(`https://www.googleapis.com/blogger/v3/blogs/${blogId}/posts`, {
    params: {
      key: apiKey,
    },
  })
})
