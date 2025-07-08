import { NextRequest, NextResponse } from 'next/server'
import { mailerLite, MAILERLITE_GROUPS, MAILERLITE_AUTOMATIONS } from '@/lib/services/mailerlite'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Add to MailerLite with newsletter group
    await mailerLite.addSubscriberWithGroups(
      email,
      {
        source: 'footer_newsletter',
        subscribed_at: new Date().toISOString()
      },
      [MAILERLITE_GROUPS.NEWSLETTER]
    )

    // Trigger welcome automation if configured
    if (MAILERLITE_AUTOMATIONS.WELCOME) {
      await mailerLite.triggerAutomation(MAILERLITE_AUTOMATIONS.WELCOME, email)
    }

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}