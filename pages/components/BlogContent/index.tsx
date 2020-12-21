import React from 'react'
import { BlogType, TagType } from '../../types'
import cheerio from 'cheerio';
import hljs from 'highlight.js'

type BlogContentProps = {
  blog: BlogType
}

const highlightCode = (body: String) => {
  const $ = cheerio.load(body)
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text())
    $(elm).html(result.value)
    $(elm).addClass('hljs')
  });
  return $.html()
}

export const BlogContent: React.FC<BlogContentProps> = ({ blog }) => {
  return (
    <div className={"bg-white rounded-sm"}>
      <div className="rounded-sm grid h-auto w-auto px-4 md:px-12 py-16 md:py-20 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
        <p className="place-self-center text-center font-bold text-3xl text-white">{blog.title}</p>
      </div>
      <div className="text-black py-6 px-4">
        <div
        id="blog_content"
        dangerouslySetInnerHTML={{
          __html: highlightCode(blog.body),
        }}/>
      </div>
    </div>
  )
}
