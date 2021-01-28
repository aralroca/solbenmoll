import { useRouter } from 'next/router'

function Producte() {
  const { query } = useRouter()

  return (
    <div className="content">
      <h1>Producte</h1>
      {query.productId && <h2>{query.productId}</h2>}
      <p>en desenvolupament</p>
    </div>
  )
}

export default Producte
