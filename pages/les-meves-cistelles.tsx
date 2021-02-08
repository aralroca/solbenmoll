import ProductWidget from '../components/ProductWidget'
import prisma from '../lib/prisma'

export async function getStaticProps() {
  const select = { id: true, name: true, price: true, menuName: true }
  const baskets = await prisma.basket.findMany({ select })
  const extras = await prisma.extra.findMany({ select })
  return { props: { baskets, extras } }
}

function CalendarOfProducts({ baskets, extras }) {
  return (
    <div className="content">
      <h1>Les meves cistelles</h1>
      <div className="my-baskets">
        {baskets.map((basket) => (
          <ProductWidget
            image="/assets/basket.png"
            key={basket.id}
            link={`/producte/cistella/${basket.id}`}
            menuName={basket.menuName}
            name={basket.name}
            price={basket.price}
          />
        ))}
        {extras.map((extra) => (
          <ProductWidget
            image={`/assets/${extra.id}.png`}
            key={extra.id}
            link={`/producte/extra/${extra.id}`}
            menuName={extra.menuName}
            name={extra.name}
            price={extra.price}
          />
        ))}
      </div>
    </div>
  )
}

export default CalendarOfProducts
