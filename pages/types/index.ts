export type BlogType = {
    id: string
    title: string
    body: string,
    tags: Array<TagType>
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    revisedAt: Date
}

export type TagType = {
    id: string,
    name: string,
    createdAt: Date
    updatedAt: Date
    publishedAt: Date
    revisedAt: Date
}