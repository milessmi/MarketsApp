import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { getCoursesForUser } from '@/lib/courses'

const prisma = new PrismaClient()

export default async function EducationPage() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId) {
    redirect('/sign-in')
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!dbUser?.onboardingComplete) {
    redirect('/onboarding')
  }

  const recommendedCourses = getCoursesForUser({
    experienceLevel: dbUser.experienceLevel,
    riskScore: dbUser.riskScore,
    portfolioType: dbUser.portfolioType,
  })

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/dashboard">
              <h1 className="text-2xl font-bold text-white">Allorca</h1>
            </Link>
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
            Your Learning Path 📚
          </h2>
          <p className="text-gray-400">
            Personalized courses based on your {dbUser.experienceLevel} experience level and {dbUser.portfolioType.toLowerCase()} portfolio
          </p>
        </div>

        {/* AI Recommendation Message */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="text-3xl">🤖</div>
            <div>
              <h3 className="text-white font-bold mb-2">AI-Curated Just For You</h3>
              <p className="text-gray-300 text-sm">
                Based on your survey responses, we've identified the most relevant courses to accelerate your investing journey. 
                Start with the recommended courses below, then explore the full catalog.
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Recommended For You</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {recommendedCourses.slice(0, 4).map((course) => (
              <Link 
                key={course.id}
                href={`/education/${course.id}`}
                className="bg-gray-900 border border-green-500/20 rounded-xl p-6 hover:border-green-500/50 transition group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded font-semibold uppercase">
                        {course.level}
                      </span>
                      <span className="text-gray-500 text-sm">• {course.duration}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white group-hover:text-green-500 transition">
                      {course.title}
                    </h4>
                  </div>
                  <div className="text-2xl">
                    {course.level === 'beginner' ? '📖' : course.level === 'intermediate' ? '📊' : '🎓'}
                  </div>
                </div>
                <p className="text-gray-400 text-sm mb-4">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">
                    {course.lessons.length} lessons
                  </span>
                  <span className="text-green-500 text-sm font-semibold group-hover:translate-x-1 transition">
                    Start Course →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* All Courses */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">All Courses</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <Link
                key={course.id}
                href={`/education/${course.id}`}
                className="bg-gray-900 border border-gray-700 rounded-xl p-6 hover:border-green-500/50 transition"
              >
                <div className="text-3xl mb-3">
                  {course.riskProfile === 'conservative' ? '🛡️' : 
                   course.riskProfile === 'aggressive' ? '🚀' : '⚖️'}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  {course.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded">
                    {course.level}
                  </span>
                  <span className="text-gray-500">{course.duration}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-12 bg-gray-900 border border-green-500/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">More Courses Coming Soon!</h3>
          <p className="text-gray-400">
            We're continuously adding new content. Suggest topics you'd like to learn about!
          </p>
        </div>
      </div>
    </div>
  )
}