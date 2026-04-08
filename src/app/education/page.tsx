import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { getCoursesForUser } from '@/lib/courses'
import AITutor from '@/components/AITutor'

const prisma = new PrismaClient()

const c = {
  cream: '#F5F2EB', ink: '#141410', inkSoft: '#4a4a44', inkMuted: '#8a8a80',
  green: '#1C3D2B', greenLight: '#2d6045', greenPale: '#e8f0eb', border: '#ddd9ce',
}
const serif = 'var(--font-serif)'
const mono = 'var(--font-mono)'
const sans = 'var(--font-sans)'

export default async function EducationPage() {
  const { userId } = await auth()
  if (!userId) redirect('/sign-in')
  const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!dbUser?.onboardingComplete) redirect('/onboarding')

  const recommendedCourses = getCoursesForUser({
    experienceLevel: dbUser.experienceLevel,
    riskScore: dbUser.riskScore,
    portfolioType: dbUser.portfolioType,
  })

  const levelColor = (level: string) => {
    if (level === 'beginner') return { bg: c.greenPale, text: c.green }
    if (level === 'intermediate') return { bg: '#e8eef5', text: '#1a3a5c' }
    return { bg: '#f0ece8', text: '#4a3020' }
  }

  return (
    <div style={{ background: c.cream, color: c.ink, fontFamily: sans, fontWeight: 300, minHeight: '100vh' }}>

      {/* NAV */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', background: 'rgba(245,242,235,0.92)', backdropFilter: 'blur(12px)', borderBottom: `0.5px solid ${c.border}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/" style={{ fontFamily: serif, fontSize: '1.3rem', letterSpacing: '-0.02em', color: c.ink, textDecoration: 'none' }}>Allorca</Link>
          <nav className="hide-mobile" style={{ display: 'flex', gap: '2rem' }}>
            {[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Portfolio', href: '/portfolio' }, { label: 'Learn', href: '/education', active: true }].map(({ label, href, active }) => (
              <Link key={href} href={href} style={{ fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: active ? c.green : c.inkSoft, textDecoration: 'none', borderBottom: active ? `1px solid ${c.green}` : 'none', paddingBottom: active ? '2px' : '0' }}>{label}</Link>
            ))}
          </nav>
        </div>
        <UserButton afterSignOutUrl="/" />
      </header>

      {/* PAGE HEADER */}
      <div style={{ padding: '2.5rem 1.5rem 0', borderBottom: `0.5px solid ${c.border}` }}>
        <p style={{ fontFamily: mono, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ display: 'block', width: '16px', height: '1px', background: c.inkMuted }} />Learning path
        </p>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.75rem' }}>
          Courses for your <em style={{ fontStyle: 'italic', color: c.green }}>{dbUser.portfolioType.toLowerCase()}</em> profile
        </h1>
        <p style={{ fontFamily: mono, fontSize: '0.78rem', color: c.inkMuted, paddingBottom: '2rem' }}>Based on your {dbUser.experienceLevel} experience level</p>
      </div>

      {/* AI TUTOR */}
      <div style={{ padding: '2rem 1.5rem', borderBottom: `0.5px solid ${c.border}` }}>
        <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1.25rem' }}>AI tutor</p>
        <AITutor />
      </div>

      {/* RECOMMENDED COURSES */}
      <div style={{ padding: '2rem 1.5rem', borderBottom: `0.5px solid ${c.border}` }}>
        <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1.5rem' }}>Recommended for you</p>
        <div className="grid-2" style={{ gap: '1px', background: c.border }}>
          {recommendedCourses.slice(0, 4).map((course) => {
            const { bg, text } = levelColor(course.level)
            return (
              <Link key={course.id} href={`/education/${course.id}`} style={{ display: 'block', background: c.cream, padding: '1.75rem', textDecoration: 'none', color: c.ink }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontFamily: mono, fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: bg, color: text, padding: '0.25rem 0.6rem', borderRadius: '2px' }}>{course.level}</span>
                  <span style={{ fontFamily: mono, fontSize: '0.65rem', color: c.inkMuted }}>{course.duration}</span>
                </div>
                <h3 style={{ fontFamily: serif, fontSize: '1.15rem', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '0.6rem' }}>{course.title}</h3>
                <p style={{ fontSize: '0.85rem', color: c.inkSoft, lineHeight: 1.65, marginBottom: '1.25rem' }}>{course.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: mono, fontSize: '0.65rem', color: c.inkMuted }}>{course.lessons.length} lessons</span>
                  <span style={{ fontFamily: mono, fontSize: '0.72rem', color: c.green }}>Start →</span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ALL COURSES */}
      <div style={{ padding: '2rem 1.5rem', borderBottom: `0.5px solid ${c.border}` }}>
        <p style={{ fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '1.5rem' }}>All courses</p>
        <div className="grid-3" style={{ gap: '1px', background: c.border }}>
          {recommendedCourses.map((course) => {
            const { bg, text } = levelColor(course.level)
            return (
              <Link key={course.id} href={`/education/${course.id}`} style={{ display: 'block', background: c.cream, padding: '1.5rem', textDecoration: 'none', color: c.ink }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <span style={{ fontFamily: mono, fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', background: bg, color: text, padding: '0.2rem 0.5rem', borderRadius: '2px' }}>{course.level}</span>
                  <span style={{ fontFamily: mono, fontSize: '0.62rem', color: c.inkMuted }}>{course.duration}</span>
                </div>
                <h4 style={{ fontFamily: serif, fontSize: '1.05rem', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{course.title}</h4>
                <p style={{ fontSize: '0.82rem', color: c.inkSoft, lineHeight: 1.6, marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{course.description}</p>
                <span style={{ fontFamily: mono, fontSize: '0.65rem', color: c.green }}>View course →</span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* COMING SOON */}
      <div style={{ padding: '2rem 1.5rem' }}>
        <div style={{ background: c.greenPale, padding: '2rem', borderRadius: '2px' }}>
          <p style={{ fontFamily: serif, fontSize: '1.1rem', fontWeight: 400, color: c.green, marginBottom: '0.4rem' }}>More courses coming soon</p>
          <p style={{ fontFamily: mono, fontSize: '0.75rem', color: c.greenLight }}>We're continuously adding new content tailored to your portfolio type.</p>
        </div>
      </div>

    </div>
  )
}