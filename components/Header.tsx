import Link from 'next/link'
import dynamic from 'next/dynamic'

import BarsIcon from './Icons/Bars'
import Image from 'next/image'
import PhoneIcon from './Icons/Phone'
import LoginIcon from './Icons/Login'
import BasketIcon from './Icons/Basket'
import { useState } from 'react'

const Menu = dynamic(() => import('./Menu'), { ssr: false })

function Header() {
  const iconSize = 18
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
      <div className="header">
        <div className="menu-and-logo">
          <BarsIcon
            onClick={() => setMenuOpen(true)}
            title="Menú"
            className="bar-icon"
            width={30}
            height={30}
          />
          <Link href="/">
            <a className="logo" title="Solbenmoll">
              <Image
                alt="Solbenmoll"
                src="/solbenmoll.svg"
                layout="fixed"
                width={120}
                loading="eager"
                priority
                height={61.63}
              />
            </a>
          </Link>
        </div>
        <div className="icons">
          <Link href="/contacte">
            <a title="Contacte amb nosaltres">
              <PhoneIcon width={iconSize} height={iconSize} />
            </a>
          </Link>

          <Link href="/inici-sessio">
            <a title="Inici sessió">
              <LoginIcon width={iconSize} height={iconSize} />
            </a>
          </Link>
          <Link href="/les-meves-cistelles">
            <a title="Les meves cistelles">
              <BasketIcon width={iconSize} height={iconSize} />
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header
