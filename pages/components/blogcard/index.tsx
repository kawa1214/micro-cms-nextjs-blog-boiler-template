import React, {Fragment} from 'react'
import Link from 'next/link';

import Moment from 'react-moment';

import { BlogType } from '../../types'
type BlogCardProps = {
    blog: BlogType
}

const stripTags = (input: string, allowed: string) => {
  allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('')
  const tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi
  return input.replace(tags, ($0, $1) => (allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''))
}

export const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return(
    <div className="py-4">
      <Link href={`/blogs/${blog.id}`}>
        <a className="text-lg font-semibold">{blog.title}</a>
      </Link>

      <div className="text-sm text-gray-700 py-1.5">
        <Moment format="YYYY-MM-DD" className="pr-5">{blog.createdAt}</Moment>
        {blog.tags.map(tag => (
          <a key={tag.id} className="pr-2">{tag.name}</a>
        ))}
      </div>
      <div
        className="max-h-12 overflow-ellipsis overflow-hidden text-gray-500"
        dangerouslySetInnerHTML={{
          __html: `${stripTags(blog.body, "")}`,
        }}
      />
    </div>
  )
}