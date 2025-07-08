import { NextRequest, NextResponse } from 'next/server'
import { convertKit, KIT_FORMS, KIT_TAGS } from '@/lib/services/convertkit'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, score, answers } = body

    // Validate required fields
    if (!email || score === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Add to ConvertKit quiz form
    await convertKit.addSubscriberToForm(KIT_FORMS.QUIZ, {
      email,
      fields: {
        quiz_score: score,
        quiz_answers: JSON.stringify(answers),
        source: 'interactive_quiz',
        completed_at: new Date().toISOString()
      }
    })

    // Tag based on quiz results
    await convertKit.tagSubscriber(email, KIT_TAGS.QUIZ_COMPLETED)
    
    // If score is low (needs help), tag as high intent
    if (score <= 3) {
      await convertKit.tagSubscriber(email, KIT_TAGS.HIGH_INTENT)
    }

    return NextResponse.json(
      { success: true, message: 'Quiz results saved' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Quiz submission error:', error)
    return NextResponse.json(
      { error: 'Failed to save quiz results' },
      { status: 500 }
    )
  }
}