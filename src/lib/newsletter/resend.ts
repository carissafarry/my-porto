import { Resend } from 'resend'

// Validate required env var at module load
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is required')
}

const resend = new Resend(process.env.RESEND_API_KEY)

// HTML escaping utility
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (char) => map[char])
}

interface Post {
  title: string
  excerpt: string
  slug: {
    current: string
  }
  author?: {
    name: string
  }
}

export async function sendNewsletter(email: string, post: Post): Promise<boolean> {
  try {
    // Build secure base URL
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000'
    const postUrl = `${baseUrl}/blog/${post.slug.current}`

    // Escape HTML to prevent injection
    const htmlContent = `
      <h2>${escapeHtml(post.title)}</h2>
      <p>${escapeHtml(post.excerpt)}</p>
      <p><a href="${postUrl}">Read full article →</a></p>
    `

    // Get from address from env or use default
    const fromEmail = process.env.NEWSLETTER_FROM_EMAIL || 'newsletter@example.com'

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `New post: ${escapeHtml(post.title)}`,
      html: htmlContent,
    })

    return true
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error)
    return false
  }
}

export async function sendToAllSubscribers(emails: string[], post: Post): Promise<{sent: number; failed: number}> {
  // Guard: return early if no subscribers
  if (!emails || emails.length === 0) {
    console.log('No subscribers to send to')
    return { sent: 0, failed: 0 }
  }

  const results = await Promise.all(
    emails.map(email => sendNewsletter(email, post))
  )

  const sent = results.filter(r => r === true).length
  const failed = results.filter(r => r === false).length

  if (failed > 0) {
    console.warn(`Newsletter batch complete: ${sent} sent, ${failed} failed`)
  }

  return { sent, failed }
}
