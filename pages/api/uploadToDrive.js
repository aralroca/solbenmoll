import { google } from 'googleapis'
import stream from 'stream'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  const buffer = Buffer.from(req.body, 'base64')
  const body = new stream.PassThrough()
  body.end(buffer)

  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/drive'],
    credentials: JSON.parse(process.env.DRIVE_CREDENTIALS || '{}'),
  })

  const response = await google.drive({ version: 'v3', auth }).files.create({
    resource: {
      name: req.query.name + '.xlsx',
      parents: [process.env.DRIVE_FOLDER_ID],
    },
    media: {
      mimeType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      body,
    },
    fields: 'id',
  })

  res.status(response.status).send('Uploaded to Drive')
}
