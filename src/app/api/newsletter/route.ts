import { NextRequest, NextResponse } from 'next/server';
import { appendSubscriber } from '~/lib/newsletter/google-sheets';

const emailRegex = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export async function POST(request: NextRequest) {
  // Validate method
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('Invalid JSON in request:', parseError);
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    let { email } = body;

    // Validate and normalize email
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    email = email.trim().toLowerCase();

    // Validate email format
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Try to append subscriber
    try {
      await appendSubscriber(email);
      return NextResponse.json(
        { success: true, message: 'Email saved to newsletter' },
        { status: 200 }
      );
    } catch (sheetError: any) {
      // Check if error is duplicate (append fails if email exists)
      if (
        sheetError.message?.includes('already exists') ||
        sheetError.status === 409
      ) {
        return NextResponse.json(
          { success: true, message: 'You are already subscribed' },
          { status: 200 }
        );
      }
      throw sheetError;
    }
  } catch (error) {
    console.error('Error processing newsletter signup:', error);
    return NextResponse.json(
      { error: 'Failed to process signup', code: 'INTERNAL_ERROR' },
      { status: 500 }
    );
  }
}
