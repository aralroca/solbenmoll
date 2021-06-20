export default async function downloadSubscriptions(subscriptions, title) {
  const filename = `${title}.csv`
  const Papa = await import('papaparse').then((m) => m.default)
  const csv = Papa.unparse({
    header: true,
    data: subscriptions,
  })
  const blob = new Blob([csv])
  if (window.navigator.msSaveOrOpenBlob) {
    return window.navigator.msSaveBlob(blob, filename)
  }

  const a = window.document.createElement('a')
  a.href = window.URL.createObjectURL(blob, { type: 'text/plain' })
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
