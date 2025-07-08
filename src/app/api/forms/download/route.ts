import { NextRequest, NextResponse } from 'next/server'
import { convertKit, KIT_FORMS, KIT_TAGS } from '@/lib/services/convertkit'

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

    // Add to ConvertKit download form
    await convertKit.addSubscriberToForm(KIT_FORMS.DOWNLOAD, {
      email,
      fields: {
        downloaded_resource: resource,
        source: 'lead_magnet_download',
        downloaded_at: new Date().toISOString()
      }
    })

    // Tag as downloaded resource
    await convertKit.tagSubscriber(email, KIT_TAGS.DOWNLOADED_RESOURCE)

    // TODO: Trigger automation to send download link

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