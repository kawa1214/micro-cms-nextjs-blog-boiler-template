import React from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { BlogType, TagType } from '../types'
import Moment from 'react-moment';

type BlogProps = {
  blog: BlogType
}

const Blog: React.FC<BlogProps> = ({ blog }) => {
  return (
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
      <div className="bg-white rounded-sm">
        <div className="rounded-sm grid h-48 md:h-128 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <p className="px-4 md:px-12 place-self-center font-bold text-3xl text-white">{blog.title}</p>
        </div>
        <div
          className="text-black py-6 px-4"
          dangerouslySetInnerHTML={{
            __html: blog.body,
          }}
        />
      </div>
    </div>
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