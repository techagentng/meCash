'use client'

import React from 'react'
import { BookOpen, Star } from 'lucide-react'
import { Repository, getLanguageColor } from '@/lib/data'

interface RepoCardProps {
  repo: Repository
}

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="border border-[#30363d] rounded-md p-4 hover:border-[#58a6ff] transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <h3 className="text-lg font-semibold text-[#58a6ff] hover:underline cursor-pointer">{repo.owner}/{repo.name}</h3>
          </div>
          <p className="text-gray-300 text-sm mb-3 leading-relaxed">{repo.description}</p>
          <div className="flex items-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`}></div>
              <span>{repo.language}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3" />
              <span>{repo.stars.toLocaleString()}</span>
            </div>
            <span>Updated on {repo.updatedAt}</span>
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
