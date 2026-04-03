import { auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

const DISCIPLINE_PER_COMPLETION = 20

function getTier(score: number) {
  if (score >= 80) return 'Expert'
  if (score >= 60) return 'Veteran'
  if (score >= 40) return 'Investor'
  if (score >= 20) return 'Student'
  return 'Beginner'
}

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const progress = await prisma.educationProgress.findMany({
    where: { userId: dbUser.id },
  })

  return NextResponse.json({
    progress,
    disciplineScore: dbUser.disciplineScore,
    tier: getTier(dbUser.disciplineScore),
  })
}

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const { courseId, courseName, progress, completed } = await req.json()

  const existing = await prisma.educationProgress.findUnique({
    where: { userId_courseId: { userId: dbUser.id, courseId } },
  })

  // Don't re-award discipline score if already completed
  const alreadyCompleted = existing?.completed ?? false

  const record = await prisma.educationProgress.upsert({
    where: { userId_courseId: { userId: dbUser.id, courseId } },
    update: { progress, completed },
    create: { userId: dbUser.id, courseId, courseName, progress, completed },
  })

  // Award discipline score on first completion
  if (completed && !alreadyCompleted) {
    const newScore = Math.min(100, dbUser.disciplineScore + DISCIPLINE_PER_COMPLETION)
    await prisma.user.update({
      where: { id: dbUser.id },
      data: { disciplineScore: newScore },
    })

    return NextResponse.json({
      record,
      disciplineScore: newScore,
      tier: getTier(newScore),
      awardedPoints: DISCIPLINE_PER_COMPLETION,
    })
  }

  return NextResponse.json({
    record,
    disciplineScore: dbUser.disciplineScore,
    tier: getTier(dbUser.disciplineScore),
    awardedPoints: 0,
  })
}