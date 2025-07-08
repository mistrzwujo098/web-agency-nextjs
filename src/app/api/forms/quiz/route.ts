import { NextRequest, NextResponse } from 'next/server'
import { mailerLite, MAILERLITE_GROUPS, MAILERLITE_AUTOMATIONS } from '@/lib/services/mailerlite'

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

    // Determine groups based on quiz results
    const groups = [MAILERLITE_GROUPS.QUIZ]
    if (score <= 3) {
      groups.push(MAILERLITE_GROUPS.HIGH_INTENT)
    }

    // Add to MailerLite with quiz group
    await mailerLite.addSubscriberWithGroups(
      email,
      {
        quiz_score: score.toString(),
        quiz_answers: JSON.stringify(answers),
        source: 'interactive_quiz',
        completed_at: new Date().toISOString()
      },
      groups
    )

    // Trigger quiz results automation if configured
    if (MAILERLITE_AUTOMATIONS.QUIZ_RESULTS) {
      await mailerLite.triggerAutomation(MAILERLITE_AUTOMATIONS.QUIZ_RESULTS, email)
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