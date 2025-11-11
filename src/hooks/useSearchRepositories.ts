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
  language?: string | null
  license?: string | null
  stars?: { min?: number; max?: number } | string | null
  order?: 'asc' | 'desc'
}

export function useSearchRepositories({
  query,
  sortBy = 'stars',
  page = 1,
  perPage = 10,
  language = null,
  license = null,
  stars = null,
  order = 'desc',
}: UseSearchRepositoriesParams) {
  return useQuery<GitHubSearchResponse>({
    queryKey: ['repositories', query, sortBy, page, perPage, language, license, JSON.stringify(stars), order],
    queryFn: async () => {
      if (!query.trim()) {
        return { total_count: 0, incomplete_results: false, items: [] }
      }

      // Build GitHub q string with qualifiers
      const qualifiers: string[] = []
      if (language) qualifiers.push(`language:${language}`)
      if (license) qualifiers.push(`license:${license}`)
      if (stars) {
        if (typeof stars === 'string') {
          qualifiers.push(`stars:${stars}`)
        } else if (typeof stars === 'object') {
          const { min, max } = stars
          if (min != null && max != null) qualifiers.push(`stars:${min}..${max}`)
          else if (min != null) qualifiers.push(`stars:>=${min}`)
          else if (max != null) qualifiers.push(`stars:<=${max}`)
        }
      }

      const qParam = [query, ...qualifiers].filter(Boolean).join(' ')

      const params = new URLSearchParams({
        q: qParam,
        sort: sortBy,
        order: order,
        page: page.toString(),
        per_page: perPage.toString(),
      })

      const response = await fetch(`https://api.github.com/search/repositories?${params}`)

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
