import Head from 'next/head'
import { useEffect } from 'react'
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

function useSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log(
              'Service Worker registration successful with scope: ',
              registration.scope
            )
          },
          (err) => {
            console.log('Service Worker registration failed: ', err)
          }
        )
      })
    }
  }, [])
}

function MyApp({ Component, pageProps }) {
  useSW()

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
