import Link from 'next/link'

const c = {
  cream: '#F5F2EB',
  ink: '#141410',
  inkSoft: '#4a4a44',
  inkMuted: '#8a8a80',
  green: '#1C3D2B',
  greenLight: '#2d6045',
  greenPale: '#e8f0eb',
  border: '#ddd9ce',
}

const serif = 'var(--font-serif)'
const mono = 'var(--font-mono)'
const sans = 'var(--font-sans)'

export default function Home() {
  return (
    <div style={{ background: c.cream, color: c.ink, fontFamily: sans, fontWeight: 300, overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1.25rem 1.5rem',
        background: 'rgba(245,242,235,0.88)', backdropFilter: 'blur(12px)',
        borderBottom: `0.5px solid ${c.border}`,
      }}>
        <Link href="/" style={{ fontFamily: serif, fontSize: '1.4rem', letterSpacing: '-0.02em', color: c.ink, textDecoration: 'none' }}>
          Allorca
        </Link>
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <Link href="#how" style={{ fontFamily: mono, fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: c.inkSoft, textDecoration: 'none' }}>How it works</Link>
          <Link href="/education" style={{ fontFamily: mono, fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: c.inkSoft, textDecoration: 'none' }}>Learn</Link>
          <Link href="/sign-in" style={{ fontFamily: mono, fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: c.inkSoft, textDecoration: 'none' }}>Sign in</Link>
          <Link href="/sign-up" style={{ fontFamily: mono, fontSize: '0.78rem', letterSpacing: '0.06em', textTransform: 'uppercase', background: c.green, color: c.cream, padding: '0.5rem 1.25rem', borderRadius: '2px', textDecoration: 'none' }}>Get Started</Link>
        </div>
        <Link className="hide-desktop" href="/sign-up" style={{ fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', background: c.green, color: c.cream, padding: '0.5rem 1rem', borderRadius: '2px', textDecoration: 'none' }}>Get Started</Link>
      </nav>

      {/* HERO */}
      <section className="grid-hero">
        <div className="border-right-mobile" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem 2rem 3rem', borderRight: `0.5px solid ${c.border}` }}>
          <p style={{ fontFamily: mono, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.green, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ display: 'block', width: '24px', height: '1px', background: c.green }} />
            Education-first investing
          </p>
          <h1 style={{ fontFamily: serif, fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '1.75rem', fontWeight: 400 }}>
            Invest with{' '}<em style={{ fontStyle: 'italic', color: c.green }}>intention,</em>{' '}not guesswork.
          </h1>
          <p style={{ fontSize: '1.05rem', color: c.inkSoft, maxWidth: '420px', lineHeight: 1.75, marginBottom: '2.5rem' }}>
            Allorca builds you a personalized portfolio and teaches you exactly why — so you graduate knowing how to grow your wealth.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <Link href="/sign-up" style={{ background: c.green, color: c.cream, padding: '0.85rem 2rem', fontFamily: mono, fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '2px', textDecoration: 'none', display: 'inline-block' }}>
              Start for free
            </Link>
            <Link href="#how" style={{ fontSize: '0.875rem', color: c.inkSoft, textDecoration: 'none', borderBottom: `1px solid ${c.border}`, paddingBottom: '2px' }}>
              See how it works
            </Link>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem 2rem' }}>
          <div style={{ background: c.green, padding: '2.5rem', borderRadius: '2px' }}>
            <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,242,235,0.5)', marginBottom: '1.25rem' }}>Sample portfolio — Conservative</p>
            {[{ label: 'US Bonds', pct: 40 }, { label: 'ETFs', pct: 30 }, { label: 'Div. Stocks', pct: 20 }, { label: 'Cash', pct: 10 }].map(({ label, pct }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: mono, fontSize: '0.78rem', color: 'rgba(245,242,235,0.7)', width: '80px' }}>{label}</span>
                <div style={{ flex: 1, height: '4px', background: 'rgba(245,242,235,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: '#a8d4b8', borderRadius: '2px' }} />
                </div>
                <span style={{ fontFamily: mono, fontSize: '0.75rem', color: 'rgba(245,242,235,0.6)', width: '36px', textAlign: 'right' }}>{pct}%</span>
              </div>
            ))}
            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '0.5px solid rgba(245,242,235,0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,242,235,0.4)' }}>Paper portfolio</span>
              <span style={{ fontFamily: serif, fontSize: '1.6rem', color: c.cream, letterSpacing: '-0.02em' }}>$10,000</span>
            </div>
            <p style={{ marginTop: '1rem', fontFamily: mono, fontSize: '0.7rem', color: 'rgba(245,242,235,0.3)', fontStyle: 'italic' }}>Your allocation is built from your onboarding survey.</p>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid-2" style={{ borderTop: `0.5px solid ${c.border}` }}>
        {[
          { num: '01', title: 'AI-built portfolios', body: 'Your risk profile, goals, and timeline shape a portfolio designed specifically for you — Conservative, Balanced, or Aggressive.', icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /> },
          { num: '02', title: 'Education that fits you', body: 'Lessons are curated to your portfolio type and experience level. You learn about what you own, not random finance theory.', icon: <path d="M2 20h20M4 20V10l8-6 8 6v10M10 20v-5h4v5" /> },
          { num: '03', title: 'Paper trading first', body: 'Start with a simulated $10,000 portfolio. Practice making decisions in real market conditions before any real money is involved.', icon: <><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></> },
          { num: '04', title: 'Built for students', body: 'Designed around your reality — irregular income, student loans, and a long time horizon are features, not problems to work around.', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></> },
        ].map(({ num, title, body, icon }, i) => (
          <div key={num} style={{ padding: '3rem 2rem', borderRight: i % 2 === 0 ? `0.5px solid ${c.border}` : 'none', borderBottom: i < 2 ? `0.5px solid ${c.border}` : 'none' }}>
            <span style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.12em', color: c.inkMuted, marginBottom: '1.5rem', display: 'block' }}>{num}</span>
            <div style={{ width: '36px', height: '36px', background: c.greenPale, borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <svg viewBox="0 0 24 24" width="18" height="18" stroke={c.green} fill="none" strokeWidth="1.5">{icon}</svg>
            </div>
            <h3 style={{ fontFamily: serif, fontSize: '1.25rem', fontWeight: 400, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>{title}</h3>
            <p style={{ fontSize: '0.9rem', color: c.inkSoft, lineHeight: 1.7 }}>{body}</p>
          </div>
        ))}
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="grid-how" style={{ borderTop: `0.5px solid ${c.border}` }}>
        <div className="border-right-mobile" style={{ padding: '4rem 2rem', borderRight: `0.5px solid ${c.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontFamily: mono, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ display: 'block', width: '16px', height: '1px', background: c.inkMuted }} />Process
          </p>
          <h2 style={{ fontFamily: serif, fontSize: '2.5rem', lineHeight: 1.15, letterSpacing: '-0.03em', fontWeight: 400 }}>From survey to strategy in minutes.</h2>
        </div>
        <div className="grid-2">
          {[
            { num: '01', title: 'Take the onboarding survey', body: 'Answer questions about your goals, risk comfort, and timeline. No finance background required.' },
            { num: '02', title: 'Get your portfolio type', body: 'Allorca assigns you a Conservative, Balanced, or Aggressive portfolio based on your risk score.' },
            { num: '03', title: 'Start learning', body: 'Curated lessons explain every asset class in your portfolio so you understand what you own and why.' },
            { num: '04', title: 'Paper trade with confidence', body: 'Simulate trades with $10,000 of virtual capital and watch your decisions play out.' },
          ].map(({ num, title, body }, i) => (
            <div key={num} style={{ padding: '2.5rem 2rem', borderRight: i % 2 === 0 ? `0.5px solid ${c.border}` : 'none', borderBottom: i < 2 ? `0.5px solid ${c.border}` : 'none' }}>
              <div style={{ fontFamily: serif, fontSize: '3rem', color: c.border, lineHeight: 1, marginBottom: '1rem', letterSpacing: '-0.04em' }}>{num}</div>
              <h4 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.5rem' }}>{title}</h4>
              <p style={{ fontSize: '0.875rem', color: c.inkSoft, lineHeight: 1.65 }}>{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BETA DISCLAIMER */}
      <div style={{ borderTop: `0.5px solid ${c.border}`, padding: '2rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#faf8f2', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, whiteSpace: 'nowrap' }}>Beta</span>
        <span style={{ width: '1px', height: '16px', background: c.border, display: 'block', flexShrink: 0 }} />
        <p style={{ fontFamily: mono, fontSize: '0.72rem', color: c.inkMuted, letterSpacing: '0.02em', lineHeight: 1.6 }}>
          Allorca is currently in beta. Your data is encrypted and secure. This platform is for educational purposes only — paper trading only, do not invest real money.
        </p>
      </div>

      {/* CTA STRIP */}
      <div className="cta-strip-mobile" style={{ background: c.green, padding: '4rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
        <h2 style={{ fontFamily: serif, fontSize: 'clamp(1.75rem, 4vw, 3rem)', color: c.cream, fontWeight: 400, letterSpacing: '-0.03em', maxWidth: '560px', lineHeight: 1.15 }}>
          Ready to stop guessing and start{' '}<em style={{ fontStyle: 'italic', color: '#a8d4b8' }}>growing?</em>
        </h2>
        <Link href="/sign-up" style={{ background: c.cream, color: c.green, padding: '0.9rem 2.25rem', fontFamily: mono, fontSize: '0.8rem', letterSpacing: '0.06em', textTransform: 'uppercase', borderRadius: '2px', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
          Get started free
        </Link>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: `0.5px solid ${c.border}`, padding: '2rem 1.5rem' }}>
        <div className="grid-3" style={{ gap: '2rem', marginBottom: '2rem' }}>
          <div>
            <p style={{ fontFamily: serif, fontSize: '1.1rem', color: c.ink, marginBottom: '0.75rem' }}>Allorca</p>
            <p style={{ fontSize: '0.85rem', color: c.inkMuted, lineHeight: 1.7 }}>AI-driven investment platform empowering smarter investing for everyone.</p>
          </div>
          <div>
            <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1rem' }}>Platform</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link href="/sign-up" style={{ fontSize: '0.85rem', color: c.inkSoft, textDecoration: 'none' }}>Get started</Link>
              <Link href="/sign-in" style={{ fontSize: '0.85rem', color: c.inkSoft, textDecoration: 'none' }}>Sign in</Link>
              <Link href="/education" style={{ fontSize: '0.85rem', color: c.inkSoft, textDecoration: 'none' }}>Learn</Link>
            </div>
          </div>
          <div>
            <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1rem' }}>Partnership</p>
            <p style={{ fontSize: '0.85rem', color: c.inkSoft, lineHeight: 1.7 }}>USC Stevens Center for Innovation<br />Marshall School of Business</p>
          </div>
        </div>
        <div style={{ paddingTop: '2rem', borderTop: `0.5px solid ${c.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontFamily: mono, fontSize: '0.68rem', color: c.inkMuted, letterSpacing: '0.04em' }}>Built by Miles Smith · Co founders: Vaska Wysocki · Aaniya Ahuja</p>
          <p style={{ fontFamily: mono, fontSize: '0.68rem', color: c.inkMuted }}>© {new Date().getFullYear()} Allorca</p>
        </div>
      </footer>

    </div>
  )
}