export interface BlogOverview {
  kind: string
  items: BlogPostItem[]
  etag: string
}

export interface BlogPostItem {
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
  location?: {
    name: string
    lat: number
    lng: number
    span: string
  }
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
