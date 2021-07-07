import { pickUpPointsAsObj } from '../constants/pickpoints'
import exceptionsObj from '../constants/exceptions'

async function dataToCSV(usersPerPickPoint) {
  const Papa = await import('papaparse')
  const data = []
  for (let pickPoint in usersPerPickPoint) {
    let users = usersPerPickPoint[pickPoint]
    for (let i = 0; i < users.length; i += 1) {
      const u = users[i]
      data.push({
        'Id Usuari': u.id,
        Nom: u.displayName,
        Email: u.email,
        'Punt Recollida': pickUpPointsAsObj[u.puntRecollida]?.name,
        Excepcions: u.excepcions
          ?.map?.((k) => exceptionsObj[k].ca)
          ?.join?.(', '),
        Petita: u.sub.petita?.count || 0,
        Mitjana: u.sub.mitjana?.count || 0,
        Gran: u.sub.gran?.count || 0,
        Ous: u.sub.ous?.count || 0,
        'Patata i Ceba': u.sub.ceba?.count || 0,
        Fruita: u.sub.fruita?.count || 0,
      })
    }
  }
  return Papa.unparse(data)
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
