import React from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { BlogType } from '../../types'
import { BlogContent } from '../../components/BlogContent';
import Head from 'next/head'

import { title } from '../../static/general'
import cheerio from 'cheerio';
import hljs from 'highlight.js'
import dayjs from 'dayjs'


type BlogProps = {
  blog: BlogType
  title: String
}

const Blog: React.FC<BlogProps> = ({ blog, title }) => {

  return (
    <>
    <Head>
      <title>{blog.title} | {title}</title>
    </Head>
    <div className="bg-gray-50 py-4 px-2 md:px-14">
      <p className="text-2xl font-semibold"><h1>{blog.title}</h1></p>
      <div className="inline-flex text-sm py-1.5">
        <div className="flex-1 text-black pr-3 font-semibold">{blog.createdAt}</div>
        {blog.tags.map(tag => (
          <div className="inline-flex bg-gray-800 mr-2 px-1.5 rounded-md" key={tag.id}>
            <a className="flex-1 text-white font-semibold"><h2>{tag.name}</h2></a>
          </div>
        ))}
      </div>
      <BlogContent blog={blog} />
    </div>
    </>
  );
};

export default Blog;

export const getStaticPaths: GetStaticPaths = async () => {
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const res = await fetch(process.env.ENDPOINT + '/blogs', key);
  const repos = await res.json();
  const paths = repos.contents.map(repo => `/blogs/${repo.id}`);

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async context => {  
  const highlightCode = (body: String) => {
    const $ = cheerio.load(body)
    $('pre code').each((_, elm) => {
      const result = hljs.highlightAuto($(elm).text())
      $(elm).html(result.value)
      $(elm).addClass('hljs')
    });
    return $.html()
  }

  const id = context.params.id;
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const res = await fetch(process.env.ENDPOINT + '/blogs/' + id, key);
  const blog: BlogType  = await res.json();

  return {
    props: {
      blog:{
        id: blog.id,
        title: blog.title,
        body: highlightCode(blog.body),
        tags: blog.tags,
        createdAt: dayjs(blog.createdAt).format('YYYY-MM-DD'),
        updatedAt: blog.updatedAt,
        publishedAt: blog.publishedAt,
        revisedAt: blog.revisedAt,
        featured: blog.featured,
      },
      title: title,
    },
  };
};