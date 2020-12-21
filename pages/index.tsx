import React from 'react'
import { GetStaticProps } from 'next'

import { BlogType } from '../types'
import BlogCard from '../components/BlogCard'
import Link from 'next/link'

type HomeProps = {
  blogs: Array<BlogType>
}
 
const Home: React.FC<HomeProps> = ({blogs}) => {
  return (
    <div className="bg-gray-100 px-2 md:px-14">
      {blogs.map(blog => (
        <BlogCard blog={blog} key={blog.id}/>
      ))}
      <Link href="pages/1">
        <a className="text-gray-500 pr-4">
          &lt;&lt;
        </a>
      </Link>
      <Link href="pages/1">
        <a className="text-black">
          &gt;&gt;
        </a>
      </Link>
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