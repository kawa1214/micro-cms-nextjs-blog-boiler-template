import '../styles/globals.css'
import '../styles/blog_content.css'

import { Header } from './components/Header'
import { Footer } from './components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
