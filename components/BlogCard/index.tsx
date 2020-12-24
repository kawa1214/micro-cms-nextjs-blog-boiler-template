import React, {Fragment} from 'react'
import Link from 'next/link';
import Image from 'next/image'

import Moment from 'react-moment';

import { BlogType } from '../../types'
type BlogCardProps = {
    blog: BlogType
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return(
    <div className="py-4">
      <Link href={`/blogs/${blog.id}`}>
        <a><Image className={`object-fill rounded-lg transition duration-500 ease-in-out md:transform hover:scale-105`} width={960} height={530} src={blog.featured.url}/></a>
      </Link>
      <div className="text-sm py-1.5 md:py-4">
        {blog.tags.map(tag => (
          <div className="inline-flex bg-gray-800 mr-2 px-1.5 rounded-md" key={tag.id}>
            <a className="flex-1 text-white font-semibold">{tag.name}</a>
          </div>
        ))}
      </div>
      <Link href={`/blogs/${blog.id}`}>
        <a className="text-lg font-semibold">{blog.title}</a>
      </Link>
      <div className="text-sm grid justify-items-end">
        <Moment format="YYYY-MM-DD" className="text-gray-700 pr-3 font-semibold">{blog.createdAt}</Moment>
      </div>
    </div>
  )
}

