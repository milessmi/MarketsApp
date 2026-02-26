import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { getCourseById } from '@/lib/courses'
import InteractiveQuiz from '@/components/InteractiveQuiz'
import ProgressTracker from '@/components/ProgressTracker'

const prisma = new PrismaClient()

type PageProps = {
  params: Promise<{ courseId: string }>
}

export default async function CoursePage(props: PageProps) {
  const params = await props.params
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

  const course = getCourseById(params.courseId)

  if (!course) {
    notFound()
  }

  // Mock progress - in production, fetch from database
  const completedLessons = 0
  const totalLessons = course.lessons.length

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

      {/* Course Content */}
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Back Button */}
        <Link 
          href="/education"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span className="ml-2">Back to Courses</span>
        </Link>

        {/* Course Header */}
        <div className="bg-gradient-to-br from-green-500/10 via-blue-500/5 to-purple-500/10 border border-green-500/20 rounded-2xl p-8 mb-8 shadow-xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-4 py-1.5 bg-green-500/20 text-green-400 text-sm rounded-full font-semibold uppercase tracking-wide">
              {course.level}
            </span>
            <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 text-sm rounded-full font-semibold flex items-center gap-2">
              <span>⏱️</span>
              {course.duration}
            </span>
            <span className="px-4 py-1.5 bg-purple-500/20 text-purple-400 text-sm rounded-full font-semibold flex items-center gap-2">
              <span>📚</span>
              {course.lessons.length} Lessons
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">{course.title}</h1>
          <p className="text-gray-300 text-lg leading-relaxed">{course.description}</p>
        </div>

        {/* Progress Tracker */}
        <ProgressTracker current={completedLessons} total={totalLessons} />

        {/* Lessons */}
        <div className="space-y-8">
          {course.lessons.map((lesson, index) => (
            <div 
              key={lesson.id} 
              id={`lesson-${index + 1}`}
              className="bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Lesson Header */}
              <div className="p-6 border-b border-gray-800 bg-gray-800/30">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center font-bold text-white text-lg shadow-lg flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">{lesson.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                          <span>⏱️</span>
                          {lesson.duration}
                        </span>
                        {lesson.quiz && (
                          <span className="flex items-center gap-1">
                            <span>✅</span>
                            Quiz included
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Lesson Content */}
              <div className="p-8">
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 whitespace-pre-wrap leading-relaxed text-lg">
                    {lesson.content}
                  </div>
                </div>
              </div>
              
              {/* Interactive Quiz */}
              {lesson.quiz && <InteractiveQuiz quiz={lesson.quiz} />}
            </div>
          ))}
        </div>

        {/* Course Complete Card */}
        <div className="mt-12 bg-gradient-to-br from-green-500/10 via-blue-500/5 to-purple-500/10 border-2 border-green-500/30 rounded-2xl p-10 text-center shadow-2xl">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-3xl font-bold text-white mb-3">Course Complete!</h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Congratulations on finishing <span className="text-green-400 font-semibold">{course.title}</span>. 
            You're one step closer to becoming a confident investor!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/education"
              className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="mr-2">📚</span>
              Browse More Courses
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white border-2 border-gray-700 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
            >
              <span className="mr-2">🏠</span>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}