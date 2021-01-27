import Link from 'next/link'
import dynamic from 'next/dynamic'

import BarsIcon from './Icons/Bars'
import Image from 'next/image'
import PhoneIcon from './Icons/Phone'
import LoginIcon from './Icons/Login'
import CartIcon from './Icons/Cart'
import { useState } from 'react'

const Menu = dynamic(() => import('./Menu'), { ssr: false })

function Header() {
  const iconSize = 18
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="header">
      <div className="menu-and-logo">
        <BarsIcon
          onClick={() => setMenuOpen(true)}
          title="Menú"
          className="bar-icon"
          width={30}
          height={30}
        />
        {menuOpen && <Menu onClose={() => setMenuOpen(false)} />}
        <Link href="/">
          <a className="logo">
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
        <PhoneIcon width={iconSize} height={iconSize} />
        <LoginIcon width={iconSize} height={iconSize} />
        <CartIcon width={iconSize} height={iconSize} />
      </div>
    </div>
  )
}

export default Header
