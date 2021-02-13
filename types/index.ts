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
  icon: string
}


export type {BlogType, TagType}