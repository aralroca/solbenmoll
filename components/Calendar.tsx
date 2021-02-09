import styles from './Calendar.module.scss'

function Calendar(props) {
  const weeks = getWeeks()

  return (
    <div className={styles.calendar} {...props}>
      {weeks.map((week) => (
        <div key={week.name} className={styles.day}>
          {week.name}
        </div>
      ))}
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

  const optionsShort = { month: 'short', day: 'numeric' }
  const monday = getMonday(date)
  const mondayName = monday.toLocaleDateString(locale, optionsShort)

  const optionsLong = { year: 'numeric', month: 'short', day: 'numeric' }
  const sunday = getSunday(date)
  const sundayName = sunday.toLocaleDateString(locale, optionsLong)

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
