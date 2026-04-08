'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

const c = {
  cream: '#F5F2EB', ink: '#141410', inkSoft: '#4a4a44', inkMuted: '#8a8a80',
  green: '#1C3D2B', greenLight: '#2d6045', greenPale: '#e8f0eb', border: '#ddd9ce',
}
const serif = 'var(--font-serif)'
const mono = 'var(--font-mono)'
const sans = 'var(--font-sans)'

const selectStyle = {
  width: '100%', padding: '0.85rem 1rem', fontFamily: mono, fontSize: '0.85rem',
  color: '#141410', background: 'white', border: `0.5px solid ${c.border}`,
  borderRadius: '2px', outline: 'none', appearance: 'none' as const,
}
const labelStyle = {
  display: 'block', fontFamily: mono, fontSize: '0.7rem', letterSpacing: '0.06em',
  textTransform: 'uppercase' as const, color: '#8a8a80', marginBottom: '0.6rem',
}

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    investmentGoal: '', timeHorizon: '', riskReaction: '', riskAttitude: '',
    fluctuationComfort: '', incomeStability: '', emergencyFund: '', investmentPercentage: '',
    experienceLevel: '', previousInvestments: [] as string[], investingMindset: '',
    managementPreference: '', startingAmount: 10000,
  })

  const handleSaveForLater = async () => {
    setIsSaving(true)
    const response = await fetch('/api/onboarding/save-progress', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, step, clerkId: user?.id, email: user?.emailAddresses[0]?.emailAddress }) })
    if (response.ok) router.push('/dashboard')
    setIsSaving(false)
  }

  const handleSubmit = async () => {
    const riskScore = calculateRiskScore(formData)
    const response = await fetch('/api/onboarding', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, riskScore, clerkId: user?.id, email: user?.emailAddresses[0]?.emailAddress }) })
    if (response.ok) router.push('/dashboard')
  }

  const totalSteps = 4
  const progressPct = (step / totalSteps) * 100
  const stepTitles = ['Investment Goals', 'Risk Tolerance', 'Financial Situation', 'Experience & Mindset']

  return (
    <div style={{ minHeight: '100vh', background: c.cream, fontFamily: sans, fontWeight: 300 }}>

      {/* NAV */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: `0.5px solid ${c.border}`, background: 'rgba(245,242,235,0.92)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link href="/" style={{ fontFamily: serif, fontSize: '1.3rem', letterSpacing: '-0.02em', color: c.ink, textDecoration: 'none' }}>Allorca</Link>
        <button onClick={handleSaveForLater} disabled={isSaving} style={{ fontFamily: mono, fontSize: '0.72rem', letterSpacing: '0.06em', textTransform: 'uppercase', color: c.inkMuted, background: 'none', border: 'none', cursor: 'pointer', opacity: isSaving ? 0.5 : 1 }}>
          {isSaving ? 'Saving...' : 'Save & exit'}
        </button>
      </header>

      {/* PROGRESS */}
      <div style={{ borderBottom: `0.5px solid ${c.border}` }}>
        <div style={{ height: '3px', background: c.greenPale }}>
          <div style={{ height: '100%', width: `${progressPct}%`, background: c.green, transition: 'width 0.4s ease' }} />
        </div>
        <div style={{ display: 'flex', overflowX: 'auto', padding: '0 1.5rem' }}>
          {stepTitles.map((title, i) => (
            <div key={title} style={{ flex: '0 0 auto', padding: '0.75rem 1rem 0.75rem 0', marginRight: '1rem', borderRight: i < 3 ? `0.5px solid ${c.border}` : 'none', paddingRight: '1rem' }}>
              <span style={{ fontFamily: mono, fontSize: '0.6rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: i + 1 === step ? c.green : i + 1 < step ? c.inkMuted : c.border, whiteSpace: 'nowrap' }}>
                {String(i + 1).padStart(2, '0')} {title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* FORM */}
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        <p style={{ fontFamily: mono, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: c.inkMuted, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ display: 'block', width: '16px', height: '1px', background: c.inkMuted }} />Step {step} of {totalSteps}
        </p>
        <h1 style={{ fontFamily: serif, fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '2.5rem', color: c.ink }}>{stepTitles[step - 1]}</h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {step === 1 && (<>
            <div><label style={labelStyle}>Primary investment goal</label>
              <select style={selectStyle} value={formData.investmentGoal} onChange={(e) => setFormData({ ...formData, investmentGoal: e.target.value })}>
                <option value="">Select...</option><option value="wealth">Build long-term wealth</option><option value="purchase">Save for a major purchase</option><option value="income">Generate passive income</option><option value="preserve">Preserve capital</option>
              </select></div>
            <div><label style={labelStyle}>When do you plan to use this money?</label>
              <select style={selectStyle} value={formData.timeHorizon} onChange={(e) => setFormData({ ...formData, timeHorizon: e.target.value })}>
                <option value="">Select...</option><option value="<1">Less than 1 year</option><option value="1-3">1–3 years</option><option value="3-5">3–5 years</option><option value="5+">5+ years</option>
              </select></div>
            <StepButtons step={step} setStep={setStep} canContinue={!!formData.investmentGoal && !!formData.timeHorizon} />
          </>)}

          {step === 2 && (<>
            <div><label style={labelStyle}>If your portfolio dropped 20%, you would...</label>
              <select style={selectStyle} value={formData.riskReaction} onChange={(e) => setFormData({ ...formData, riskReaction: e.target.value })}>
                <option value="">Select...</option><option value="sell-all">Sell immediately</option><option value="sell-some">Sell some</option><option value="hold">Do nothing</option><option value="buy-more">Buy more</option>
              </select></div>
            <div><label style={labelStyle}>Your attitude toward risk</label>
              <select style={selectStyle} value={formData.riskAttitude} onChange={(e) => setFormData({ ...formData, riskAttitude: e.target.value })}>
                <option value="">Select...</option><option value="avoid">I avoid risk whenever possible</option><option value="low">I prefer low risk with stable returns</option><option value="moderate">I can handle moderate ups and downs</option><option value="high">I'm comfortable with high risk for higher returns</option>
              </select></div>
            <div><label style={labelStyle}>Comfortable level of portfolio fluctuation</label>
              <select style={selectStyle} value={formData.fluctuationComfort} onChange={(e) => setFormData({ ...formData, fluctuationComfort: e.target.value })}>
                <option value="">Select...</option><option value="0-5">Very little (0–5%)</option><option value="5-15">Moderate (5–15%)</option><option value="15-30">High (15–30%)</option><option value="30+">Very high (30%+)</option>
              </select></div>
            <StepButtons step={step} setStep={setStep} canContinue={!!formData.riskReaction && !!formData.riskAttitude && !!formData.fluctuationComfort} />
          </>)}

          {step === 3 && (<>
            <div><label style={labelStyle}>Income stability</label>
              <select style={selectStyle} value={formData.incomeStability} onChange={(e) => setFormData({ ...formData, incomeStability: e.target.value })}>
                <option value="">Select...</option><option value="unstable">Very unstable</option><option value="somewhat">Somewhat stable</option><option value="stable">Stable</option><option value="very-stable">Very stable</option>
              </select></div>
            <div><label style={labelStyle}>Emergency fund (3–6 months expenses)</label>
              <select style={selectStyle} value={formData.emergencyFund} onChange={(e) => setFormData({ ...formData, emergencyFund: e.target.value })}>
                <option value="">Select...</option><option value="no">No</option><option value="partial">Partially</option><option value="yes">Yes</option>
              </select></div>
            <div><label style={labelStyle}>% of income you can invest monthly</label>
              <select style={selectStyle} value={formData.investmentPercentage} onChange={(e) => setFormData({ ...formData, investmentPercentage: e.target.value })}>
                <option value="">Select...</option><option value="<5">Less than 5%</option><option value="5-10">5–10%</option><option value="10-20">10–20%</option><option value="20+">20%+</option>
              </select></div>
            <div><label style={labelStyle}>Starting paper trading balance</label>
              <select style={selectStyle} value={formData.startingAmount} onChange={(e) => setFormData({ ...formData, startingAmount: Number(e.target.value) })}>
                <option value={100}>$100</option><option value={500}>$500</option><option value={1000}>$1,000</option><option value={2500}>$2,500</option><option value={5000}>$5,000</option><option value={10000}>$10,000 (Recommended)</option><option value={15000}>$15,000</option><option value={25000}>$25,000</option><option value={50000}>$50,000</option>
              </select>
              <p style={{ fontFamily: mono, fontSize: '0.65rem', color: c.inkMuted, marginTop: '0.4rem' }}>This is paper money for practice — not real funds</p>
            </div>
            <StepButtons step={step} setStep={setStep} canContinue={!!formData.incomeStability && !!formData.emergencyFund && !!formData.investmentPercentage && !!formData.startingAmount} />
          </>)}

          {step === 4 && (<>
            <div><label style={labelStyle}>Investing experience</label>
              <select style={selectStyle} value={formData.experienceLevel} onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}>
                <option value="">Select...</option><option value="beginner">Complete beginner</option><option value="basic">Basic knowledge (stocks/ETFs)</option><option value="intermediate">Intermediate investor</option><option value="advanced">Advanced investor</option>
              </select></div>
            <div>
              <label style={labelStyle}>Previous investments (select all that apply)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: c.border }}>
                {['Stocks', 'ETFs', 'Crypto', 'Bonds', 'Mutual Funds', 'None'].map((option) => {
                  const checked = formData.previousInvestments.includes(option)
                  return (
                    <label key={option} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 1rem', background: checked ? c.greenPale : 'white', cursor: 'pointer' }}>
                      <div style={{ width: '16px', height: '16px', border: `1.5px solid ${checked ? c.green : c.border}`, borderRadius: '2px', background: checked ? c.green : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <input type="checkbox" style={{ display: 'none' }} checked={checked} onChange={(e) => {
                        if (e.target.checked) {
                          if (option === 'None') { setFormData({ ...formData, previousInvestments: ['None'] }) }
                          else { setFormData({ ...formData, previousInvestments: [...formData.previousInvestments.filter(i => i !== 'None'), option] }) }
                        } else { setFormData({ ...formData, previousInvestments: formData.previousInvestments.filter(i => i !== option) }) }
                      }} />
                      <span style={{ fontFamily: sans, fontSize: '0.9rem', color: checked ? c.green : c.inkSoft }}>{option}</span>
                    </label>
                  )
                })}
              </div>
            </div>
            <div><label style={labelStyle}>Investing mindset</label>
              <select style={selectStyle} value={formData.investingMindset} onChange={(e) => setFormData({ ...formData, investingMindset: e.target.value })}>
                <option value="">Select...</option><option value="safety">Safety first</option><option value="balanced">Balanced growth</option><option value="aggressive">Aggressive growth</option><option value="high-risk">High-risk / high-reward</option>
              </select></div>
            <div><label style={labelStyle}>Portfolio management preference</label>
              <select style={selectStyle} value={formData.managementPreference} onChange={(e) => setFormData({ ...formData, managementPreference: e.target.value })}>
                <option value="">Select...</option><option value="automated">Fully automated</option><option value="occasional">Occasional adjustments</option><option value="active">Active management</option><option value="daily">Daily trading</option>
              </select></div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setStep(3)} style={{ flex: 1, padding: '0.9rem', fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', background: 'white', color: c.inkSoft, border: `0.5px solid ${c.border}`, borderRadius: '2px', cursor: 'pointer' }}>Back</button>
              <button onClick={handleSubmit} disabled={!formData.experienceLevel || !formData.investingMindset || !formData.managementPreference} style={{ flex: 1, padding: '0.9rem', fontFamily: mono, fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase', background: c.green, color: c.cream, border: 'none', borderRadius: '2px', cursor: 'pointer', opacity: (!formData.experienceLevel || !formData.investingMindset || !formData.managementPreference) ? 0.4 : 1 }}>Complete setup</button>
            </div>
          </>)}
        </div>
      </div>
    </div>
  )
}

function StepButtons({ step, setStep, canContinue }: { step: number; setStep: (s: number) => void; canContinue: boolean }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
      {step > 1 && <button onClick={() => setStep(step - 1)} style={{ flex: 1, padding: '0.9rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, background: 'white', color: '#4a4a44', border: '0.5px solid #ddd9ce', borderRadius: '2px', cursor: 'pointer' }}>Back</button>}
      <button onClick={() => setStep(step + 1)} disabled={!canContinue} style={{ flex: 1, padding: '0.9rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' as const, background: '#1C3D2B', color: '#F5F2EB', border: 'none', borderRadius: '2px', cursor: canContinue ? 'pointer' : 'not-allowed', opacity: canContinue ? 1 : 0.4 }}>Continue</button>
    </div>
  )
}

function calculateRiskScore(data: any): number {
  let score = 50
  if (data.riskReaction === 'sell-all') score -= 20; if (data.riskReaction === 'sell-some') score -= 10
  if (data.riskReaction === 'hold') score += 5; if (data.riskReaction === 'buy-more') score += 20
  if (data.riskAttitude === 'avoid') score -= 15; if (data.riskAttitude === 'low') score -= 5
  if (data.riskAttitude === 'moderate') score += 5; if (data.riskAttitude === 'high') score += 15
  if (data.fluctuationComfort === '0-5') score -= 10; if (data.fluctuationComfort === '5-15') score -= 5
  if (data.fluctuationComfort === '15-30') score += 5; if (data.fluctuationComfort === '30+') score += 10
  if (data.incomeStability === 'unstable') score -= 10; if (data.incomeStability === 'somewhat') score -= 5
  if (data.incomeStability === 'stable') score += 5; if (data.incomeStability === 'very-stable') score += 10
  if (data.emergencyFund === 'no') score -= 10; if (data.emergencyFund === 'partial') score -= 5; if (data.emergencyFund === 'yes') score += 5
  if (data.investmentPercentage === '<5') score -= 5; if (data.investmentPercentage === '20+') score += 5
  if (data.timeHorizon === '<1') score -= 15; if (data.timeHorizon === '1-3') score -= 5
  if (data.timeHorizon === '3-5') score += 5; if (data.timeHorizon === '5+') score += 15
  if (data.experienceLevel === 'beginner') score -= 10; if (data.experienceLevel === 'basic') score -= 5
  if (data.experienceLevel === 'intermediate') score += 5; if (data.experienceLevel === 'advanced') score += 10
  if (data.investingMindset === 'safety') score -= 15; if (data.investingMindset === 'aggressive') score += 10; if (data.investingMindset === 'high-risk') score += 15
  if (data.previousInvestments?.length > 1 && !data.previousInvestments.includes('None')) score += 5
  return Math.max(0, Math.min(100, score))
}