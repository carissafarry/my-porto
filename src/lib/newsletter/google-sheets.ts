import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

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

  const credentialsPath = process.env.GOOGLE_SHEETS_CREDENTIALS_PATH
  if (!credentialsPath) {
    throw new Error('GOOGLE_SHEETS_CREDENTIALS_PATH not set')
  }

  const fullPath = path.resolve(credentialsPath)
  const credentials: Credentials = JSON.parse(
    fs.readFileSync(fullPath, 'utf8')
  )

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

  const timestamp = new Date().toISOString().split('T')[0] // YYYY-MM-DD

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Newsletter Subscribers!A:C',
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
      range: 'Newsletter Subscribers!A:C',
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
