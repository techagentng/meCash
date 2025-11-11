'use client'

import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  const createRange = (start: number, end: number) => {
    const range = [] as number[]
    for (let i = start; i <= end; i++) range.push(i)
    return range
  }

  const pages = (() => {
    const pagesSet = new Set<number>()
    pagesSet.add(1)
    pagesSet.add(totalPages)
    pagesSet.add(currentPage)
    if (currentPage - 1 > 1) pagesSet.add(currentPage - 1)
    if (currentPage + 1 < totalPages) pagesSet.add(currentPage + 1)
    const sorted = Array.from(pagesSet).sort((a, b) => a - b)
    return sorted
  })()

  return (
    <nav className="mt-6 flex items-center justify-center space-x-2" aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md border ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''} border-[#30363d] bg-[#0d1117] text-sm`}
      >
        Prev
      </button>

      {pages.map((p, idx) => (
        <React.Fragment key={p}>
          {idx > 0 && p - pages[idx - 1] > 1 && (
            <span className="px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(p)}
            aria-current={p === currentPage}
            className={`px-3 py-1 rounded-md border border-[#30363d] text-sm ${p === currentPage ? 'bg-[#21262d] text-white' : 'bg-[#0d1117] text-gray-300 hover:bg-[#21262d]'}`}
          >
            {p}
          </button>
        </React.Fragment>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md border ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''} border-[#30363d] bg-[#0d1117] text-sm`}
      >
        Next
      </button>
    </nav>
  )
}
