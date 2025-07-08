import { NextRequest, NextResponse } from 'next/server'
import { mailerLite, MAILERLITE_GROUPS, MAILERLITE_AUTOMATIONS } from '@/lib/services/mailerlite'

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

    // Determine groups based on intent
    const groups = [MAILERLITE_GROUPS.CONTACT]
    if (service !== 'Konsultacja') {
      groups.push(MAILERLITE_GROUPS.HIGH_INTENT)
    }

    // Add to MailerLite with contact group
    await mailerLite.addSubscriberWithGroups(
      email,
      {
        name: name,
        phone: phone,
        company: company,
        service_interest: service,
        message: message,
        source: 'contact_form',
        submitted_at: new Date().toISOString()
      },
      groups
    )

    // Trigger contact automation if configured
    if (MAILERLITE_AUTOMATIONS.CONTACT_FOLLOWUP) {
      await mailerLite.triggerAutomation(MAILERLITE_AUTOMATIONS.CONTACT_FOLLOWUP, email)
    }

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