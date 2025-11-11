'use client'

import React from 'react'
import RepoCard from './RepoCard'
import { Repository } from '@/lib/data'

interface RepoListProps {
  repos: Repository[]
}

export default function RepoList({ repos }: RepoListProps) {
  return (
    <div className="space-y-4">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  )
}
