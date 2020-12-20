import React from 'react'
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { BlogType, TagType } from '../types'

type BlogProps = {
  blog: BlogType
}

const Blog: React.FC<BlogProps> = ({ blog }) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.createdAt}</p>
      <div>
        {blog.tags.map(tag => (
          <React.Fragment key={tag.id}>
            <span>{tag.name}</span>
          </React.Fragment>
        ))}
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
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