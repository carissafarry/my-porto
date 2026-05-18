import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual } from 'crypto'
import { getSubscribers } from '~/lib/newsletter/google-sheets'
import { sendToAllSubscribers } from '~/lib/newsletter/resend'

interface SanityNewsletterWebhook {
  title: string
  excerpt: string
  slug: {
    current: string
  }
  author?: {
    name: string
  }
}

function validateSecret(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false
  try {
    return timingSafeEqual(
      new Uint8Array(Buffer.from(provided)),
      new Uint8Array(Buffer.from(expected))
    )
  } catch {
    return false
  }
}

function validateTimestamp(timestamp: string | null): boolean {
  if (!timestamp) return false
  try {
    const webhookTime = new Date(timestamp).getTime()
    const now = Date.now()
    const maxAge = 5 * 60 * 1000 // 5 minutes
    return Math.abs(now - webhookTime) < maxAge
  } catch {
    return false
  }
}

function validatePayload(data: any): data is SanityNewsletterWebhook {
  return (
    data &&
    typeof data.title === 'string' &&
    data.title.trim().length > 0 &&
    typeof data.excerpt === 'string' &&
    data.excerpt.trim().length > 0 &&
    data.slug &&
    typeof data.slug.current === 'string' &&
    data.slug.current.trim().length > 0
  )
}

export async function POST(request: NextRequest) {
  try {
    // Validate webhook secret (timing-safe comparison)
    const secret = request.headers.get('x-newsletter-webhook-secret')
    if (!validateSecret(secret, process.env.NEWSLETTER_WEBHOOK_SECRET)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Validate timestamp to prevent replay attacks (if present)
    const timestamp = request.headers.get('x-sanity-webhook-timestamp')
    if (timestamp && !validateTimestamp(timestamp)) {
      return NextResponse.json(
        { error: 'Request expired or invalid timestamp' },
        { status: 401 }
      )
    }

    // Parse request body
    let body
    try {
      body = await request.json()
    } catch (parseError) {
      console.error('Invalid JSON in webhook payload:', parseError)
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    // Validate payload structure
    if (!validatePayload(body)) {
      console.error('Invalid webhook payload structure:', body)
      return NextResponse.json(
        { error: 'Missing required fields: title, excerpt, slug' },
        { status: 400 }
      )
    }

    // Type-safe post object
    const post: SanityNewsletterWebhook = body

    // Fetch all subscribers
    let subscribers: string[] = []
    try {
      subscribers = await getSubscribers()
    } catch (error) {
      console.error('Failed to fetch subscribers from Sheets:', error)
      return NextResponse.json(
        { error: 'Failed to fetch subscribers' },
        { status: 500 }
      )
    }

    if (subscribers.length === 0) {
      return NextResponse.json(
        { sent: 0, failed: 0, message: 'No subscribers' },
        { status: 200 }
      )
    }

    // Send to all subscribers
    let result
    try {
      result = await sendToAllSubscribers(subscribers, post)
    } catch (error) {
      console.error('Failed to send newsletter:', error)
      return NextResponse.json(
        { error: 'Failed to send newsletter' },
        { status: 500 }
      )
    }

    console.log(`Newsletter sent: ${result.sent} success, ${result.failed} failed`)

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Unexpected error in newsletter webhook:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
