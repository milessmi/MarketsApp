'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    investmentGoal: '',
    timeHorizon: '',
    riskReaction: '',
    riskAttitude: '',
    fluctuationComfort: '',
    incomeStability: '',
    emergencyFund: '',
    investmentPercentage: '',
    experienceLevel: '',
    previousInvestments: [] as string[],
    investingMindset: '',
    managementPreference: '',
  })

  const handleSaveForLater = async () => {
    setIsSaving(true)
    
    // Save partial progress to database
    const response = await fetch('/api/onboarding/save-progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        step,
        clerkId: user?.id,
        email: user?.emailAddresses[0]?.emailAddress,
      }),
    })

    if (response.ok) {
      router.push('/dashboard')
    }
    setIsSaving(false)
  }

  const handleSubmit = async () => {
    const riskScore = calculateRiskScore(formData)
    
    const response = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        riskScore,
        clerkId: user?.id,
        email: user?.emailAddresses[0]?.emailAddress,
      }),
    })

    if (response.ok) {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header with Save & Exit */}
        <div className="flex justify-between items-center mb-8">
          <Link href="/dashboard" className="text-gray-400 hover:text-white transition">
            ← Back to Dashboard
          </Link>
          <button
            onClick={handleSaveForLater}
            disabled={isSaving}
            className="text-gray-400 hover:text-green-500 transition disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save & Exit'}
          </button>
        </div>

        <div className="bg-gray-900 border border-green-500/20 rounded-xl p-8 shadow-2xl">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Step {step} of 4</span>
              <span>{Math.round((step / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-2 text-white">Welcome to Allorca!</h1>
          <p className="text-gray-400 mb-8">
            Let's personalize your investment experience
          </p>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Investment Goals</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  What is your primary investment goal?
                </label>
                <select
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  value={formData.investmentGoal}
                  onChange={(e) => setFormData({...formData, investmentGoal: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="wealth">Build long-term wealth</option>
                  <option value="purchase">Save for a major purchase</option>
                  <option value="income">Generate passive income</option>
                  <option value="preserve">Preserve capital</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  When do you plan to use this money?
                </label>
                <select
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  value={formData.timeHorizon}
                  onChange={(e) => setFormData({...formData, timeHorizon: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="<1">Less than 1 year</option>
                  <option value="1-3">1–3 years</option>
                  <option value="3-5">3–5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.investmentGoal || !formData.timeHorizon}
                className="w-full bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed transition"
              >
                Continue
              </button>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Risk Tolerance</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  How would you react if your investment dropped 20% in a year?
                </label>
                <select
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  value={formData.riskReaction}
                  onChange={(e) => setFormData({...formData, riskReaction: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="sell-all">Sell immediately</option>
                  <option value="sell-some">Sell some</option>
                  <option value="hold">Do nothing</option>
                  <option value="buy-more">Buy more</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Which statement best describes your attitude toward risk?
                </label>
                <select
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  value={formData.riskAttitude}
                  onChange={(e) => setFormData({...formData, riskAttitude: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="avoid">I avoid risk whenever possible</option>
                  <option value="low">I prefer low risk with stable returns</option>
                  <option value="moderate">I can handle moderate ups and downs</option>
                  <option value="high">I'm comfortable with high risk for higher returns</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  What level of fluctuation are you comfortable with?
                </label>
                <select
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  value={formData.fluctuationComfort}
                  onChange={(e) => setFormData({...formData, fluctuationComfort: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="0-5">Very little (0–5%)</option>
                  <option value="5-15">Moderate (5–15%)</option>
                  <option value="15-30">High (15–30%)</option>
                  <option value="30+">Very high (30%+)</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 border border-gray-700 transition"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.riskReaction || !formData.riskAttitude || !formData.fluctuationComfort}
                  className="flex-1 bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-500 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Financial Situation</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  How stable is your income?
                </label>
                <select
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  value={formData.incomeStability}
                  onChange={(e) => setFormData({...formData, incomeStability: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="unstable">Very unstable</option>
                  <option value="somewhat">Somewhat stable</option>
                  <option value="stable">Stable</option>
                  <option value="very-stable">Very stable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Do you have an emergency fund (3–6 months expenses)?
                </label>
                <select
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  value={formData.emergencyFund}
                  onChange={(e) => setFormData({...formData, emergencyFund: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="no">No</option>
                  <option value="partial">Partially</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  What percentage of your income can you comfortably invest monthly?
                </label>
                <select
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  value={formData.investmentPercentage}
                  onChange={(e) => setFormData({...formData, investmentPercentage: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="<5">Less than 5%</option>
                  <option value="5-10">5–10%</option>
                  <option value="10-20">10–20%</option>
                  <option value="20+">20%+</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 border border-gray-700 transition"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  disabled={!formData.incomeStability || !formData.emergencyFund || !formData.investmentPercentage}
                  className="flex-1 bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-500 transition"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Experience & Mindset</h2>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  How experienced are you with investing?
                </label>
                <select
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  value={formData.experienceLevel}
                  onChange={(e) => setFormData({...formData, experienceLevel: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="beginner">Complete beginner</option>
                  <option value="basic">Basic knowledge (stocks/ETFs)</option>
                  <option value="intermediate">Intermediate investor</option>
                  <option value="advanced">Advanced investor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-gray-300">
                  Have you invested in any of the following before? (Select all that apply)
                </label>
                <div className="space-y-3">
                  {['Stocks', 'ETFs', 'Crypto', 'Bonds', 'Mutual Funds', 'None'].map(option => (
                    <label key={option} className="flex items-center text-white hover:text-green-400 cursor-pointer transition">
                      <input
                        type="checkbox"
                        className="mr-3 w-4 h-4 accent-green-500"
                        checked={formData.previousInvestments.includes(option)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (option === 'None') {
                              setFormData({...formData, previousInvestments: ['None']})
                            } else {
                              const filtered = formData.previousInvestments.filter(i => i !== 'None')
                              setFormData({...formData, previousInvestments: [...filtered, option]})
                            }
                          } else {
                            setFormData({...formData, previousInvestments: formData.previousInvestments.filter(i => i !== option)})
                          }
                        }}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Which best describes your investing mindset?
                </label>
                <select
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  value={formData.investingMindset}
                  onChange={(e) => setFormData({...formData, investingMindset: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="safety">Safety first</option>
                  <option value="balanced">Balanced growth</option>
                  <option value="aggressive">Aggressive growth</option>
                  <option value="high-risk">High-risk/high-reward</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  How often would you like to manage your portfolio?
                </label>
                <select
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white"
                  value={formData.managementPreference}
                  onChange={(e) => setFormData({...formData, managementPreference: e.target.value})}
                >
                  <option value="">Select...</option>
                  <option value="automated">Fully automated</option>
                  <option value="occasional">Occasional adjustments</option>
                  <option value="active">Active management</option>
                  <option value="daily">Daily trading</option>
                </select>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 border border-gray-700 transition"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.experienceLevel || !formData.investingMindset || !formData.managementPreference}
                  className="flex-1 bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-700 disabled:text-gray-500 transition"
                >
                  Complete Setup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function calculateRiskScore(data: any): number {
  let score = 50

  if (data.riskReaction === 'sell-all') score -= 20
  if (data.riskReaction === 'sell-some') score -= 10
  if (data.riskReaction === 'buy-more') score += 20

  if (data.riskAttitude === 'avoid') score -= 15
  if (data.riskAttitude === 'low') score -= 5
  if (data.riskAttitude === 'moderate') score += 5
  if (data.riskAttitude === 'high') score += 15

  if (data.timeHorizon === '<1') score -= 10
  if (data.timeHorizon === '5+') score += 10

  return Math.max(0, Math.min(100, score))
}