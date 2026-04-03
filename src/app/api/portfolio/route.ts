import { auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const portfolio = await prisma.portfolio.findFirst({
    where: { userId: dbUser.id, isActive: true },
    orderBy: { updatedAt: 'desc' },
    include: { positions: true },
  })

  return NextResponse.json({ portfolio })
}