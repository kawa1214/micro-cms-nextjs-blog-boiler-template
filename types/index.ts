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
  createdAt: Date | string
  updatedAt: Date
  publishedAt: Date
  revisedAt: Date
  featured: FeaturedType
  icon: string
}

type FeaturedType = {
  url: string
}

export type {BlogType, TagType, FeaturedType}