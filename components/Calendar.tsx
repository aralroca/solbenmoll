import useTranslation from 'next-translate/useTranslation'
import styles from './Calendar.module.scss'

function Calendar(props) {
  const { lang } = useTranslation()
  const weeks = getWeeks(lang)

  return (
    <div className={styles.calendar} {...props}>
      {weeks.map((week, index) => {
        const active = index % 4 === 0 // todo
        return (
          <div
            key={week.name}
            className={`${styles.day} ${active ? styles.active : ''}`}
          >
            {active ? <b>{week.name}</b> : week.name}
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
