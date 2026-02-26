import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function DashboardPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect('/sign-in')
  }

  // Get user data from database
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      portfolios: {
        where: { isActive: true },
        include: {
          positions: true,
        },
      },
    },
  })

  // If user hasn't completed onboarding, redirect
  if (!dbUser?.onboardingComplete) {
    redirect('/onboarding')
  }

  const portfolio = dbUser.portfolios[0]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
<header className="border-b border-gray-800 bg-gray-900">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <div className="flex items-center gap-8">
      <h1 className="text-2xl font-bold text-white">Allorca</h1>
      <nav className="flex gap-4 md:gap-6 text-sm md:text-base">
  <Link href="/dashboard" className="text-gray-400 hover:text-white transition">
    Dashboard
  </Link>
  <Link href="/portfolio" className="text-gray-400 hover:text-white transition">
    Portfolio
  </Link>
  <Link href="/education" className="text-green-500 font-semibold">
    Learn
  </Link>
</nav>
    </div>
    <UserButton afterSignOutUrl="/" />
  </div>
</header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.firstName || 'Investor'}! 👋
          </h2>
          <p className="text-gray-400">Here's your portfolio overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Portfolio Value */}
          <div className="bg-gray-900 border border-green-500/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Portfolio Value</p>
            <p className="text-4xl font-bold text-white mb-2">
              ${portfolio?.totalValue.toLocaleString() || '10,000'}
            </p>
            <p className="text-green-500 text-sm">Paper Trading</p>
          </div>

          {/* Risk Score */}
          <div className="bg-gray-900 border border-green-500/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Risk Score</p>
            <p className="text-4xl font-bold text-white mb-2">
              {dbUser.riskScore}/100
            </p>
            <p className="text-gray-400 text-sm">
              {dbUser.riskScore < 35 ? 'Conservative' : dbUser.riskScore > 65 ? 'Aggressive' : 'Moderate'}
            </p>
          </div>

          {/* Discipline Score */}
          <div className="bg-gray-900 border border-green-500/20 rounded-xl p-6">
            <p className="text-gray-400 text-sm mb-1">Discipline Score</p>
            <p className="text-4xl font-bold text-white mb-2">
              {dbUser.disciplineScore}/100
            </p>
            <p className="text-gray-400 text-sm">Building habits...</p>
          </div>
        </div>

        {/* Portfolio Type Card */}
        <div className="bg-gray-900 border border-green-500/20 rounded-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Your Portfolio: {dbUser.portfolioType}
          </h3>
          <p className="text-gray-300 mb-4">
            Based on your survey responses, we've assigned you a {dbUser.portfolioType.toLowerCase()} portfolio strategy.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Investment Goal</p>
              <p className="text-white font-semibold">{formatGoal(dbUser.investmentGoal)}</p>
            </div>
            <div>
              <p className="text-gray-400">Time Horizon</p>
              <p className="text-white font-semibold">{dbUser.timeHorizon}</p>
            </div>
            <div>
              <p className="text-gray-400">Experience Level</p>
              <p className="text-white font-semibold capitalize">{dbUser.experienceLevel}</p>
            </div>
            <div>
              <p className="text-gray-400">Management Style</p>
              <p className="text-white font-semibold capitalize">{dbUser.managementPreference}</p>
            </div>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-gray-900 border border-green-500/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">🚀 More Features Coming Soon</h3>
          <p className="text-gray-400">
            Portfolio positions, AI insights, educational courses, and automated rebalancing are on the way!
          </p>
        </div>
      </div>
    </div>
  )
}

function formatGoal(goal: string | null): string {
  if (!goal) return 'Not set'
  const goals: Record<string, string> = {
    wealth: 'Build long-term wealth',
    purchase: 'Save for major purchase',
    income: 'Generate passive income',
    preserve: 'Preserve capital',
  }
  return goals[goal] || goal
}