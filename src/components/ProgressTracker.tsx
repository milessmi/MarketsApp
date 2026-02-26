'use client'

export default function ProgressTracker({ 
  current, 
  total 
}: { 
  current: number
  total: number 
}) {
  const percentage = Math.round((current / total) * 100)
  
  return (
    <div className="bg-gray-900 border border-green-500/20 rounded-xl p-6 mb-6 sticky top-4 z-10">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-white font-semibold">Course Progress</h3>
          <p className="text-gray-400 text-sm">
            {current} of {total} lessons completed
          </p>
        </div>
        <div className="text-3xl font-bold text-green-500">
          {percentage}%
        </div>
      </div>
      
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-green-500 to-green-400 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {percentage === 100 && (
        <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
          <p className="text-green-400 text-sm font-semibold flex items-center gap-2">
            <span>🎉</span>
            Course Complete! Great work!
          </p>
        </div>
      )}
    </div>
  )
}