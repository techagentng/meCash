import { useQuery } from '@tanstack/react-query'

interface Owner {
  login: string
  avatar_url: string
  html_url: string
}

interface License {
  key: string
  name: string
  spdx_id: string
  url: string
}

export interface Repository {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  owner: Owner
  stargazers_count: number
  forks_count: number
  language: string | null
  license: License | null
  created_at: string
  updated_at: string
  topics: string[]
}

interface GitHubSearchResponse {
  total_count: number
  incomplete_results: boolean
  items: Repository[]
}

interface UseSearchRepositoriesParams {
  query: string
  sortBy?: 'stars' | 'forks' | 'updated'
  page?: number
  perPage?: number
}

export function useSearchRepositories({
  query,
  sortBy = 'stars',
  page = 1,
  perPage = 10,
}: UseSearchRepositoriesParams) {
  return useQuery<GitHubSearchResponse>({
    queryKey: ['repositories', query, sortBy, page, perPage],
    queryFn: async () => {
      if (!query.trim()) {
        return { total_count: 0, incomplete_results: false, items: [] }
      }

      const params = new URLSearchParams({
        q: query,
        sort: sortBy,
        order: 'desc',
        page: page.toString(),
        per_page: perPage.toString(),
      })

      const response = await fetch(
        `https://api.github.com/search/repositories?${params}`
      )

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`)
      }

      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    enabled: query.trim().length > 0,
  })
}
