import { auth } from '@clerk/nextjs/server'
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!dbUser) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const { symbol, name, quantity, price, action } = await req.json()

  if (!symbol || !quantity || !price || !action) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const portfolio = await prisma.portfolio.findFirst({
    where: { userId: dbUser.id, isActive: true },
    orderBy: { updatedAt: 'desc' },
    include: { positions: true },
  })

  if (!portfolio) return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 })

  const totalCost = quantity * price

  if (action === 'buy') {
    if (portfolio.totalValue < totalCost) {
      return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 })
    }

    const existingPosition = portfolio.positions.find((p) => p.symbol === symbol)

    if (existingPosition) {
      const newQty = existingPosition.quantity + quantity
      const newAvgCost =
        (existingPosition.quantity * existingPosition.averageCost + totalCost) / newQty

      await prisma.position.update({
        where: { id: existingPosition.id },
        data: {
          quantity: newQty,
          averageCost: newAvgCost,
          currentPrice: price,
        },
      })
    } else {
      await prisma.position.create({
        data: {
          portfolioId: portfolio.id,
          symbol,
          quantity,
          averageCost: price,
          currentPrice: price,
        },
      })
    }

    await prisma.portfolio.update({
      where: { id: portfolio.id },
      data: { totalValue: portfolio.totalValue - totalCost },
    })

    return NextResponse.json({ success: true, action: 'buy', symbol, quantity, price })
  }

  if (action === 'sell') {
    const existingPosition = portfolio.positions.find((p) => p.symbol === symbol)

    if (!existingPosition) {
      return NextResponse.json({ error: 'Position not found' }, { status: 404 })
    }

    if (existingPosition.quantity < quantity) {
      return NextResponse.json({ error: 'Insufficient shares' }, { status: 400 })
    }

    const newQty = existingPosition.quantity - quantity

    if (newQty === 0) {
      await prisma.position.delete({ where: { id: existingPosition.id } })
    } else {
      await prisma.position.update({
        where: { id: existingPosition.id },
        data: { quantity: newQty, currentPrice: price },
      })
    }

    await prisma.portfolio.update({
      where: { id: portfolio.id },
      data: { totalValue: portfolio.totalValue + totalCost },
    })

    return NextResponse.json({ success: true, action: 'sell', symbol, quantity, price })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}