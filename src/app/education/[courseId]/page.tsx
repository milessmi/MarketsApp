import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect, notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { getCourseById } from '@/lib/courses'

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

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link href="/dashboard">
              <h1 className="text-2xl font-bold text-white">Allorca</h1>
            </Link>
            <nav className="hidden md:flex gap-6">
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
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link 
          href="/education"
          className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition"
        >
          ← Back to Courses
        </Link>

        {/* Course Header */}
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-8 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-green-500/20 text-green-500 text-sm rounded font-semibold uppercase">
              {course.level}
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-500 text-sm rounded font-semibold">
              {course.duration}
            </span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">{course.title}</h1>
          <p className="text-gray-300 text-lg">{course.description}</p>
        </div>

        {/* Lessons */}
        <div className="space-y-6">
          {course.lessons.map((lesson, index) => (
            <div key={lesson.id} className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="w-8 h-8 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm ml-11">{lesson.duration}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {lesson.content}
                </div>
              </div>
              {lesson.quiz && (
                <div className="p-6 bg-gray-800/50 border-t border-gray-700">
                  <h4 className="text-white font-semibold mb-3">✅ Knowledge Check</h4>
                  <p className="text-gray-300 mb-3">{lesson.quiz.question}</p>
                  <div className="space-y-2">
                    {lesson.quiz.options.map((option, i) => (
                      <div 
                        key={i}
                        className="p-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-300 hover:border-green-500/50 cursor-pointer transition"
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm mt-3">
                    💡 {lesson.quiz.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Course Complete */}
        <div className="mt-8 bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">🎉 Course Complete!</h3>
          <p className="text-gray-300 mb-6">
            Great work finishing {course.title}. Ready for more?
          </p>
          <Link
            href="/education"
            className="inline-block bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-lg font-semibold transition"
          >
            Browse More Courses
          </Link>
        </div>
      </div>
    </div>
  )
}