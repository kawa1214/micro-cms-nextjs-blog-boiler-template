type TagType = {
  id: string
  name: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  revisedAt: Date
}

type BlogType = {
  id: string
  title: string
  body: string
  tags: Array<TagType>
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  revisedAt: Date
  featured: FeaturedType
}

type FeaturedType = {
  url: string
}

export type {BlogType, TagType, FeaturedType}