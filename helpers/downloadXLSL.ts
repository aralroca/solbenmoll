import getWorkbookXLSL from './getWorkbookXLSL'

export default async function downloadXLSL(data, week) {
  const { workbook, XLSX } = await getWorkbookXLSL(data)
  XLSX.writeFile(workbook, `${week.name}.xlsx`)
}
