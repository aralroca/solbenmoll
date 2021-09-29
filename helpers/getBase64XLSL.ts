import getWorkbookXLSL from './getWorkbookXLSL'

export default async function getBase64XLSL(data) {
  const { workbook, XLSX } = await getWorkbookXLSL(data)
  return XLSX.write(workbook, { type: 'base64' })
}
