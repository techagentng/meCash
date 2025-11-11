'use client'

import React from 'react'
import RepoCard from './RepoCard'

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

interface RepoListProps {
  repos: GitHubRepository[]
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
