import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const prisma = new PrismaClient()

const c = {
  cream: '#F5F2EB', ink: '#141410', inkSoft: '#4a4a44', inkMuted: '#8a8a80',
  green: '#1C3D2B', greenLight: '#2d6045', greenPale: '#e8f0eb', border: '#ddd9ce',
}
const serif = 'var(--font-serif)'
const mono = 'var(--font-mono)'
const sans = 'var(--font-sans)'

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()
  if (!userId) redirect('/sign-in')

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { portfolios: { where: { isActive: true }, include: { positions: true } } },
  })
  if (!dbUser?.onboardingComplete) redirect('/onboarding')

  const portfolio = dbUser.portfolios[0]
  const portfolioLabel = dbUser.riskScore < 35 ? 'Conservative' : dbUser.riskScore > 65 ? 'Aggressive' : 'Balanced'

  return (
    <div style={{ background: c.cream, color: c.ink, fontFamily: sans, fontWeight: 300, minHeight: '100vh' }}>

      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', background: 'rgba(245,242,235,0.92)', backdropFilter: 'blur(12px)', borderBottom: `0.5px solid ${c.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/" style={{ fontFamily: serif, fontSize: '1.3rem', letterSpacing: '-0.02em', color: c.ink, textDecoration: 'none' }}>Allorca</Link>
          <nav className="hide-mobile" style={{ display: 'flex', gap: '2rem' }}>
            {[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Portfolio', href: '/portfolio' }, { label: 'Learn', href: '/education' }].map(({ label, href }) => (
              <Link key={href} href={href} style={{ fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: c.inkSoft, textDecoration: 'none' }}>{label}</Link>
            ))}
          </nav>
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>

      {/* PAGE HEADER */}
      <div style={{ padding: '2.5rem 1.5rem 0', borderBottom: `0.5px solid ${c.border}` }}>
        <p style={{ fontFamily: mono, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ display: 'block', width: '16px', height: '1px', background: c.inkMuted }} />Overview
        </p>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1, paddingBottom: '2rem' }}>
          Welcome back, <em style={{ fontStyle: 'italic', color: c.green }}>{user?.firstName || 'Investor'}</em>
        </h1>
      </div>

      {/* STATS ROW */}
      <div className="grid-3" style={{ borderBottom: `0.5px solid ${c.border}` }}>
        {[
          { label: 'Portfolio Value', value: `$${portfolio?.totalValue.toLocaleString() || '10,000'}`, sub: 'Paper trading' },
          { label: 'Risk Score', value: `${dbUser.riskScore}/100`, sub: portfolioLabel },
          { label: 'Discipline Score', value: `${dbUser.disciplineScore}/100`, sub: 'Building habits' },
        ].map(({ label, value, sub }, i) => (
          <div key={label} className="stats-border-mobile" style={{ padding: '2rem 1.5rem', borderRight: i < 2 ? `0.5px solid ${c.border}` : 'none' }}>
            <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '0.75rem' }}>{label}</p>
            <p style={{ fontFamily: serif, fontSize: '2.5rem', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '0.5rem' }}>{value}</p>
            <p style={{ fontFamily: mono, fontSize: '0.72rem', color: c.green, letterSpacing: '0.04em' }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* PORTFOLIO TYPE + DETAILS */}
      <div className="grid-2" style={{ borderBottom: `0.5px solid ${c.border}` }}>
        <div className="border-right-mobile" style={{ padding: '2rem 1.5rem', borderRight: `0.5px solid ${c.border}` }}>
          <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1.5rem' }}>Your portfolio</p>
          <div style={{ background: c.green, padding: '2rem', borderRadius: '2px', marginBottom: '1.5rem' }}>
            <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,242,235,0.5)', marginBottom: '0.5rem' }}>Type</p>
            <p style={{ fontFamily: serif, fontSize: '2rem', color: c.cream, letterSpacing: '-0.03em', marginBottom: '1rem' }}>{dbUser.portfolioType}</p>
            <p style={{ fontFamily: mono, fontSize: '0.78rem', color: 'rgba(245,242,235,0.6)', lineHeight: 1.6 }}>
              Based on your survey responses, we've built you a {dbUser.portfolioType.toLowerCase()} strategy tailored to your goals.
            </p>
          </div>
          <Link href="/portfolio" style={{ display: 'inline-block', fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: c.green, textDecoration: 'none', borderBottom: `1px solid ${c.greenPale}`, paddingBottom: '2px' }}>
            View full portfolio →
          </Link>
        </div>
        <div style={{ padding: '2rem 1.5rem' }}>
          <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1.5rem' }}>Profile details</p>
          <div className="grid-2">
            {[
              { label: 'Investment Goal', value: formatGoal(dbUser.investmentGoal) },
              { label: 'Time Horizon', value: dbUser.timeHorizon ?? 'Not set' },
              { label: 'Experience Level', value: capitalize(dbUser.experienceLevel) },
              { label: 'Management Style', value: capitalize(dbUser.managementPreference) },
            ].map(({ label, value }, i) => (
              <div key={label} style={{ padding: '1.25rem', borderRight: i % 2 === 0 ? `0.5px solid ${c.border}` : 'none', borderBottom: i < 2 ? `0.5px solid ${c.border}` : 'none' }}>
                <p style={{ fontFamily: mono, fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '0.4rem' }}>{label}</p>
                <p style={{ fontSize: '0.9rem', color: c.ink, fontWeight: 400 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK LINKS */}
      <div className="grid-2">
        <Link href="/education" style={{ display: 'block', padding: '2rem 1.5rem', textDecoration: 'none', color: c.ink, borderRight: `0.5px solid ${c.border}` }}>
          <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '0.75rem' }}>Next up</p>
          <p style={{ fontFamily: serif, fontSize: '1.3rem', fontWeight: 400, marginBottom: '0.4rem' }}>Continue learning</p>
          <p style={{ fontFamily: mono, fontSize: '0.75rem', color: c.inkSoft }}>Your curated lessons are ready →</p>
        </Link>
        <Link href="/portfolio" style={{ display: 'block', padding: '2rem 1.5rem', textDecoration: 'none', color: c.ink }}>
          <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '0.75rem' }}>Paper trading</p>
          <p style={{ fontFamily: serif, fontSize: '1.3rem', fontWeight: 400, marginBottom: '0.4rem' }}>View your portfolio</p>
          <p style={{ fontFamily: mono, fontSize: '0.75rem', color: c.inkSoft }}>Track positions and performance →</p>
        </Link>
      </div>

    </div>
  )
}

function formatGoal(goal: string | null): string {
  if (!goal) return 'Not set'
  const goals: Record<string, string> = { wealth: 'Build long-term wealth', purchase: 'Save for major purchase', income: 'Generate passive income', preserve: 'Preserve capital' }
  return goals[goal] || goal
}

function capitalize(str: string | null): string {
  if (!str) return 'Not set'
  return str.charAt(0).toUpperCase() + str.slice(1)
}