import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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
    const postUrl = `${process.env.VERCEL_URL || 'http://localhost:3000'}/blog/${post.slug.current}`

    const htmlContent = `
      <h2>${post.title}</h2>
      <p>${post.excerpt}</p>
      <p><a href="${postUrl}">Read full article →</a></p>
    `

    await resend.emails.send({
      from: 'newsletter@example.com', // Change to your domain
      to: email,
      subject: `New post: ${post.title}`,
      html: htmlContent,
    })

    return true
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error)
    return false
  }
}

export async function sendToAllSubscribers(emails: string[], post: Post): Promise<{sent: number; failed: number}> {
  const results = await Promise.all(
    emails.map(email => sendNewsletter(email, post))
  )

  const sent = results.filter(r => r === true).length
  const failed = results.filter(r => r === false).length

  return { sent, failed }
}
