import { getData } from './downloadCSV'
import pickupPoints from '../constants/pickpoints'

const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const centerLetters = ['E', 'F', 'G', 'H']

export default async function getWorkbookXLSL(data) {
  let index = 1
  const positions = []
  const sheet = []
  const json = await getData(data)
  const XLSX = await import('xlsx-js-style')
  const workbook = XLSX.utils.book_new()

  const jsonObj = json.reduce((acc, row) => {
    if (!acc[row.PR]) acc[row.PR] = [row]
    else acc[row.PR].push(row)
    return acc
  }, {})

  Object.keys(jsonObj).forEach((PR) => {
    const position = sheet.push(['', PR, '', '', '', '', '', ''])
    sheet.push([
      '',
      'nom',
      'id',
      'excepcions',
      'Cistella',
      'Fruita',
      'Ous',
      'CP',
    ])
    const color = pickupPoints
      .find((p) => p.name === PR)
      .color.replace('#', '88')
    positions.push({ position, color })
    jsonObj[PR].forEach((row) => {
      sheet.push([
        index,
        row.nom,
        row.id,
        row.excepcions,
        row.Cistella,
        row.Fruita,
        row.Ous,
        row.CP,
      ])
      index += 1
    })
  })

  const worksheet = XLSX.utils.aoa_to_sheet(sheet)
  const font = {
    sz: 10,
    name: 'Arial',
  }

  worksheet['!cols'] = [
    { wch: 3 },
    { wch: 22 },
    {},
    { wch: 30 },
    { wch: 7 },
    { wch: 7 },
    { wch: 7 },
    { wch: 7 },
  ]

  const totalRows = json.length + Object.keys(jsonObj).length * 2

  // All cells are set to the same font
  letters.forEach((letter) => {
    for (let i = 1; i <= totalRows; i += 1) {
      const key = `${letter}${i}`
      if (!worksheet[key]) continue
      worksheet[key].s = {
        font,
        alignment: centerLetters.includes(letter)
          ? { horizontal: 'center' }
          : undefined,
      }
    }
  })

  // Set the bgcolor + bold text of the header
  positions.forEach(({ position, color }) => {
    worksheet[`B${position}`].s = {
      font: { fontSize: 10, bold: true },
      fill: { fgColor: { patternType: 'solid', rgb: color } },
    }
    letters.forEach((letter) => {
      if (letter === 'A') {
        worksheet[`A${position + 1}`].s = {
          alignment: { horizontal: 'bottom' },
        }
        return
      }
      worksheet[`${letter}${position + 1}`].s = {
        font: { ...font, bold: true },
        fill: { fgColor: { patternType: 'solid', rgb: 'FF7DA7D8' } },
        alignment: centerLetters.includes(letter)
          ? { horizontal: 'center' }
          : undefined,
      }
    })
  })

  XLSX.utils.book_append_sheet(workbook, worksheet, 'llista')

  return { workbook, XLSX }
}
