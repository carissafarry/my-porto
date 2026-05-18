import { google } from 'googleapis'

interface Credentials {
  type: string
  project_id: string
  private_key: string
  client_email: string
  [key: string]: any
}

let sheetsClient: any = null

function getAuthClient() {
  if (sheetsClient) return sheetsClient

  const credentialsBase64 = process.env.GOOGLE_SHEETS_CREDENTIALS
  if (!credentialsBase64) {
    throw new Error('GOOGLE_SHEETS_CREDENTIALS not set')
  }

  let credentials: Credentials
  try {
    const credentialsJson = Buffer.from(credentialsBase64, 'base64').toString('utf8')
    credentials = JSON.parse(credentialsJson)
  } catch (error) {
    throw new Error('Failed to decode GOOGLE_SHEETS_CREDENTIALS: invalid base64 or JSON')
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  sheetsClient = google.sheets({ version: 'v4', auth })
  return sheetsClient
}

export async function appendSubscriber(email: string): Promise<void> {
  const sheets = getAuthClient()
  const sheetId = process.env.GOOGLE_SHEETS_ID

  if (!sheetId) {
    throw new Error('GOOGLE_SHEETS_ID not set')
  }

  // Convert to GMT+7 timezone with format dd-mm-yyyy hh:mm:ss
  const now = new Date()
  const gmtPlus7 = new Date(now.getTime() + 7 * 60 * 60 * 1000)
  const year = gmtPlus7.getUTCFullYear()
  const month = String(gmtPlus7.getUTCMonth() + 1).padStart(2, '0')
  const date = String(gmtPlus7.getUTCDate()).padStart(2, '0')
  const hours = String(gmtPlus7.getUTCHours()).padStart(2, '0')
  const minutes = String(gmtPlus7.getUTCMinutes()).padStart(2, '0')
  const seconds = String(gmtPlus7.getUTCSeconds()).padStart(2, '0')
  const timestamp = `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "A:C",
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[email, timestamp, 'active']],
      },
    })
  } catch (error) {
    console.error('Error appending to Google Sheets:', error)
    throw new Error('Failed to save email to newsletter')
  }
}

export async function getSubscribers(): Promise<string[]> {
  const sheets = getAuthClient()
  const sheetId = process.env.GOOGLE_SHEETS_ID

  if (!sheetId) {
    throw new Error('GOOGLE_SHEETS_ID not set')
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "A:C",
    })

    const rows = response.data.values || []
    if (rows.length === 0) return []

    // Skip header row, filter active subscribers
    const emails: string[] = []
    for (let i = 1; i < rows.length; i++) {
      const [email, , status] = rows[i]
      if (email && status === 'active') {
        emails.push(email)
      }
    }

    return emails
  } catch (error) {
    console.error('Error fetching subscribers from Google Sheets:', error)
    throw new Error('Failed to fetch subscribers')
  }
}

export async function isSubscribed(email: string): Promise<boolean> {
  const subscribers = await getSubscribers()
  return subscribers.includes(email)
}
