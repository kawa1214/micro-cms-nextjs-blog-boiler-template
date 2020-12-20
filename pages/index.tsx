import React from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'


import Head from 'next/head'
import { BlogType, TagType } from './types'

import { BlogCard } from './components/blogcard' 

type HomeProps = {
  blogs: Array<BlogType>
}
 
const Home: React.FC<HomeProps> = ({blogs}) => {
  return (
    <div className="bg-gray-100 px-2 md:px-14">
      {blogs.map(blog => (
        <BlogCard blog={blog} key={blog.id}/>
      ))}
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