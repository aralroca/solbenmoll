import Image from 'next/image'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import Anchor from '../components/Anchor'
import prisma from '../lib/prisma'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useCtx } from './_app'

export async function getStaticProps() {
  const selectB = { id: true, price: true, products: true, kg: true }
  const selectE = { id: true, price: true, kg: true }
  const orderBy = { price: 'asc' }
  const where = { available: true }
  const baskets = await prisma.basket.findMany({
    select: selectB,
    where,
    orderBy,
  } as any)
  const extras = await prisma.extra.findMany({
    select: selectE,
    where,
    orderBy,
  } as any)
  return { props: { baskets, extras } }
}

export default function Home({ baskets, extras }) {
  const { query } = useRouter()
  const { t, lang } = useTranslation('home')
  const ctx = useCtx()

  function navigateToText() {
    document.querySelector('#que-fem').scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (query.displayText) navigateToText()
  }, [query.displayText])

  return (
    <>
      <Image
        onClick={navigateToText}
        alt="Sòl Ben Moll banner"
        title={t`banner-title`}
        src={`/assets/banner-${lang}.jpg`}
        layout="responsive"
        loading="lazy"
        placeholder="blur"
        className="banner"
        height={960}
        width={1920}
      />
      <div className="content">
        <Anchor id="que-fem" />

        <h1>{t`section-1.title`}</h1>
        <p>{t`section-1.content`}</p>

        <h2>{t`section-2.title`}</h2>
        <p>{t`section-2.content`}</p>
        <p>{t`section-2.content-2`}</p>

        <h2>{t`section-3.title`}</h2>
        <p>{t`section-3.content`}</p>
        <ul>
          {baskets.map((basket) => (
            <li key={basket.id}>
              {t(`my-baskets:name-basket-${basket.id}`)}
              {` (${t('my-baskets:resume', {
                count: basket.products.length,
                kg: basket.kg,
                price: basket.price,
              })})`}
            </li>
          ))}
        </ul>
        <p>{t`section-3.content-2`}</p>
        <ul>
          {extras.map((extra) => (
            <li key={extra.id}>
              {t(`my-baskets:details-extra-${extra.id}`, extra)}
            </li>
          ))}
        </ul>
        <p>{t`section-3.content-3`}</p>

        {ctx.new && (
          <Link href="/subscripcio">
            <a style={{ textDecoration: 'none' }}>
              <div
                style={{
                  color: 'white',
                  margin: '30px auto',
                  backgroundColor: '#99b67e',
                  borderRadius: 30,
                  textAlign: 'center',
                  padding: 10,
                  width: '100%',
                  maxWidth: 250,
                }}
              >
                {t`section-3.button`}
              </div>
            </a>
          </Link>
        )}

        <h2>{t`section-4.title`}</h2>
        <p>{t`section-4.content`}</p>
      </div>
    </>
  )
}
