import React from 'react'
import { GetStaticProps } from 'next'

import { BlogType } from '../types'
import { BlogCard } from '../components/BlogCard'
import Link from 'next/link'

type HomeProps = {
  blogs: Array<BlogType>
}
 
const Home: React.FC<HomeProps> = ({blogs}) => {
  return (
    <div className="flex justify-center bg-gray-50 px-3 md:px-0 md:py-20">
      <div className="bg-gray-50 max-w-7xl md:grid md:grid-cols-3 md:gap-x-14 md:gap-y-8">
        {blogs.map(blog => (
          <BlogCard blog={blog} key={blog.id}/>
        ))}
      </div>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const limit = 10
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch(process.env.ENDPOINT + '/blogs?' + `limit=${limit}`, key);

  const data = await res.json();
  const blogs: Array<BlogType> = data.contents
  return {
    props: {
      blogs: blogs,
    },
  };
};