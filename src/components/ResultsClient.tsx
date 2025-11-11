"use client"

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Pagination from '@/components/Pagination'
import TopNav from '@/components/TopNav'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import RepoList from '@/components/RepoList'
import { useSearchRepositories } from '@/hooks/useSearchRepositories'

const sortMap: Record<string, 'stars' | 'forks' | 'updated'> = {
  'Best match': 'stars',
  'Most stars': 'stars',
  'Recently updated': 'updated',
  'Most forks': 'forks',
}

interface ResultsClientProps {
  initialQuery?: string
}

export default function ResultsClient({ initialQuery = '' }: ResultsClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [sortBy, setSortBy] = useState('Best match')
  const [currentPage, setCurrentPage] = useState(1)
  const [language, setLanguage] = useState('')
  const [stars, setStars] = useState('')
  const [license, setLicense] = useState('')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const perPage = 10

  const searchParams = useSearchParams()
  const qFromParams = searchParams?.get('q') || ''

  useEffect(() => {
    const q = qFromParams || initialQuery
    setSearchQuery(q)
    setCurrentPage(1)
  }, [qFromParams, initialQuery])

  const { data, isLoading, error } = useSearchRepositories({
    query: searchQuery,
    sortBy: sortMap[sortBy] || 'stars',
    page: currentPage,
    perPage,
    language,
    stars: stars || null,
    license: license || null,
    order,
  })

  const repos = data?.items || []
  const totalCount = data?.total_count || 0
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage))

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <TopNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row">
        <div className="hidden md:block">
          <LeftSidebar />
        </div>

        <main className="flex-1 p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-wrap items-center gap-2 md:space-x-4">
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-sm text-gray-400">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="bg-[#21262d] border border-[#30363d] rounded-md px-3 py-1 text-sm focus:outline-none focus:border-[#58a6ff]"
                >
                  <option>Best match</option>
                  <option>Most stars</option>
                  <option>Recently updated</option>
                  <option>Most forks</option>
                </select>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-sm text-gray-400">Language:</span>
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="bg-[#21262d] border border-[#30363d] rounded-md px-3 py-1 text-sm focus:outline-none focus:border-[#58a6ff]"
                >
                  <option value="">All</option>
                  <option value="TypeScript">TypeScript</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="Go">Go</option>
                </select>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-sm text-gray-400">Stars:</span>
                <input
                  type="text"
                  value={stars}
                  onChange={(e) => {
                    setStars(e.target.value)
                    setCurrentPage(1)
                  }}
                  placeholder=">1000 or 10..100"
                  className="w-full sm:w-28 bg-[#0d1117] border border-[#30363d] rounded-md px-2 py-1 text-sm focus:outline-none focus:border-[#58a6ff]"
                />
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-sm text-gray-400">License:</span>
                <select
                  value={license}
                  onChange={(e) => {
                    setLicense(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="bg-[#21262d] border border-[#30363d] rounded-md px-3 py-1 text-sm focus:outline-none focus:border-[#58a6ff]"
                >
                  <option value="">Any</option>
                  <option value="mit">MIT</option>
                  <option value="apache-2.0">Apache-2.0</option>
                  <option value="gpl-3.0">GPL-3.0</option>
                </select>
              </div>
              <div className="flex items-center space-x-2 w-full sm:w-auto">
                <span className="text-sm text-gray-400">Order:</span>
                <select
                  value={order}
                  onChange={(e) => {
                    setOrder(e.target.value as 'asc' | 'desc')
                    setCurrentPage(1)
                  }}
                  className="bg-[#21262d] border border-[#30363d] rounded-md px-3 py-1 text-sm focus:outline-none focus:border-[#58a6ff]"
                >
                  <option value="desc">Desc</option>
                  <option value="asc">Asc</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 bg-[#21262d] border border-[#30363d] rounded-md px-3 py-1 text-sm hover:bg-[#30363d]">
                  <span>Save</span>
                </button>
              </div>
            </div>
          </div>
            {isLoading ? (
              <div className="text-gray-400 text-sm">Loading results...</div>
            ) : error ? (
              <div className="text-red-500 text-sm">Error fetching results</div>
            ) : (
              <h2 className="text-xl font-semibold">
                {totalCount.toLocaleString()} results
                <span className="text-gray-400 text-sm font-normal">(~{Math.random() * 500 | 0}ms)</span>
              </h2>
            )}
          <div>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(perPage)].map((_, i) => (
                  <div key={i} className="h-24 bg-[#161b22] rounded-md animate-pulse"></div>
                ))}
              </div>
            ) : error ? (
              <div className="p-4 bg-red-900/20 border border-red-700 rounded-md text-red-400">
                Failed to fetch repositories. Please try again.
              </div>
            ) : repos.length === 0 ? (
              <div className="p-4 text-gray-400">No repositories found for "{searchQuery}"</div>
            ) : (
              <>
                <RepoList repos={repos} />
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(p) => setCurrentPage(p)}
                />
              </>
            )}
          </div>
        </main>

        <RightSidebar />
      </div>
    </div>
  )
}
