import Head from 'next/head'
import Header from '../components/Header'

import './layout.scss'

function Layout({ children }) {
  return (
    <div className="layout">
      <Header></Header>
      {children}
    </div>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Solbenmoll</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
