import { NextRequest, NextResponse } from 'next/server'
import { mailerLite, MAILERLITE_GROUPS, MAILERLITE_AUTOMATIONS } from '@/lib/services/mailerlite'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, resource } = body

    // Validate required fields
    if (!email || !resource) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Add to MailerLite with download group
    await mailerLite.addSubscriberWithGroups(
      email,
      {
        downloaded_resource: resource,
        source: 'lead_magnet_download',
        downloaded_at: new Date().toISOString()
      },
      [MAILERLITE_GROUPS.DOWNLOAD]
    )

    // Trigger download automation if configured
    if (MAILERLITE_AUTOMATIONS.DOWNLOAD_FOLLOWUP) {
      await mailerLite.triggerAutomation(MAILERLITE_AUTOMATIONS.DOWNLOAD_FOLLOWUP, email)
    }

    return NextResponse.json(
      { success: true, message: 'Download request processed' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Download form submission error:', error)
    return NextResponse.json(
      { error: 'Failed to process download request' },
      { status: 500 }
    )
  }
}