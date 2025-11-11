'use client'

import React from 'react'
import { BookOpen, Star } from 'lucide-react'
import { getLanguageColor } from '@/lib/data'

interface GitHubRepository {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  owner: {
    login: string
    avatar_url: string
  }
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
  topics: string[]
}

interface RepoCardProps {
  repo: GitHubRepository
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)
  const diffMonths = Math.floor(diffDays / 30)
  const diffYears = Math.floor(diffMonths / 12)

  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`
  return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="border border-[#30363d] rounded-md p-4 hover:border-[#58a6ff] transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-[#58a6ff] hover:underline cursor-pointer"
            >
              {repo.owner.login}/{repo.name}
            </a>
          </div>
          <p className="text-gray-300 text-sm mb-3 leading-relaxed">{repo.description || 'No description'}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            {repo.language && (
              <div className="flex items-center space-x-1">
                <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
                <span>{repo.language}</span>
              </div>
            )}
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>{repo.stargazers_count.toLocaleString()}</span>
            </div>
            <span>Updated {formatDate(repo.updated_at)}</span>
          </div>
          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {repo.topics.map((topic) => (
                <span key={topic} className="px-2 py-1 bg-[#1f6feb] text-xs rounded-full hover:bg-[#388bfd] cursor-pointer">
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button className="flex items-center space-x-1 bg-[#21262d] border border-[#30363d] rounded-md px-3 py-1 text-sm hover:bg-[#30363d]">
            <Star className="w-4 h-4" />
            <span>Star</span>
          </button>
        </div>
      </div>
    </div>
  )
}
