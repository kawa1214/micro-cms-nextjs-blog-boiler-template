import React from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

import Link from 'next/link';

import Head from 'next/head'
import { BlogType, TagType } from './types'

 
const Home = ({blogs}) => {
  return (
    <>
      {blogs.map(blog => (
        <React.Fragment key={blog.id}>
          <Link href={`/blogs/${blog.id}`}>
            <a>{blog.title}</a>
          </Link>
        </React.Fragment>
      ))}
    </>
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