'use client'

import { useState, useEffect } from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const c = {
  cream: '#F5F2EB', ink: '#141410', inkSoft: '#4a4a44', inkMuted: '#8a8a80',
  green: '#1C3D2B', greenLight: '#2d6045', greenPale: '#e8f0eb', border: '#ddd9ce',
  red: '#8B3A3A', redPale: '#f5eeee',
}
const serif = 'var(--font-serif)'
const mono = 'var(--font-mono)'
const sans = 'var(--font-sans)'

interface Stock { symbol: string; name: string; price: number; change: number; changePercent: number }
interface Position { id: string; symbol: string; quantity: number; averageCost: number; currentPrice: number }
interface Portfolio { id: string; totalValue: number; positions: Position[] }

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

  useEffect(() => { fetchPortfolio() }, [])

  async function fetchPortfolio() {
    const res = await fetch('/api/portfolio')
    const data = await res.json()
    setPortfolio(data.portfolio)
    setLoading(false)
  }

  async function searchStock() {
    if (!search.trim()) return
    setSearchLoading(true); setSearchError(''); setStock(null); setTradeMessage('')
    const res = await fetch(`/api/stocks?symbol=${search.trim()}`)
    const data = await res.json()
    if (data.error) { setSearchError('Stock not found. Try a valid ticker like AAPL or TSLA.') } else { setStock(data) }
    setSearchLoading(false)
  }

  async function executeTrade() {
    if (!stock || !portfolio) return
    setTradeLoading(true)
    const res = await fetch('/api/trade', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ symbol: stock.symbol, name: stock.name, quantity, price: stock.price, action }) })
    const data = await res.json()
    if (data.error) { setTradeMessage(data.error) } else { setTradeMessage(`${action === 'buy' ? 'Bought' : 'Sold'} ${quantity} share${quantity > 1 ? 's' : ''} of ${stock.symbol} at $${stock.price.toFixed(2)}`); fetchPortfolio() }
    setTradeLoading(false)
  }

  const totalInvested = portfolio?.positions.reduce((sum, p) => sum + p.quantity * p.averageCost, 0) ?? 0
  const currentValue = portfolio?.positions.reduce((sum, p) => sum + p.quantity * p.currentPrice, 0) ?? 0
  const totalPnL = currentValue - totalInvested
  const cashBalance = portfolio?.totalValue ?? 0
  const totalPortfolioValue = cashBalance + currentValue

  return (
    <div style={{ background: c.cream, color: c.ink, fontFamily: sans, fontWeight: 300, minHeight: '100vh' }}>

      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', background: 'rgba(245,242,235,0.92)', backdropFilter: 'blur(12px)', borderBottom: `0.5px solid ${c.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/" style={{ fontFamily: serif, fontSize: '1.3rem', letterSpacing: '-0.02em', color: c.ink, textDecoration: 'none' }}>Allorca</Link>
          <nav className="hide-mobile" style={{ display: 'flex', gap: '2rem' }}>
            {[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Portfolio', href: '/portfolio', active: true }, { label: 'Learn', href: '/education' }].map(({ label, href, active }) => (
              <Link key={href} href={href} style={{ fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: active ? c.green : c.inkSoft, textDecoration: 'none', borderBottom: active ? `1px solid ${c.green}` : 'none', paddingBottom: active ? '2px' : '0' }}>{label}</Link>
            ))}
          </nav>
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>

      {/* PAGE HEADER */}
      <div style={{ padding: '2.5rem 1.5rem 0', borderBottom: `0.5px solid ${c.border}` }}>
        <p style={{ fontFamily: mono, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ display: 'block', width: '16px', height: '1px', background: c.inkMuted }} />Paper trading
        </p>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1, paddingBottom: '2rem' }}>
          Your <em style={{ fontStyle: 'italic', color: c.green }}>portfolio</em>
        </h1>
      </div>

      {loading ? (
        <div className="grid-3" style={{ gap: '1px', background: c.border, padding: '0' }}>
          {[...Array(3)].map((_, i) => <div key={i} style={{ height: '120px', background: c.cream, opacity: 0.6 }} />)}
        </div>
      ) : (
        <>
          {/* STATS ROW */}
          <div className="grid-3" style={{ borderBottom: `0.5px solid ${c.border}` }}>
            {[
              { label: 'Total Value', value: `$${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, positive: true },
              { label: 'Cash Balance', value: `$${cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, positive: true },
              { label: 'Unrealized P&L', value: `${totalPnL >= 0 ? '+' : ''}$${totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, positive: totalPnL >= 0 },
            ].map(({ label, value, positive }, i) => (
              <div key={label} className="stats-border-mobile" style={{ padding: '2rem 1.5rem', borderRight: i < 2 ? `0.5px solid ${c.border}` : 'none' }}>
                <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '0.75rem' }}>{label}</p>
                <p style={{ fontFamily: serif, fontSize: '2rem', letterSpacing: '-0.04em', lineHeight: 1, color: label === 'Unrealized P&L' ? (positive ? c.green : c.red) : c.ink }}>{value}</p>
              </div>
            ))}
          </div>

          {/* MAIN GRID */}
          <div className="grid-portfolio" style={{ borderBottom: `0.5px solid ${c.border}` }}>

            {/* LEFT — Search + Trade */}
            <div className="border-right-mobile" style={{ borderRight: `0.5px solid ${c.border}` }}>
              <div style={{ padding: '1.5rem', borderBottom: `0.5px solid ${c.border}` }}>
                <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1rem' }}>Search stock</p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <input type="text" value={search} onChange={(e) => setSearch(e.target.value.toUpperCase())} onKeyDown={(e) => e.key === 'Enter' && searchStock()} placeholder="Ticker (e.g. AAPL)"
                    style={{ flex: 1, background: 'white', color: c.ink, fontFamily: mono, fontSize: '0.85rem', padding: '0.75rem 1rem', border: `0.5px solid ${c.border}`, borderRadius: '2px', outline: 'none' }} />
                  <button onClick={searchStock} disabled={searchLoading}
                    style={{ background: c.green, color: c.cream, fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '0.75rem 1.25rem', border: 'none', borderRadius: '2px', cursor: 'pointer', opacity: searchLoading ? 0.5 : 1 }}>
                    {searchLoading ? '...' : 'Search'}
                  </button>
                </div>
                {searchError && <p style={{ fontFamily: mono, fontSize: '0.72rem', color: c.red, marginTop: '0.75rem' }}>{searchError}</p>}
              </div>

              {stock && (
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: `0.5px solid ${c.border}` }}>
                    <div>
                      <p style={{ fontFamily: serif, fontSize: '1.75rem', letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>{stock.symbol}</p>
                      <p style={{ fontFamily: mono, fontSize: '0.72rem', color: c.inkMuted }}>{stock.name}</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontFamily: serif, fontSize: '1.75rem', letterSpacing: '-0.03em', marginBottom: '0.25rem' }}>${stock.price.toFixed(2)}</p>
                      <p style={{ fontFamily: mono, fontSize: '0.72rem', color: stock.change >= 0 ? c.green : c.red }}>{stock.change >= 0 ? '+' : ''}{stock.change?.toFixed(2)} ({stock.changePercent?.toFixed(2)}%)</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', marginBottom: '1.5rem', border: `0.5px solid ${c.border}`, borderRadius: '2px', overflow: 'hidden' }}>
                    {(['buy', 'sell'] as const).map((a) => (
                      <button key={a} onClick={() => setAction(a)} style={{ flex: 1, padding: '0.65rem', fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', border: 'none', cursor: 'pointer', background: action === a ? (a === 'buy' ? c.green : c.red) : 'white', color: action === a ? c.cream : c.inkMuted }}>{a}</button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ width: '36px', height: '36px', background: 'white', border: `0.5px solid ${c.border}`, borderRadius: '2px', cursor: 'pointer', fontFamily: mono, fontSize: '1rem', color: c.ink }}>−</button>
                    <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} style={{ flex: 1, textAlign: 'center', fontFamily: mono, fontSize: '0.9rem', color: c.ink, background: 'white', border: `0.5px solid ${c.border}`, borderRadius: '2px', padding: '0.5rem', outline: 'none' }} />
                    <button onClick={() => setQuantity(quantity + 1)} style={{ width: '36px', height: '36px', background: 'white', border: `0.5px solid ${c.border}`, borderRadius: '2px', cursor: 'pointer', fontFamily: mono, fontSize: '1rem', color: c.ink }}>+</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ fontFamily: mono, fontSize: '0.72rem', color: c.inkMuted }}>Total {action === 'buy' ? 'cost' : 'proceeds'}</span>
                    <span style={{ fontFamily: mono, fontSize: '0.72rem', color: c.ink, fontWeight: 500 }}>${(quantity * stock.price).toFixed(2)}</span>
                  </div>
                  <button onClick={executeTrade} disabled={tradeLoading} style={{ width: '100%', padding: '0.85rem', fontFamily: mono, fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', border: 'none', borderRadius: '2px', cursor: 'pointer', opacity: tradeLoading ? 0.5 : 1, background: action === 'buy' ? c.green : c.red, color: c.cream }}>
                    {tradeLoading ? 'Processing...' : `${action === 'buy' ? 'Buy' : 'Sell'} ${stock.symbol}`}
                  </button>
                  {tradeMessage && <p style={{ fontFamily: mono, fontSize: '0.72rem', textAlign: 'center', marginTop: '0.75rem', color: tradeMessage.includes('Bought') || tradeMessage.includes('Sold') ? c.green : c.red }}>{tradeMessage}</p>}
                </div>
              )}
              {!stock && !searchError && <div style={{ padding: '3rem', textAlign: 'center' }}><p style={{ fontFamily: mono, fontSize: '0.75rem', color: c.inkMuted }}>Search a ticker above to start trading</p></div>}
            </div>

            {/* RIGHT — Holdings */}
            <div style={{ padding: '1.5rem' }}>
              <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1.5rem' }}>Holdings</p>
              {portfolio?.positions.length === 0 ? (
                <div style={{ padding: '3rem 0', textAlign: 'center' }}><p style={{ fontFamily: mono, fontSize: '0.78rem', color: c.inkMuted, lineHeight: 1.7 }}>No positions yet.<br />Search a stock and make your first trade.</p></div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {portfolio?.positions.map((position, i) => {
                    const pnl = (position.currentPrice - position.averageCost) * position.quantity
                    const pnlPct = ((position.currentPrice - position.averageCost) / position.averageCost) * 100
                    return (
                      <div key={position.id} style={{ padding: '1.25rem 0', borderBottom: i < (portfolio?.positions.length ?? 0) - 1 ? `0.5px solid ${c.border}` : 'none' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.4rem' }}>
                          <span style={{ fontFamily: serif, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>{position.symbol}</span>
                          <span style={{ fontFamily: mono, fontSize: '0.78rem', color: pnl >= 0 ? c.green : c.red, fontWeight: 500 }}>{pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontFamily: mono, fontSize: '0.68rem', color: c.inkMuted }}>{position.quantity} shares @ ${position.averageCost.toFixed(2)}</span>
                          <span style={{ fontFamily: mono, fontSize: '0.68rem', color: pnlPct >= 0 ? c.green : c.red }}>{pnlPct >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
                          <span style={{ fontFamily: mono, fontSize: '0.65rem', color: c.inkMuted }}>Current: ${position.currentPrice.toFixed(2)}</span>
                          <span style={{ fontFamily: mono, fontSize: '0.65rem', color: c.inkMuted }}>Value: ${(position.quantity * position.currentPrice).toFixed(2)}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}