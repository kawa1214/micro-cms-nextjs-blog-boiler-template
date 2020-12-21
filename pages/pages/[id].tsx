import React from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { BlogType } from '../../types'
import Moment from 'react-moment';
import BlogContent from '../../components/BlogContent';
import Head from 'next/head'
import { useRouter } from 'next/router'


import { title } from '../../static/general'
import { GA_TRACKING_ID } from '../../utils/tag'
import BlogCard from '../../components/BlogCard';
import Link from 'next/link';

type PagesProps = {
  blogs: Array<BlogType>
  page: number
}

const Pages: React.FC<PagesProps> = ({blogs, page}) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div className="bg-gray-100 px-2 md:px-14">
      {blogs.map(blog => (
        <BlogCard blog={blog} key={blog.id}/>
      ))}
      <Link href={(page==0) ? '/pages/0' : `/pages/${page-1}` }>
        <a className={`${(page == 0) ? "text-gray-500" : "text-black"} pr-4`}>
          &lt;&lt;
        </a>
      </Link>
      <Link href={`/pages/${(blogs.length <= 9) ? page : page+1}`}>
        <a className={`${(blogs.length <= 9) ? "text-gray-500" : "text-black"}`}>
          &gt;&gt;
        </a>
      </Link>
    </div>
  );
};

export default Pages;

export const getStaticPaths: GetStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };
  // TODO: content数/10をpathsに入れたい
  const res = await fetch(process.env.ENDPOINT + '/blogs', key);
  const repos = await res.json();
  //const paths = repos.contents.map(repo => `/blogs/${repo.id}`);
  const paths = []

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async context => {
  const id = context.params.id;
  const page = (typeof id === 'string') ? parseInt(id) : 0

  const limit = 10
  const key = {
    headers: {'X-API-KEY': process.env.API_KEY},
  };

  const res = await fetch(process.env.ENDPOINT + '/blogs?' + `limit=${limit}` + `&offset=${page*limit}`, key);

  const data = await res.json();
  const blogs: Array<BlogType> = data.contents
  return {
    props: {
      blogs: blogs,
      page: page,
    },
  };
};