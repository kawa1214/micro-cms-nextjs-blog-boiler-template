import Link from 'next/link'
import React from 'react'
import { BlogType, TagType } from '../../types'
import Image from 'next/image'
import { table } from 'console'

type BlogContentProps = {
  blog: BlogType
  tableOfContent: string
}

export const BlogContent: React.FC<BlogContentProps> = ({ blog, tableOfContent }) => {
  return (
    <>
      <div className="md:flex">
        <div>    
          <div className="flex-1 bg-white rounded-sm md:max-w-screen-lg">
            <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 w-full text-center py-14 block rounded-lg text-3xl text-white">
              {blog.icon} {blog.title}
            </div>
            <div className="py-3 px-4">
              <h1 className="text-2xl font-semibold">{blog.title}</h1>
              <div className="inline-flex text-sm py-1.5">
              <div className="flex-1 text-black pr-3 font-semibold">{blog.createdAt}</div>
                {blog.tags.map(tag => (
                  <div className="inline-flex bg-gray-800 mr-2 px-1.5 rounded-md" key={tag.id}>
                    <a className="flex-1 text-white font-semibold"><h2>{tag.name}</h2></a>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-black pb-6 px-4">
              <div
              id="blog_content"
              dangerouslySetInnerHTML={{
                __html: blog.body,
              }}/>
            </div>
          </div>
        </div>
        <div
          className="flex-1 hidden md:grid md:sticky md:top-0 md:h-screen md:mt-16 md:ml-4"
          
        >
          <div
          id="blog_toc"
          dangerouslySetInnerHTML={{
            __html: tableOfContent,
          }}
        ></div>
        </div>
      </div>
    </>
  )
}
