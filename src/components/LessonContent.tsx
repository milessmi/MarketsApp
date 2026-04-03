'use client'

import ReactMarkdown from 'react-markdown'

export default function LessonContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold text-white mb-4 mt-2">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold text-white mb-3 mt-6 pb-2 border-b border-gray-700">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-semibold text-green-400 mb-2 mt-4">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-gray-300 leading-relaxed mb-4">{children}</p>
        ),
        strong: ({ children }) => (
          <strong className="text-white font-semibold">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="space-y-1.5 mb-4 ml-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="space-y-1.5 mb-4 ml-4 list-decimal">{children}</ol>
        ),
        li: ({ children }) => (
          <li className="text-gray-300 flex gap-2 items-start">
            <span className="text-green-500 mt-1.5 flex-shrink-0">•</span>
            <span>{children}</span>
          </li>
        ),
        hr: () => <hr className="border-gray-700 my-6" />,
        code: ({ children }) => (
          <code className="bg-gray-800 text-green-400 px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-green-500 pl-4 italic text-gray-400 my-4">{children}</blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}