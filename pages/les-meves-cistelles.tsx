import Calendar from '../components/Calendar'
import ProductWidget from '../components/ProductWidget'
import prisma from '../lib/prisma'

export async function getStaticProps() {
  const select = { id: true, name: true, price: true, menuName: true }
  const baskets = await prisma.basket.findMany({ select })
  const extras = await prisma.extra.findMany({ select })
  return { props: { baskets, extras } }
}

function MyBaskets({ baskets, extras }) {
  function scrollToCalendar() {
    const calendar = document.querySelector('#calendar')
    const position = calendar.getBoundingClientRect()
    window.scrollTo({
      top: position.top + window.scrollY - 100,
      behavior: 'smooth',
    })
  }

  return (
    <div className="content">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: 10,
        }}
      >
        <h1 style={{ margin: 0 }}>Les meves cistelles</h1>
        <button
          style={{ marginLeft: 'auto' }}
          className="button"
          onClick={scrollToCalendar}
        >
          Veure calendari
        </button>
      </div>

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
      <h2 id="calendar" style={{ marginTop: 50 }}>
        Cistelles programades en les pròximes setmanes
      </h2>
      <Calendar id="calendar" />
    </div>
  )
}

export default MyBaskets
