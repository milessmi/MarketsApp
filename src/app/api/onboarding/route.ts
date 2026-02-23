import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const {
      clerkId,
      email,
      riskScore,
      investmentGoal,
      timeHorizon,
      riskReaction,
      riskAttitude,
      fluctuationComfort,
      incomeStability,
      emergencyFund,
      investmentPercentage,
      experienceLevel,
      previousInvestments,
      investingMindset,
      managementPreference,
    } = body

    // Determine portfolio type based on risk score
    let portfolioType = 'BALANCED'
    if (riskScore < 35) portfolioType = 'CONSERVATIVE'
    else if (riskScore > 65) portfolioType = 'AGGRESSIVE'

    // Create or update user
    const user = await prisma.user.upsert({
      where: { clerkId },
      update: {
        investmentGoal,
        timeHorizon,
        riskReaction,
        riskAttitude,
        fluctuationComfort,
        incomeStability,
        emergencyFund,
        investmentPercentage,
        experienceLevel,
        previousInvestments,
        investingMindset,
        managementPreference,
        riskScore,
        portfolioType,
        onboardingComplete: true,
      },
      create: {
        clerkId,
        email,
        investmentGoal,
        timeHorizon,
        riskReaction,
        riskAttitude,
        fluctuationComfort,
        incomeStability,
        emergencyFund,
        investmentPercentage,
        experienceLevel,
        previousInvestments,
        investingMindset,
        managementPreference,
        riskScore,
        portfolioType,
        onboardingComplete: true,
      },
    })

    // Create initial portfolio with $10,000 paper money
    await prisma.portfolio.create({
      data: {
        userId: user.id,
        name: 'My Portfolio',
        totalValue: 10000,
        riskScore: riskScore,
      },
    })

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Failed to save onboarding data' },
      { status: 500 }
    )
  }
}