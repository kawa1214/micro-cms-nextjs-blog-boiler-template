import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

import { BlogType } from '../../../types'
import { BlogCard } from '../../../components/BlogCard'

import dayjs from 'dayjs'
import Link from 'next/link'

type Pagerops = {
    blogs: Array<BlogType>,
    page: number,
    paths: Array<string>
}

const Page: React.FC<Pagerops> = ({ blogs, page, paths }) => {
    return (
        <div className="flex justify-center bg-gray-700 px-3 md:px-10 md:py-20">
            <div className="flex flex-col ...">
                <div className="max-w-7xl md:grid md:grid-cols-3 md:gap-x-14 md:gap-y-8">
                    {blogs.map(blog => (
                        <BlogCard blog={blog} key={blog.id} />
                    ))}
                </div>
                <div className="flex justify-center pt-8 md:pt-16 pb-8 md:pb-0">
                    {paths.map(path => (
                        <Link href={path} key={path}>
                            <a className={` ${page == parseInt(path.split('/').pop()) ? 'text-white font-bold' : 'text-gray-400'} bg-gray-600  mx-3 px-4 py-2  flex flex-shrink-0 flex-col items-center justify-center rounded-lg text-base shadow-sm`}>
                                {path.split('/').pop()}
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Page

export const getStaticPaths: GetStaticPaths = async () => {
    const limit = 0
    const PER_PAGE = 9;

    const key = {
        headers: { 'X-API-KEY': process.env.API_KEY },
    };
    const res = await fetch(process.env.ENDPOINT + '/blogs?' + `limit=${limit}`, key);
    const repos = await res.json();
    const totalCount: number = repos.totalCount;

    const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blogs/page/${repo}`)

    return { paths, fallback: false };
};
const range = (start, end) =>
    [...Array(end - start + 1)].map((_, i) => start + i)

export const getStaticProps: GetStaticProps = async (ctx) => {
    const PER_PAGE = 9;
    const key = {
        headers: { 'X-API-KEY': process.env.API_KEY },
    }
    const page: number = parseInt(ctx.params.page as string);
    const res = await fetch(process.env.ENDPOINT + '/blogs' + `?offset=${(page - 1) * PER_PAGE}` + `&limit=${page * PER_PAGE}`, key)

    const data = await res.json()
    const blogs: Array<BlogType> = data.contents
    const fotmatDateBlogs: Array<BlogType> = blogs.map((blog) => {
        blog.createdAt = dayjs(blog.createdAt).format('YYYY-MM-DD')
        return blog
    })

    const paths = range(1, Math.ceil(data.totalCount / PER_PAGE)).map((repo) => `/blogs/page/${repo}`)
    return {
        props: {
            blogs: fotmatDateBlogs,
            page: page,
            paths: paths,
        },
    };
};