import { Resend } from 'resend';

// Validate required env var at module load
if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is required');
}

const resend = new Resend(process.env.RESEND_API_KEY);

// HTML escaping utility
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

interface Post {
  title: string;
  excerpt?: string | null;
  slug: {
    current: string;
  };
  author?: {
    name: string;
  };
}

export async function sendNewsletter(
  email: string,
  post: Post
): Promise<boolean> {
  try {
    // Build secure base URL (production domain takes priority)
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000');
    const postUrl = `${baseUrl}/blog/${post.slug.current}`;

    // Escape HTML to prevent injection
    const excerptText = post.excerpt
      ? escapeHtml(post.excerpt)
      : 'New article published';
    const htmlContent = `
      <h2>${escapeHtml(post.title)}</h2>
      <p>${excerptText}</p>
      <p><a href="${postUrl}">Read full article →</a></p>
    `;

    // Get from address from env or use default
    const fromEmail =
      process.env.NEWSLETTER_FROM_EMAIL || 'newsletter@carissafarry.dev';

    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: `New post: ${escapeHtml(post.title)}`,
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error(`Failed to send email to ${email}:`, error);
    return false;
  }
}

export async function sendToAllSubscribers(
  emails: string[],
  post: Post
): Promise<{ sent: number; failed: number }> {
  // Guard: return early if no subscribers
  if (!emails || emails.length === 0) {
    console.log('No subscribers to send to');
    return { sent: 0, failed: 0 };
  }

  const results = await Promise.all(
    emails.map((email) => sendNewsletter(email, post))
  );

  const sent = results.filter((r) => r === true).length;
  const failed = results.filter((r) => r === false).length;

  if (failed > 0) {
    console.warn(`Newsletter batch complete: ${sent} sent, ${failed} failed`);
  }

  return { sent, failed };
}

export async function sendWelcomeEmail(email: string): Promise<boolean> {
  try {
    console.log('sendWelcomeEmail called for:', email);
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000');
    const fromEmail =
      process.env.NEWSLETTER_FROM_EMAIL || 'newsletter@carissafarry.dev';
    console.log('Sending from:', fromEmail, 'baseUrl:', baseUrl);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            background: linear-gradient(135deg, #fcf8ff 0%, #d9c8e6 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
          }
          .container {
            max-width: 500px;
            width: 100%;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          .avatar {
            width: 80px;
            height: 80px;
            margin: 0 auto 30px;
            font-size: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #ffa500 0%, #ff69b4 100%);
            border-radius: 50%;
          }
          h1 {
            margin: 0 0 20px 0;
            font-size: 24px;
            font-weight: 600;
            color: #1a1a1a;
          }
          p {
            margin: 15px 0;
            font-size: 16px;
            line-height: 1.6;
            color: #333;
          }
          ul {
            list-style: none;
            padding: 0;
            margin: 20px 0;
            text-align: left;
          }
          li {
            font-size: 16px;
            line-height: 1.8;
            color: #333;
            margin: 10px 0;
          }
          li:before {
            content: "✓ ";
            color: #6366f1;
            font-weight: bold;
            margin-right: 8px;
          }
          .button {
            display: inline-block;
            margin-top: 30px;
            padding: 14px 40px;
            background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: transform 0.2s;
          }
          .button:hover {
            transform: scale(1.05);
          }
          .heart {
            color: #d946ef;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="avatar">👋</div>
          <h1>Welcome!</h1>
          <p>Hi there,</p>
          <p>Thanks for subscribing to my website.</p>
          <p>This is still the beginning, and honestly, I'm still building a lot of things behind the scenes, from projects, ideas, to future content I want to share here.</p>
          <p><strong>By subscribing early, you'll be the first to know whenever there's:</strong></p>
          <ul>
            <li>new projects</li>
            <li>portfolio updates</li>
            <li>experiments & things I'm learning</li>
            <li>future blog posts and launches</li>
          </ul>
          <p>I'm really glad you're here from the start <span class="heart">🖤</span></p>
          <p>In the meantime, feel free to explore the website.</p>
          <a href="${baseUrl}" class="button">Visit Website</a>
        </div>
      </body>
      </html>
    `;

    console.log('About to send welcome email via Resend');
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Welcome to my newsletter',
      html: htmlContent,
    });
    console.log('Welcome email sent successfully to:', email);

    return true;
  } catch (error) {
    console.error(`Failed to send welcome email to ${email}:`, error);
    return false;
  }
}
