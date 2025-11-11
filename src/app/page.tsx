
'use client'

import React, { useState } from 'react'
import Pagination from '@/components/Pagination'
import TopNav from '@/components/TopNav'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import RepoList from '@/components/RepoList'
import { repositories } from '@/lib/data'

export default function GitHubSearchInterface() {
  const [searchQuery, setSearchQuery] = useState('iwe')
  const [sortBy, setSortBy] = useState('Best match')
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 2 

  const totalPages = Math.max(1, Math.ceil(repositories.length / perPage))
  const paginatedRepositories = repositories.slice((currentPage - 1) * perPage, currentPage * perPage)

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <TopNav searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="max-w-screen-2xl mx-auto flex">
        <LeftSidebar />

        <main className="flex-1 p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              3.6k results <span className="text-gray-400 text-sm font-normal">(231 ms)</span>
            </h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#21262d] border border-[#30363d] rounded-md px-3 py-1 text-sm focus:outline-none focus:border-[#58a6ff]"
                >
                  <option>Best match</option>
                  <option>Most stars</option>
                  <option>Recently updated</option>
                </select>
              </div>
              <button className="flex items-center space-x-2 bg-[#21262d] border border-[#30363d] rounded-md px-3 py-1 text-sm hover:bg-[#30363d]">
                <span>Save</span>
              </button>
            </div>
          </div>

          <div>
            <RepoList repos={paginatedRepositories} />
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => setCurrentPage(p)} />
          </div>
        </main>

        <RightSidebar />
      </div>
    </div>
  )
}