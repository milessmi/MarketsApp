import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const { clerkId, email, step, ...surveyData } = body

    // Save partial progress (without completing onboarding)
    await prisma.user.upsert({
      where: { clerkId },
      update: {
        ...surveyData,
        onboardingComplete: false, // Not finished yet
      },
      create: {
        clerkId,
        email,
        ...surveyData,
        onboardingComplete: false,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Save progress error:', error)
    return NextResponse.json(
      { error: 'Failed to save progress' },
      { status: 500 }
    )
  }
}