import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <div className="footer">
      <div>
        <div>
          <Link href="/">
            <a className="logo" title="Solbenmoll">
              <Image
                alt="Solbenmoll"
                src="/assets/logo-96.png"
                layout="fixed"
                width={60}
                loading="lazy"
                height={60}
              />
            </a>
          </Link>
        </div>
        <div>
          <div className="links">
            <div>
              © Sòlbenmoll 2020 - {new Date().getFullYear()} {'· '}
            </div>
            <Link href="/">
              <a>Condicions generals</a>
            </Link>
            <Link href="/">
              <a>Política de privacitat</a>
            </Link>
            <Link href="/">
              <a>Política de cookies</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
