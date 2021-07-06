import { LIMIT_DAY, CALENDAR_NUM_WEEKS } from '../constants/calendar'

export default function getWeeks(lang = 'ca') {
  const dayCursor = new Date()

  return Array.from({ length: CALENDAR_NUM_WEEKS }).map(() => {
    const res = getWeek(dayCursor, lang)
    dayCursor.setDate(dayCursor.getDate() + 7)
    return res
  })
}

function setTwelveOclock(date) {
  date.setHours(12)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
}

// https://stackoverflow.com/a/6117889/4467741
function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
  return [d.getUTCFullYear(), weekNo]
}

function getMonday(d) {
  const date = new Date(d)
  setTwelveOclock(date)
  const day = date.getDay()
  const diff = date.getDate() - day + (day == 0 ? -6 : 1)
  return new Date(date.setDate(diff))
}

function getSunday(d) {
  let date = new Date(d)
  setTwelveOclock(date)
  const today = date.getDate()
  const dayOfTheWeek = date.getDay()
  if (dayOfTheWeek !== 0) {
    date = new Date(date.setDate(today - dayOfTheWeek + 7))
  }
  return date
}

function isEditableWeek(monday) {
  const limitDay = new Date(monday)
  limitDay.setDate(limitDay.getDate() - (8 - LIMIT_DAY))
  limitDay.setHours(0)

  return new Date() < limitDay
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

  const isEditable = isEditableWeek(monday)
  const name = `${mondayName} - ${sundayName}`.replace(/de /g, '')
  const id = `${monday.getTime()}-${sunday.getTime()}`

  return {
    monday,
    sunday,
    name,
    id,
    isEditable,
    weekIndex: getWeekNumber(monday),
  }
}
