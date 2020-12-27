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
  tableOfContent: string
}

const Blog: React.FC<BlogProps> = ({ blog, tableOfContent }) => {

  return (
    <>
    <Head>
      <title>{blog.title} | {title}</title>
    </Head>
    <div className="bg-gray-50 py-4 px-2 md:px-14 md:flex md:justify-center">
      <BlogContent blog={blog} tableOfContent={tableOfContent} />
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

  const generateTableOfContent = (body: string) => {
    const $ = cheerio.load(body,{ decodeEntities: false })
    let generateHtml = ''
    generateHtml = generateHtml + '<ul>'
    $('h2, h3').each((index, elm) => {
      const text = $(elm).html()
      const tag = $(elm)[0].name

      const refId = $(elm)[0].attribs.id
      generateHtml = generateHtml + 
      `<li class="toc_${tag}" key=${index}>`+
      `  <a href="#${refId}">${text}</a>`+
      '</li>'
    })
    generateHtml = generateHtml + '</ul>'
    return generateHtml
  }

  const id = context.params.id;
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const res = await fetch(process.env.ENDPOINT + '/blogs/' + id, key);
  const blog: BlogType  = await res.json();

  const tableOfCOntent: string = generateTableOfContent(blog.body)
  
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
      tableOfContent: tableOfCOntent,
    },
  };
};