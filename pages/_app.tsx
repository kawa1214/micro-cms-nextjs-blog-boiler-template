import { useRouter } from 'next/router'
import { useEffect } from 'react'

import '../styles/globals.css'
import '../styles/blog_content.css'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { GA_TRACKING_ID, pageview } from '../utils/tag'

import Head from 'next/head'

import { title } from '../static/general'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <Head>
        <title>{title}</title>
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
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="Description" content="Web技術のアウトプットや日常的なことまで何でも書きます。Webアプリケーション開発のお仕事もお待ちしております！"></meta>
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
    </>
  )
}

export default MyApp
