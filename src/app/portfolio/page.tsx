'use client'

import { useState, useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

interface Position {
  id: string
  symbol: string
  quantity: number
  averageCost: number
  currentPrice: number
}

interface Portfolio {
  id: string
  totalValue: number
  positions: Position[]
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null)
  const [search, setSearch] = useState('')
  const [stock, setStock] = useState<Stock | null>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [action, setAction] = useState<'buy' | 'sell'>('buy')
  const [tradeLoading, setTradeLoading] = useState(false)
  const [tradeMessage, setTradeMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPortfolio()
  }, [])

  async function fetchPortfolio() {
    const res = await fetch('/api/portfolio')
    const data = await res.json()
    setPortfolio(data.portfolio)
    setLoading(false)
  }

  async function searchStock() {
    if (!search.trim()) return
    setSearchLoading(true)
    setSearchError('')
    setStock(null)
    setTradeMessage('')

    const res = await fetch(`/api/stocks?symbol=${search.trim()}`)
    const data = await res.json()

    if (data.error) {
      setSearchError('Stock not found. Try a valid ticker like AAPL or TSLA.')
    } else {
      setStock(data)
    }
    setSearchLoading(false)
  }

  async function executeTrade() {
    if (!stock || !portfolio) return
    setTradeLoading(true)
    setTradeMessage(
  `${action === 'buy' ? 'Bought' : 'Sold'} ${quantity} share${quantity > 1 ? 's' : ''} of ${stock.symbol} at $${stock.price.toFixed(2)}`
    )
    await new Promise(resolve => setTimeout(resolve, 500))
    fetchPortfolio()

    const res = await fetch('/api/trade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        symbol: stock.symbol,
        name: stock.name,
        quantity,
        price: stock.price,
        action,
      }),
    })

    const data = await res.json()

    if (data.error) {
      setTradeMessage(data.error)
    } else {
      setTradeMessage(
        `${action === 'buy' ? 'Bought' : 'Sold'} ${quantity} share${quantity > 1 ? 's' : ''} of ${stock.symbol} at $${stock.price.toFixed(2)}`
      )
      fetchPortfolio()
    }
    setTradeLoading(false)
  }

  const totalInvested = portfolio?.positions.reduce(
    (sum, p) => sum + p.quantity * p.averageCost,
    0
  ) ?? 0

  const currentValue = portfolio?.positions.reduce(
    (sum, p) => sum + p.quantity * p.currentPrice,
    0
  ) ?? 0

  const totalPnL = currentValue - totalInvested
  const cashBalance = portfolio?.totalValue ?? 0
  const totalPortfolioValue = cashBalance + currentValue

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/dashboard">
              <h1 className="text-2xl font-bold text-white">Allorca</h1>
            </Link>
            <nav className="flex gap-4 md:gap-6 text-sm md:text-base">
              <Link href="/dashboard" className="text-gray-400 hover:text-white transition">Dashboard</Link>
              <Link href="/portfolio" className="text-green-500 font-semibold">Portfolio</Link>
              <Link href="/education" className="text-gray-400 hover:text-white transition">Learn</Link>
            </nav>
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-1">Paper Trading</h2>
          <p className="text-gray-400">Practice investing with $10,000 of virtual money</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-900 rounded-2xl animate-pulse border border-gray-800" />
            ))}
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Left Column — Search + Trade */}
            <div className="lg:col-span-2 space-y-6">

              {/* Portfolio Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5">
                  <p className="text-gray-400 text-sm mb-1">Total Value</p>
                  <p className="text-2xl font-bold text-white">${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5">
                  <p className="text-gray-400 text-sm mb-1">Cash Balance</p>
                  <p className="text-2xl font-bold text-white">${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5">
                  <p className="text-gray-400 text-sm mb-1">Unrealized P&L</p>
                  <p className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </div>
              </div>

              {/* Stock Search */}
              <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4">Search Stock</h3>
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value.toUpperCase())}
                    onKeyDown={(e) => e.key === 'Enter' && searchStock()}
                    placeholder="Enter ticker (e.g. AAPL)"
                    className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:border-green-500/50 outline-none placeholder-gray-500"
                  />
                  <button
                    onClick={searchStock}
                    disabled={searchLoading}
                    className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-xl transition disabled:opacity-40"
                  >
                    {searchLoading ? '...' : 'Search'}
                  </button>
                </div>

                {searchError && <p className="text-red-400 text-sm">{searchError}</p>}

                {stock && (
                  <div className="border border-gray-700 rounded-xl p-5 space-y-4">
                    {/* Stock Info */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-white font-bold text-xl">{stock.symbol}</h4>
                        <p className="text-gray-400 text-sm">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold text-2xl">${stock.price.toFixed(2)}</p>
                        <p className={`text-sm font-medium ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change?.toFixed(2)} ({stock.changePercent?.toFixed(2)}%)
                        </p>
                      </div>
                    </div>

                    {/* Buy/Sell Toggle */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAction('buy')}
                        className={`flex-1 py-2 rounded-lg font-semibold text-sm transition ${action === 'buy' ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                      >
                        Buy
                      </button>
                      <button
                        onClick={() => setAction('sell')}
                        className={`flex-1 py-2 rounded-lg font-semibold text-sm transition ${action === 'sell' ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                      >
                        Sell
                      </button>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-bold transition"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        min={1}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="flex-1 bg-gray-800 text-white text-center rounded-lg px-4 py-2 border border-gray-700 outline-none"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-9 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-bold transition"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>Total {action === 'buy' ? 'cost' : 'proceeds'}</span>
                      <span className="text-white font-semibold">${(quantity * stock.price).toFixed(2)}</span>
                    </div>

                    <button
                      onClick={executeTrade}
                      disabled={tradeLoading}
                      className={`w-full py-3 rounded-xl font-bold transition disabled:opacity-40 ${
                        action === 'buy'
                          ? 'bg-green-500 hover:bg-green-400 text-black'
                          : 'bg-red-500 hover:bg-red-400 text-white'
                      }`}
                    >
                      {tradeLoading ? 'Processing...' : `${action === 'buy' ? 'Buy' : 'Sell'} ${stock.symbol}`}
                    </button>

                    {tradeMessage && (
                      <p className={`text-sm text-center ${tradeMessage.includes('Bought') || tradeMessage.includes('Sold') ? 'text-green-400' : 'text-red-400'}`}>
                        {tradeMessage}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column — Holdings */}
            <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-4">Holdings</h3>
              {portfolio?.positions.length === 0 ? (
                <p className="text-gray-500 text-sm text-center mt-8">No positions yet. Search a stock and make your first trade.</p>
              ) : (
                <div className="space-y-3">
                  {portfolio?.positions.map((position) => {
                    const pnl = (position.currentPrice - position.averageCost) * position.quantity
                    const pnlPct = ((position.currentPrice - position.averageCost) / position.averageCost) * 100
                    return (
                      <div key={position.id} className="border border-gray-700 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-bold">{position.symbol}</span>
                          <span className={`text-sm font-semibold ${pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>{position.quantity} shares @ ${position.averageCost.toFixed(2)}</span>
                          <span className={pnlPct >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {pnlPct >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                          <span>Current: ${position.currentPrice.toFixed(2)}</span>
                          <span>Value: ${(position.quantity * position.currentPrice).toFixed(2)}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}