import { NextRequest, NextResponse } from 'next/server'
import { getSubscribers } from '~/lib/newsletter/google-sheets'
import { sendToAllSubscribers } from '~/lib/newsletter/resend'

export async function POST(request: NextRequest) {
  try {
    // Validate webhook secret
    const secret = request.headers.get('x-newsletter-webhook-secret')
    if (secret !== process.env.NEWSLETTER_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse post data from Sanity webhook
    const body = await request.json()
    const post = {
      title: body.title,
      excerpt: body.excerpt,
      slug: body.slug,
      author: body.author,
    }

    // Fetch all subscribers
    const subscribers = await getSubscribers()
    if (subscribers.length === 0) {
      return NextResponse.json(
        { sent: 0, failed: 0, message: 'No subscribers' },
        { status: 200 }
      )
    }

    // Send to all
    const result = await sendToAllSubscribers(subscribers, post)

    console.log(`Newsletter sent: ${result.sent} success, ${result.failed} failed`)

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('Error sending newsletter:', error)
    return NextResponse.json(
      { error: 'Failed to send newsletter' },
      { status: 500 }
    )
  }
}
