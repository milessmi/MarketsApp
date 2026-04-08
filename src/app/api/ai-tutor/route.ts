import Anthropic from '@anthropic-ai/sdk'
import { auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const { messages, mode } = await req.json()

  const userContext = `
You are a personal finance tutor inside Allorca, an investment education platform.

Here is the user's profile:
- Portfolio Type: ${dbUser.portfolioType}
- Risk Score: ${dbUser.riskScore}/100
- Experience Level: ${dbUser.experienceLevel}
- Investment Goal: ${dbUser.investmentGoal}
- Time Horizon: ${dbUser.timeHorizon}
- Management Preference: ${dbUser.managementPreference}

Always tailor your responses to this specific user's profile. Be concise, friendly, and educational. 
Avoid jargon unless you explain it. Never give specific stock picks or financial advice — focus on education and concepts.
`

  if (mode === 'outline') {
    // Return cached roadmap if it exists
    if (dbUser.roadmapCache) {
      return NextResponse.json({ outline: dbUser.roadmapCache })
    }

    // Generate new roadmap and cache it
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: userContext,
      messages: [
        {
          role: 'user',
          content: `Generate a personalized 5-step learning roadmap for this user. 
Format it as a JSON array with exactly 5 objects, each with:
- step (number)
- title (short, 4-6 words)
- description (1-2 sentences explaining what they'll learn and why it matters for their profile)
- priority ("start here" | "recommended" | "advanced")

Return ONLY the JSON array, no markdown, no code blocks, no other text. Just the raw JSON array starting with [ and ending with ].`,
        },
      ],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    try {
      const cleaned = text.replace(/```json|```/g, '').trim()
      const outline = JSON.parse(cleaned)

      // Save to database so next load is instant
      await prisma.user.update({
        where: { clerkId: userId },
        data: { roadmapCache: outline },
      })

      return NextResponse.json({ outline })
    } catch {
      console.error('Failed to parse outline:', text)
      return NextResponse.json({ error: 'Failed to parse outline' }, { status: 500 })
    }
  }

  if (mode === 'chat') {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: userContext,
      messages,
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''
    return NextResponse.json({ reply: text })
  }

  return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })
}