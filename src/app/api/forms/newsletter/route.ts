import { NextRequest, NextResponse } from 'next/server'
import { convertKit, KIT_FORMS, KIT_TAGS } from '@/lib/services/convertkit'

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

    // Add to ConvertKit newsletter form
    await convertKit.addSubscriberToForm(KIT_FORMS.NEWSLETTER, {
      email,
      fields: {
        source: 'footer_newsletter',
        subscribed_at: new Date().toISOString()
      }
    })

    // Tag as newsletter subscriber
    await convertKit.tagSubscriber(email, KIT_TAGS.NEWSLETTER_SUBSCRIBER)

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