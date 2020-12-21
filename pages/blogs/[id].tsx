import React from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { BlogType } from '../../types'
import Moment from 'react-moment';
import BlogContent from '../../components/BlogContent';
import Head from 'next/head'
import { useRouter } from 'next/router'


import { title } from '../../static/general'
import { GA_TRACKING_ID } from '../../utils/tag'

type BlogProps = {
  blog: BlogType
}

const Blog: React.FC<BlogProps> = ({ blog }) => {
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <>
    <Head>
      <title>{blog.title} | {title}</title>
      <script
          async={true}
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
            `,
          }}
        />
    </Head>
    <div className="bg-gray-100 py-4 px-2 md:px-14">
      <p className="text-2xl font-semibold">{blog.title}</p>
      <div className="text-sm py-1.5">
        <Moment format="YYYY-MM-DD" className="text-gray-700 pr-3 font-semibold">{blog.createdAt}</Moment>
        {blog.tags.map(tag => (
          <div className="inline-flex bg-white mr-2 px-1.5 rounded-md" key={tag.id}>
            <a className="flex-1 text-gray-700 font-semibold">{tag.name}</a>
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

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async context => {  
  const id = context.params.id;
  const key = {
    headers: { 'X-API-KEY': process.env.API_KEY },
  };

  const res = await fetch(process.env.ENDPOINT + '/blogs/' + id, key);
  const blog: BlogType  = await res.json();
  return {
    props: {
      blog: blog,
    },
  };
};