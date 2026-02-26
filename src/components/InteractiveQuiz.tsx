'use client'

import { useState } from 'react'

type Quiz = {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export default function InteractiveQuiz({ quiz }: { quiz: Quiz }) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleAnswerClick = (index: number) => {
    if (selectedAnswer !== null) return // Already answered
    
    setSelectedAnswer(index)
    setShowExplanation(true)
  }

  const isCorrect = selectedAnswer === quiz.correctAnswer
  const hasAnswered = selectedAnswer !== null

  return (
    <div className="p-6 bg-gray-800/50 border-t border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">✅</span>
        <h4 className="text-white font-semibold">Knowledge Check</h4>
      </div>
      
      <p className="text-gray-300 mb-4 text-lg">{quiz.question}</p>
      
      <div className="space-y-3 mb-4">
        {quiz.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrectOption = index === quiz.correctAnswer
          
          let borderColor = 'border-gray-700'
          let bgColor = 'bg-gray-900'
          let textColor = 'text-gray-300'
          
          if (hasAnswered) {
            if (isCorrectOption) {
              borderColor = 'border-green-500'
              bgColor = 'bg-green-500/10'
              textColor = 'text-green-400'
            } else if (isSelected && !isCorrect) {
              borderColor = 'border-red-500'
              bgColor = 'bg-red-500/10'
              textColor = 'text-red-400'
            }
          } else if (isSelected) {
            borderColor = 'border-green-500/50'
          }
          
          return (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={hasAnswered}
              className={`w-full p-4 ${bgColor} border-2 ${borderColor} rounded-lg ${textColor} 
                         hover:border-green-500/50 transition-all duration-300 text-left
                         ${!hasAnswered ? 'cursor-pointer' : 'cursor-default'}
                         ${isSelected && !hasAnswered ? 'ring-2 ring-green-500/20' : ''}
                         disabled:cursor-not-allowed relative group`}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1">{option}</span>
                {hasAnswered && isCorrectOption && (
                  <span className="text-green-500 text-xl ml-2">✓</span>
                )}
                {hasAnswered && isSelected && !isCorrect && (
                  <span className="text-red-500 text-xl ml-2">✗</span>
                )}
              </div>
            </button>
          )
        })}
      </div>
      
      {showExplanation && (
        <div className={`p-4 rounded-lg border-2 animate-fadeIn ${
          isCorrect 
            ? 'bg-green-500/10 border-green-500/30' 
            : 'bg-orange-500/10 border-orange-500/30'
        }`}>
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">
              {isCorrect ? '🎉' : '💡'}
            </span>
            <div>
              <p className={`font-semibold mb-2 ${
                isCorrect ? 'text-green-400' : 'text-orange-400'
              }`}>
                {isCorrect ? 'Correct!' : 'Not quite!'}
              </p>
              <p className="text-gray-300 text-sm leading-relaxed">
                {quiz.explanation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}