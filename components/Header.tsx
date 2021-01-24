import Image from 'next/image'

function Header() {
  return (
    <div className="p-5">
      <Image
        alt="Solbenmoll"
        src="/solbenmoll.svg"
        layout="fixed"
        width={120}
        loading="eager"
        priority
        height={61.63}
      />
    </div>
  )
}

export default Header
