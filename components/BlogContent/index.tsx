import React from 'react'
import { BlogType, TagType } from '../../types'


type BlogContentProps = {
  blog: BlogType
  tableOfContent: string
}

export const BlogContent: React.FC<BlogContentProps> = ({ blog, tableOfContent }) => {
  return (
    <div className="md:flex md:items-start">
      <div className="bg-white rounded-sm md:max-w-screen-md">
        <div className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 w-full text-center py-14 block rounded-sm text-7xl text-white">
          {blog.icon ?? '🥳'}
        </div>
        <div className="px-4 py-4 md:px-8 md:py-8">
          <div className="text-gray-800 font-semibold text-sm pt-2">
            {blog.createdAt}
          </div>

          <div className="py-1">
            <h1 className="text-3xl font-semibold">{blog.title}</h1>
          </div>
          
          <div className="inline-flex text-sm pt-2 pb-6">
            {blog.tags.map(tag => (
              <div className="inline-flex bg-gray-800 mr-2 px-1.5 rounded-md" key={tag.id}>
                <p className="flex-1 text-white font-semibold"><h2 className="text-sm">{tag.name}</h2></p>
              </div>
            ))}
          </div>

          <div
            className=""
            id="blog_content"
            dangerouslySetInnerHTML={{
              __html: blog.body,
            }}
          />
        </div>
      </div>

      <div
        className="hidden md:grid top-8 shadow sticky ml-2"
        id="blog_toc"
        dangerouslySetInnerHTML={{
          __html: tableOfContent,
        }}
      />
    </div>
  )
}
