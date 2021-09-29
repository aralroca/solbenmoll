import { google } from 'googleapis'
import stream from 'stream'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  try {
    const buffer = Buffer.from(req.body, 'base64')
    const body = new stream.PassThrough()
    body.end(buffer)

    const credentials = typeof process.env.DRIVE_CREDENTIALS === 'string' ?
      JSON.parse(process.env.DRIVE_CREDENTIALS) : process.env.DRIVE_CREDENTIALS

    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/drive'],
      credentials,
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
  } catch (error) {
    res.status(500).send(error.message)
  }
}
