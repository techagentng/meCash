'use client'

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

export default function GitHubSearchInterface() {
  const searchParams = useSearchParams()
  const queryParam = searchParams.get('q') || ''

  const [searchQuery, setSearchQuery] = useState(queryParam)
  const [sortBy, setSortBy] = useState('Best match')
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 10

  useEffect(() => {
    setSearchQuery(queryParam)
    setCurrentPage(1)
  }, [queryParam])

  // Fetch real data from GitHub API
  const { data, isLoading, error } = useSearchRepositories({
    query: searchQuery,
    sortBy: sortMap[sortBy] || 'stars',
    page: currentPage,
    perPage,
  })

  const repos = data?.items || []
  const totalCount = data?.total_count || 0
  const totalPages = Math.max(1, Math.ceil(totalCount / perPage))

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <TopNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="max-w-screen-2xl mx-auto flex">
        <LeftSidebar />

        <main className="flex-1 p-4">
          <div className="flex items-center justify-between mb-6">
            {isLoading ? (
              <div className="text-gray-400 text-sm">Loading results...</div>
            ) : error ? (
              <div className="text-red-500 text-sm">Error fetching results</div>
            ) : (
              <h2 className="text-xl font-semibold">
                {totalCount.toLocaleString()} results{' '}
                <span className="text-gray-400 text-sm font-normal">(~{Math.random() * 500 | 0}ms)</span>
              </h2>
            )}

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sort by:</span>
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
              <button className="flex items-center space-x-2 bg-[#21262d] border border-[#30363d] rounded-md px-3 py-1 text-sm hover:bg-[#30363d]">
                <span>Save</span>
              </button>
            </div>
          </div>

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
