import React, {Fragment} from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { BlogType } from '../../types'
type BlogCardProps = {
    blog: BlogType
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return(
    <div className="py-4">
      <div className="flex items-center ">
        <Link href={`/blogs/${blog.id}`}>
          <a className="bg-gray-600 h-16 w-16 flex flex-shrink-0 flex-col items-center justify-center rounded-lg text-2xl shadow-sm">
            {blog.icon ?? '🥳'}
          </a>
        </Link>
        <Link href={`/blogs/${blog.id}`}>
          <a className="text-white text-lg font-semibold pl-4">{blog.title}</a>
        </Link>
      </div>
      <div className="text-sm py-1.5 md:py-4 inline-flex">
        {blog.tags.map(tag => (
          <div className=" bg-gray-800 mr-2 px-1.5 rounded-md" key={tag.id}>
            <h2 className="flex-1 text-white font-semibold">{tag.name}</h2>
          </div>
        ))}
        <div className="text-gray-100 pr-3 font-semibold">{blog.createdAt}</div>
      </div>
    </div>
  )
}

