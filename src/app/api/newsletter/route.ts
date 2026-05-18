import { NextRequest, NextResponse } from 'next/server';
import { appendSubscriber, isSubscribed } from '~/lib/newsletter/google-sheets';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email format
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Check if already subscribed
    const alreadySubscribed = await isSubscribed(email);
    if (alreadySubscribed) {
      return NextResponse.json(
        { success: true, message: 'You are already subscribed' },
        { status: 200 }
      );
    }

    // Save to Google Sheets
    await appendSubscriber(email);

    return NextResponse.json(
      { success: true, message: 'Email saved to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing newsletter signup:', error);
    return NextResponse.json(
      { error: 'Failed to process signup' },
      { status: 500 }
    );
  }
}
