import { useRouter } from 'next/router'
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

  console.log({ product })

  return (
    <div className="content">
      <h1>Producte</h1>
      {query.productId && <h2>{query.productId}</h2>}
      <p>en desenvolupament</p>
    </div>
  )
}

export default Product
