import { useRouter } from 'next/router'
import Image from 'next/image'
import prisma from '../../lib/prisma'

export async function getStaticProps({ params }) {
  const [type, id] = params.productId
  let product

  if (type === 'cistella') {
    product = await prisma.basket.findUnique({ where: { id } })
  } else {
    product = await prisma.extra.findUnique({ where: { id } })
  }

  return { props: { product } }
}

export async function getStaticPaths() {
  const baskets = await prisma.basket.findMany({ select: { id: true } })
  const extras = await prisma.extra.findMany({ select: { id: true } })
  const products = [
    ...baskets.map((p) => ['cistella', p.id]),
    ...extras.map((p) => ['extra', p.id]),
  ]

  return {
    paths: products.map((productId) => ({ params: { productId } })),
    fallback: false,
  }
}

function Product({ product }) {
  const { query } = useRouter()
  const [type, id] = query.productId as [string, string]
  const image = type === 'cistella' ? 'basket.png' : `${id}.png`

  return (
    <div className="content">
      <Image
        alt={product.name}
        src={`/assets/${image}`}
        layout="intrinsic"
        className="product-image"
        loading="lazy"
        height={375}
        width={500}
      />
      {product.menuName && <p>{product.menuName}:</p>}
      <h1>
        {product.name} ({product.kg} Kg)
      </h1>
      <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
    </div>
  )
}

export default Product
