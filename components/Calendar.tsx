import useTranslation from 'next-translate/useTranslation'
import calcPrice from '../helpers/calcPrice'
import styles from './Calendar.module.scss'

const defaultSubs = {
  time: undefined,
  basket: undefined,
  ous: false,
  ceba: false,
  fruita: false,
}

function Calendar({
  exceptions = {},
  subscription = defaultSubs,
  onClickSubscription = (v) => {},
  ...props
}) {
  const { t, lang } = useTranslation('my-baskets')
  const weeks = getWeeks(lang)

  return (
    <div className={styles.calendar} {...props}>
      {weeks.map((week, index) => {
        const sub = exceptions[week.name] || subscription
        const active = index % parseInt(sub.time) === 0
        return (
          <div
            key={week.name}
            title={active ? 'Editar contingut setmana' : undefined}
            onClick={() => onClickSubscription({ ...sub, week })}
            className={`${styles.day} ${active ? styles.active : ''}`}
          >
            {active ? (
              <b style={{ marginBottom: 15 }}>{week.name}</b>
            ) : (
              week.name
            )}
            {active && (
              <>
                <div>{'🥦 ' + t(`name-basket-${sub.basket}`)}</div>
                {sub.ous && <div>🥚 Ous</div>}
                {sub.fruita && <div>🍇 Fruita</div>}
                {sub.ceba && <div>🧅 Ceba i patata</div>}
                <div
                  style={{ textAlign: 'end', marginTop: 'auto' }}
                  className="price"
                >{`${calcPrice(sub)} €`}</div>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

function getMonday(d) {
  const date = new Date(d)
  date.setHours(12)
  const day = date.getDay()
  const diff = date.getDate() - day + (day == 0 ? -6 : 1)
  return new Date(date.setDate(diff))
}

function getSunday(d) {
  const date = new Date(d)
  date.setHours(12)
  const today = date.getDate()
  const dayOfTheWeek = date.getDay()
  const newDate = date.setDate(today - dayOfTheWeek + 7)
  return new Date(newDate)
}

function getWeek(date, lang) {
  const locale = `${lang}-${lang.toUpperCase()}`

  const monday = getMonday(date)
  const mondayName = monday.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
  })

  const sunday = getSunday(date)
  const sundayName = sunday.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const name = `${mondayName} - ${sundayName}`.replace(/de /g, '')

  return { monday, sunday, name }
}

function getWeeks(lang = 'ca') {
  const dayCursor = new Date()

  return Array.from({ length: 12 }).map(() => {
    const res = getWeek(dayCursor, lang)
    dayCursor.setDate(dayCursor.getDate() + 7)
    return res
  })
}

export default Calendar
