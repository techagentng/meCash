import React, { Suspense } from 'react'
import ResultsClient from '@/components/ResultsClient'

interface ResultsPageProps {
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default function GitHubSearchInterface({ searchParams }: ResultsPageProps) {
  const q = Array.isArray(searchParams?.q) ? searchParams?.q[0] : searchParams?.q || ''

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117] text-white p-4">Loading results…</div>}>
      <ResultsClient initialQuery={q} />
    </Suspense>
  )
}
