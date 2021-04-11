import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import Calendar from '../components/Calendar'

const basketPrice = {
  petita: 10,
  mitjana: 14.5,
  gran: 20,
}

function MyBaskets({ baskets, extras }) {
  const { t } = useTranslation('my-baskets')
  const [calendar, setCalendar] = useState([])
  const [key, setKey] = useState(Date.now())
  const [editing, setEditing] = useState(undefined)

  function onAdd(sub) {
    const id = Date.now().toString(16)
    setCalendar(c => [...c, { ...sub, id }])
    setKey(Date.now())
    window.scroll({ top: 0, behavior: "smooth" })
  }

  function onEdit(sub) {
    setCalendar(c => c.map(item => item.id === editing.id ? { ...item, ...sub } : item))
    onCancelEdit()
  }

  function onClickSubscription(sub) {
    setKey(Date.now())
    setEditing(sub)
    const el = document.querySelector('#edit')
    const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scroll({ top: y, behavior: "smooth" })
  }

  function onRemove() {
    setCalendar(c => c.filter(item => item.id !== editing.id))
    onCancelEdit()
  }

  function onCancelEdit() {
    setKey(Date.now())
    setEditing(undefined)
    window.scroll({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="content">
      <Breadcrumb
        currentPageName={t`common:subscription`}
        links={[
          {
            href: '/',
            name: 'common:home',
          },
        ]}
      />
      {calendar.length ? (
        <>
          <h1 style={{ margin: 0 }}>Calendari</h1>
          <Calendar subscriptions={calendar} onClickSubscription={onClickSubscription} />
          <h2 id="edit" style={{ margin: 50 }}>{editing ? 'Editar subscripció' : 'Afegeix nova subscripció'}</h2>
        </>
      ) : (
        <h1 style={{ margin: 0 }}>{t`common:subscription`}</h1>
      )}
      <SubsForm displayCancelBtn={editing !== undefined} onRemove={onRemove} onCancel={onCancelEdit} defaultValues={editing} key={key} onFinish={editing ? onEdit : onAdd} />
    </div>
  )
}

const defaults = {
  ous: false,
  ceba: false,
  time: '1',
  point: 'yoga',
  fruita: false,
  basket: 'petita'
}

function SubsForm({ defaultValues = defaults, onFinish, onCancel, displayCancelBtn, onRemove }) {
  const [basket, setBasket] = useState(defaultValues.basket)
  const [ous, setOus] = useState(defaultValues.ous)
  const [ceba, setCeba] = useState(defaultValues.ceba)
  const [time, setTime] = useState(defaultValues.time)
  const [point, setPoint] = useState(defaultValues.point)
  const [fruita, setFruita] = useState(defaultValues.fruita)
  let price = basketPrice[basket]

  if (ous) price += 2.3
  if (ceba) price += 4.5
  if (fruita) price += 5.5

  function submit(e) {
    e.preventDefault()
    onFinish({
      ous,
      fruita,
      ceba,
      basket,
      time,
      point,
      price, // @todo remove, is calculable
    })
  }

  return (
    <form onSubmit={submit} className="subscription-form">
      <div>
        <label htmlFor="size">Mida de la cistella:</label>
        <select value={basket} onChange={e => setBasket(e.target.value)} name="size" id="size">
          <option value="petita">Petita (3 Kg)</option>
          <option value="mitjana">Mitjana (5 Kg)</option>
          <option value="gran">Gran (7 Kg)</option>
        </select>

        <label htmlFor="time">Cada quan la rebs:</label>
        <select value={time} onChange={e => setTime(e.target.value)} name="time" id="time">
          <option value="1">Setmanal</option>
          <option value="2">Cada dues setmanes</option>
          <option value="3">Cada tres setmanes</option>
          <option value="4">Mensual</option>
        </select>

        <label htmlFor="point">Punt de recollida:</label>
        <select value={point} onChange={e => setPoint(e.target.value)} id="point">
          <option value="yoga">Centre Yoga WaiWai (BCN)</option>
        </select>
      </div>
      <div>
        <label htmlFor="extra-ous">Extra ous ecologics:</label>
        <select value={ous ? 'y' : 'n'} onChange={e => setOus(e.target.value === 'y')} id="extra-ous">
          <option value="n">No</option>
          <option value="y">Si</option>
        </select>

        <label htmlFor="extra-fruita">Extra de fruita:</label>
        <select value={fruita ? 'y' : 'n'} onChange={e => setFruita(e.target.value === 'y')} id="extra-fruita">
          <option value="n">No</option>
          <option value="y">Si</option>
        </select>

        <label htmlFor="extra-ceba">Extra de ceba i patata:</label>
        <select value={ceba ? 'y' : 'n'} onChange={e => setCeba(e.target.value === 'y')} id="extra-ceba">
          <option value="n">No</option>
          <option value="y">Si</option>
        </select>
      </div>
      <div className="submit">
        <span className="price">{price} €</span>
        <button className="button">Desar canvis</button>
        {displayCancelBtn && <button style={{ marginTop: 15 }} type="button" onClick={onRemove} className="button default">Treure subscripció</button>}
        {displayCancelBtn && <button style={{ marginTop: 15 }} type="button" onClick={onCancel} className="button default">Res, ja estava bé</button>}
      </div>
    </form>
  )
}

export default MyBaskets
