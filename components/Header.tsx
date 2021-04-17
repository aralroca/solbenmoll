import Link from 'next/link'
import dynamic from 'next/dynamic'

import BarsIcon from './Icons/Bars'
import Image from 'next/image'
import PhoneIcon from './Icons/Phone'
import LoginIcon from './Icons/Login'
import BasketIcon from './Icons/Basket'
import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useCtx } from '../pages/_app'

const Menu = dynamic(() => import('./Menu'), { ssr: false })

function Header() {
  const ctx = useCtx()
  const iconSize = 18
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useTranslation('common')

  return (
    <>
      {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
      <header className="header">
        <div className="menu-and-logo">
          <BarsIcon
            onClick={() => setMenuOpen(true)}
            title={t`menu`}
            className="bar-icon"
            width={30}
            height={30}
          />
          <Link href="/">
            <a className="logo" title={t`brand`}>
              <Image
                alt={t`brand`}
                src="/solbenmoll.svg"
                layout="fixed"
                width={95}
                loading="eager"
                priority
                height={48.79}
              />
            </a>
          </Link>
        </div>
        <nav className="icons">
          <Link href="/contacte">
            <a title={t`contact-title`}>
              <PhoneIcon width={iconSize} height={iconSize} />
            </a>
          </Link>
          {ctx.new && (
            <>
              <Link href="/inici-sessio">
                <a title={t`login`}>
                  <LoginIcon width={iconSize} height={iconSize} />
                </a>
              </Link>
              <Link href="/subscripcio">
                <a title={t`my-baskets`}>
                  <BasketIcon width={iconSize} height={iconSize} />
                </a>
              </Link>
            </>
          )}
        </nav>
      </header>
    </>
  )
}

export default Header
