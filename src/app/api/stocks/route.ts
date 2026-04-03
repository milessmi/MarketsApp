import { NextRequest, NextResponse } from 'next/server'

const FINNHUB_KEY = process.env.FINNHUB_API_KEY

export async function GET(req: NextRequest) {
  const symbol = req.nextUrl.searchParams.get('symbol')?.toUpperCase()
  if (!symbol) return NextResponse.json({ error: 'Symbol required' }, { status: 400 })

  try {
    // Get current quote
    const quoteRes = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_KEY}`
    )
    const quote = await quoteRes.json()

    if (!quote.c || quote.c === 0) {
      return NextResponse.json({ error: 'Stock not found' }, { status: 404 })
    }

    // Get company name
    const profileRes = await fetch(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_KEY}`
    )
    const profile = await profileRes.json()

    return NextResponse.json({
      symbol,
      name: profile.name || symbol,
      price: quote.c,
      change: quote.d,
      changePercent: quote.dp,
      high: quote.h,
      low: quote.l,
      open: quote.o,
      prevClose: quote.pc,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 })
  }
}