'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Lesson {
  id: string
  title: string
  duration: string
}

interface Props {
  courseId: string
  courseName: string
  lessons: Lesson[]
}

const TIERS = [
  { name: 'Beginner', min: 0, color: 'text-gray-400', bg: 'bg-gray-700' },
  { name: 'Student', min: 20, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { name: 'Investor', min: 40, color: 'text-green-400', bg: 'bg-green-500/20' },
  { name: 'Veteran', min: 60, color: 'text-purple-400', bg: 'bg-purple-500/20' },
  { name: 'Expert', min: 80, color: 'text-amber-400', bg: 'bg-amber-500/20' },
]

function getTier(score: number) {
  return [...TIERS].reverse().find((t) => score >= t.min) ?? TIERS[0]
}

function getNextTier(score: number) {
  return TIERS.find((t) => t.min > score) ?? null
}

export default function CourseProgress({ courseId, courseName, lessons }: Props) {
  const [started, setStarted] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set())
  const [courseCompleted, setCourseCompleted] = useState(false)
  const [disciplineScore, setDisciplineScore] = useState(0)
  const [awardedPoints, setAwardedPoints] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/progress')
      .then((r) => r.json())
      .then((data) => {
        const record = data.progress?.find((p: { courseId: string; progress: number; completed: boolean }) => p.courseId === courseId)
        if (record) {
          setStarted(true)
          setCourseCompleted(record.completed)
          // Reconstruct completed lessons from progress percentage
          const count = Math.round((record.progress / 100) * lessons.length)
          setCompletedLessons(new Set(Array.from({ length: count }, (_, i) => i)))
        }
        setDisciplineScore(data.disciplineScore ?? 0)
      })
      .finally(() => setLoading(false))
  }, [courseId, lessons.length])

  async function saveProgress(newCompleted: Set<number>, finished: boolean) {
    setSaving(true)
    const progress = Math.round((newCompleted.size / lessons.length) * 100)
    const res = await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId, courseName, progress, completed: finished }),
    })
    const data = await res.json()
    setDisciplineScore(data.disciplineScore)
    if (data.awardedPoints > 0) {
      setAwardedPoints(data.awardedPoints)
      setShowCelebration(true)
    }
    setSaving(false)
  }

  function toggleLesson(index: number) {
    if (!started || courseCompleted) return
    const next = new Set(completedLessons)
    if (next.has(index)) {
      next.delete(index)
    } else {
      next.add(index)
    }
    setCompletedLessons(next)

    const finished = next.size === lessons.length
    if (finished) setCourseCompleted(true)
    saveProgress(next, finished)
  }

  function handleStart() {
    setStarted(true)
    saveProgress(new Set(), false)
  }

  const tier = getTier(disciplineScore)
  const nextTier = getNextTier(disciplineScore)
  const progressPct = Math.round((completedLessons.size / lessons.length) * 100)

  if (loading) {
    return <div className="h-32 bg-gray-900 rounded-2xl animate-pulse border border-gray-800" />
  }

  return (
    <div className="space-y-4 mb-8">

      {/* Discipline Score + Tier */}
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${tier.bg} ${tier.color}`}>
              {tier.name}
            </span>
            {saving && <span className="text-xs text-gray-500">Saving...</span>}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-gray-400 text-sm">Discipline Score</span>
            <span className="text-white font-bold">{disciplineScore}/100</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-700"
              style={{ width: `${disciplineScore}%` }}
            />
          </div>
          {nextTier && (
            <p className="text-gray-500 text-xs mt-1">
              {nextTier.min - disciplineScore} points to {nextTier.name}
            </p>
          )}
        </div>

        {!started ? (
          <button
            onClick={handleStart}
            className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-3 rounded-xl transition flex-shrink-0"
          >
            Start Course
          </button>
        ) : courseCompleted ? (
          <span className="text-green-400 font-bold text-sm flex-shrink-0">Course Complete</span>
        ) : (
          <span className="text-gray-400 text-sm flex-shrink-0">{progressPct}% complete</span>
        )}
      </div>

      {/* Lesson Checklist */}
      {started && (
        <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6">
          <h4 className="text-white font-semibold mb-4">Lesson Progress</h4>
          <div className="space-y-2">
            {lessons.map((lesson, index) => {
              const done = completedLessons.has(index)
              return (
                <button
                  key={lesson.id}
                  onClick={() => toggleLesson(index)}
                  disabled={courseCompleted}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition text-left ${
                    done
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-gray-800/50 border-gray-700 hover:border-gray-500'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition ${
                    done ? 'bg-green-500 border-green-500' : 'border-gray-500'
                  }`}>
                    {done && (
                      <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`flex-1 text-sm font-medium ${done ? 'text-green-400' : 'text-gray-300'}`}>
                    {lesson.title}
                  </span>
                  <span className="text-gray-500 text-xs">{lesson.duration}</span>
                </button>
              )
            })}
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-800 rounded-full h-1.5">
              <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-gray-500 text-xs mt-1">{completedLessons.size} of {lessons.length} lessons complete</p>
          </div>
        </div>
      )}

      {/* Celebration Banner */}
      {showCelebration && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center">
          <h3 className="text-2xl font-bold text-white mb-1">Course Complete</h3>
          <p className="text-green-400 font-semibold mb-1">+{awardedPoints} discipline points earned</p>
          <p className="text-gray-400 text-sm mb-4">
            You are now a <span className="text-white font-semibold">{tier.name}</span>
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/education"
              className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-2.5 rounded-xl transition text-sm"
            >
              Browse More Courses
            </Link>
            <button
              onClick={() => setShowCelebration(false)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded-xl transition text-sm border border-gray-700"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  )
}