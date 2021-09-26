import { pickUpPointsAsObj } from '../constants/pickpoints'
import exceptionsObj from '../constants/exceptions'

export function getData(usersPerPickPoint) {
  const data = []
  for (let pickPoint in usersPerPickPoint) {
    let users = usersPerPickPoint[pickPoint]
    for (let i = 0; i < users.length; i += 1) {
      const u = users[i]
      let P = ''
      let M = ''
      let G = ''

      if (u.sub.petita?.count) {
        if (u.sub.petita?.count === 1) P = 'P'
        else P = u.sub.petita?.count + 'P'
      }

      if (u.sub.mitjana?.count) {
        if (u.sub.mitjana?.count === 1) M = 'M'
        else M = u.sub.mitjana?.count + 'M'
      }

      if (u.sub.gran?.count) {
        if (u.sub.gran?.count === 1) G = 'G'
        else G = u.sub.gran?.count + 'G'
      }

      data.push({
        PR: pickUpPointsAsObj[u.puntRecollida]?.name,
        nom: u.displayName,
        id: u.id,
        excepcions: u.excepcions
          ?.map?.((k) => exceptionsObj[k].ca)
          ?.join?.(', '),
        Cistella: `${P}${M}${G}`,
        Fruita: u.sub.fruita?.count || 0,
        Ous: u.sub.ous?.count || 0,
        CP: u.sub.ceba?.count || 0,
      })
    }
  }
  return data
}

export async function dataToCSV(usersPerPickPoint) {
  const Papa = await import('papaparse')
  return Papa.unparse(getData(usersPerPickPoint))
}

export default async function downloadCSV(data, week) {
  const csv = await dataToCSV(data)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${week.name}.csv`
  link.click()
}
