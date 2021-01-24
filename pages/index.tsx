import Image from 'next/image'

export default function Home() {
  return (
    <Image
      alt="Solbenmoll banner"
      src="/assets/banner.jpg"
      layout="responsive"
      loading="eager"
      height={385}
      width={771}
      priority
    />
  )
}
