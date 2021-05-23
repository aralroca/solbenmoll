import Image from 'next/image'
import { useEffect } from 'react'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'

import Anchor from '../components/Anchor'
import Center from '../components/Center'
import PickUpPointsMap from '../components/PickUpPointsMap'
import products from '../constants/products'

export default function Home() {
  const { query } = useRouter()
  const { t, lang } = useTranslation('common')
  const prods = Object.keys(products).map((id) => ({ id, ...products[id] }))
  const baskets = prods.filter((p) => p.isBasket)
  const extras = prods.filter((p) => !p.isBasket)

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
        title={t`home-content.banner-title`}
        src={`/assets/banner-${lang}.jpg`}
        layout="responsive"
        loading="lazy"
        placeholder="blur"
        className="banner"
        height={569}
        width={1400}
      />
      <div className="content">
        <Anchor id="que-fem" />

        <h1>{t`home-content.section-1.title`}</h1>
        <p>{t`home-content.section-1.content`}</p>

        <Center>
          <Image
            layout="fixed"
            loading="lazy"
            src="/assets/qui-som.png"
            width={250}
            height={169}
          />
        </Center>

        <h2>{t`home-content.section-2.title`}</h2>
        <p>{t`home-content.section-2.content`}</p>
        <p>{t`home-content.section-2.content-2`}</p>

        <h2>{t`home-content.section-3.title`}</h2>
        <p>{t`home-content.section-3.content`}</p>
        <ul>
          {baskets.map((basket) => (
            <li key={basket.id}>
              {t(`product-${basket.id}`)}
              {` (${t('resume', {
                count: basket.numProducts,
                kg: basket.kg,
                price: basket.price,
              })})`}
            </li>
          ))}
        </ul>
        <p>{t`home-content.section-3.content-2`}</p>
        <ul>
          {extras.map((extra) => (
            <li key={extra.id}>{t(`details-extra-${extra.id}`, extra)}</li>
          ))}
        </ul>
        <p>{t`home-content.section-3.content-3`}</p>

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
              {t`home-content.section-3.button`}
            </div>
          </a>
        </Link>

        <h2>{t`home-content.section-4.title`}</h2>
        <p>{t`home-content.section-4.content`}</p>
        <PickUpPointsMap />
      </div>
    </>
  )
}
