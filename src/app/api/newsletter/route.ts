import { NextRequest, NextResponse } from 'next/server';

// Simple email validation regex
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

    // TODO: In future, save to database or email service
    // For now, just validate and return success
    console.log('Newsletter signup:', email);

    return NextResponse.json(
      { success: true, message: 'Email saved successfully' },
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
