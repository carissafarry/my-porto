// src/app/api/revalidate/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-sanity-webhook-secret');

  // Validate webhook secret (set in Sanity dashboard)
  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Revalidate blog routes on any post, author, tag, or category change
    if (body._type === 'post') {
      revalidatePath('/blog');
      revalidatePath(`/blog/${body.slug?.current}`);
    } else if (
      body._type === 'author' ||
      body._type === 'tag' ||
      body._type === 'category'
    ) {
      revalidatePath('/blog');
    }

    return NextResponse.json({ revalidated: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
