import { useState } from 'react'
import useTranslation from 'next-translate/useTranslation'

import Breadcrumb from '../components/Breadcrumb'
import Calendar from '../components/Calendar'
import Modal from '../components/Modal'
import Header from '../components/Modal/partials/Header'
import Body from '../components/Modal/partials/Body'

import calcPrice from '../helpers/calcPrice'

function MyBaskets() {
  const { t } = useTranslation('my-baskets')
  const [calendar, setCalendar] = useState(undefined)
  const [key, setKey] = useState(Date.now())
  const [exceptions, setExceptions] = useState({})
  const [editing, setEditing] = useState(undefined)

  function onAdd(sub) {
    setCalendar(sub)
    setKey(Date.now())
  }

  function onEdit(sub) {
    setExceptions((o) => ({ ...o, [editing.week.name]: sub }))
    onCancelEdit()
  }

  function onClickSubscription(sub) {
    setKey(Date.now())
    setEditing(sub)
  }

  function onCancelEdit() {
    setKey(Date.now())
    setEditing(undefined)
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
      <Modal
        defaultOpen={editing}
        key={editing}
        isFullScreen={false}
        size="large"
      >
        {() => (
          <>
            <Header>{editing.week.name}</Header>
            <Body>
              <SubsForm
                displayCancelBtn
                onCancel={onCancelEdit}
                defaultValues={editing}
                key={'editing' + key}
                onFinish={onEdit}
              />
            </Body>
          </>
        )}
      </Modal>

      {calendar ? (
        <>
          <h1 style={{ margin: 0 }}>Calendari</h1>
          <Calendar
            exceptions={exceptions}
            subscription={calendar}
            onClickSubscription={onClickSubscription}
          />
        </>
      ) : (
        <>
          <h1 style={{ margin: 0 }}>{t`common:subscription`}</h1>
          <SubsForm key={key} onFinish={onAdd} />
        </>
      )}
    </div>
  )
}

const defaults = {
  ous: false,
  ceba: false,
  time: '1',
  fruita: false,
  basket: 'petita',
}

const voidFn = (v) => {}

function SubsForm({
  defaultValues = defaults,
  onFinish = voidFn,
  onCancel = voidFn,
  displayCancelBtn = false,
}) {
  const [basket, setBasket] = useState(defaultValues.basket)
  const [ous, setOus] = useState(defaultValues.ous)
  const [ceba, setCeba] = useState(defaultValues.ceba)
  const [time, setTime] = useState(defaultValues.time)
  const [fruita, setFruita] = useState(defaultValues.fruita)
  const price = calcPrice({ basket, ous, ceba, fruita })

  function submit(e) {
    e.preventDefault()
    onFinish({
      ous,
      fruita,
      ceba,
      basket,
      time,
    })
  }

  return (
    <form onSubmit={submit} className="subscription-form">
      <div>
        <label htmlFor="size">Mida de la cistella:</label>
        <select
          value={basket}
          onChange={(e) => setBasket(e.target.value)}
          name="size"
          id="size"
        >
          <option value="petita">Petita (3 Kg)</option>
          <option value="mitjana">Mitjana (5 Kg)</option>
          <option value="gran">Gran (7 Kg)</option>
        </select>

        <label htmlFor="time">Cada quan la rebs:</label>
        <select
          value={time}
          onChange={(e) => setTime(e.target.value)}
          name="time"
          id="time"
        >
          <option value="1">Setmanal</option>
          <option value="2">Cada dues setmanes</option>
          <option value="3">Cada tres setmanes</option>
          <option value="4">Mensual</option>
        </select>
      </div>
      <div>
        <label htmlFor="extra-ous">Extra ous ecologics:</label>
        <select
          value={ous ? 'y' : 'n'}
          onChange={(e) => setOus(e.target.value === 'y')}
          id="extra-ous"
        >
          <option value="n">No</option>
          <option value="y">Si</option>
        </select>

        <label htmlFor="extra-fruita">Extra de fruita:</label>
        <select
          value={fruita ? 'y' : 'n'}
          onChange={(e) => setFruita(e.target.value === 'y')}
          id="extra-fruita"
        >
          <option value="n">No</option>
          <option value="y">Si</option>
        </select>

        <label htmlFor="extra-ceba">Extra de ceba i patata:</label>
        <select
          value={ceba ? 'y' : 'n'}
          onChange={(e) => setCeba(e.target.value === 'y')}
          id="extra-ceba"
        >
          <option value="n">No</option>
          <option value="y">Si</option>
        </select>
      </div>
      <div className="submit">
        <span className="price">{price} €</span>
        <button className="button">Desar canvis</button>
        {displayCancelBtn && (
          <button
            style={{ marginTop: 15 }}
            type="button"
            onClick={onCancel}
            className="button default"
          >
            Res, ja estava bé
          </button>
        )}
      </div>
    </form>
  )
}

export default MyBaskets
