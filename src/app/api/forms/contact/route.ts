import { NextRequest, NextResponse } from 'next/server'
import { convertKit, KIT_FORMS, KIT_TAGS } from '@/lib/services/convertkit'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message } = body

    // Validate required fields
    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Add to ConvertKit
    await convertKit.addSubscriberToForm(KIT_FORMS.CONTACT, {
      email,
      first_name: name,
      fields: {
        phone,
        company,
        service_interest: service,
        message,
        source: 'contact_form',
        submitted_at: new Date().toISOString()
      }
    })

    // Tag as contacted and potentially high intent
    await convertKit.tagSubscriber(email, KIT_TAGS.CONTACTED)
    
    // If they're asking about specific services, tag as high intent
    if (service !== 'Konsultacja') {
      await convertKit.tagSubscriber(email, KIT_TAGS.HIGH_INTENT)
    }

    // TODO: Send notification email to team
    // TODO: Send confirmation email to user

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}