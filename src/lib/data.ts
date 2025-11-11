export interface Repository {
  id: string
  name: string
  owner: string
  description: string
  language: string
  stars: number
  updatedAt: string
  topics: string[]
}

export const repositories: Repository[] = [
  {
    id: '1',
    name: 'IWeChat',
    owner: 'lefex',
    description: '从 0 开始搭建一个 App，以微信为例',
    language: 'Objective-C',
    stars: 18000,
    updatedAt: '25 Sept 2020',
    topics: [],
  },
  {
    id: '2',
    name: 'iwe',
    owner: 'iwe-org',
    description: 'LSP for Markdown notes taking',
    language: 'Rust',
    stars: 456,
    updatedAt: '21 minutes ago',
    topics: ['markdown', 'neovim', 'git', 'notes', 'vscode'],
  },
  {
    id: '3',
    name: 'liveweather',
    owner: 'bradtraversy',
    description: 'Ionic 3 mobile weather app',
    language: 'TypeScript',
    stars: 92,
    updatedAt: '26 Mar 2018',
    topics: [],
  },
  {
    id: '4',
    name: 'OVIWrite',
    owner: 'MiragianCycle',
    description: 'Integrated Writing Environment (IWE) based on NeoVim',
    language: 'Lua',
    stars: 267,
    updatedAt: '11 Aug',
    topics: ['latex', 'neovim', 'writing', 'neovim-plugin', 'fountain'],
  },
  {
    id: '5',
    name: 'IweEngine',
    owner: 'IainWinter',
    description:
      'This is an engine that I initially started building after taking a game coding class in high school to learn how the underlying systems o...',
    language: 'C++',
    stars: 3,
    updatedAt: '2 years ago',
    topics: ['game', 'events', 'cplusplus', 'math', 'input'],
  },
]

export const filterCategories = [
  { name: 'Code', iconName: 'Code', count: '2k', active: false },
  { name: 'Repositories', iconName: 'BookOpen', count: '2k', active: true },
  { name: 'Issues', iconName: 'AlertCircle', count: '2k', active: false },
  { name: 'Pull requests', iconName: 'GitPullRequest', count: '2k', active: false },
  { name: 'Discussions', iconName: 'MessageSquare', count: '2k', active: false },
  { name: 'Users', iconName: 'Users', count: '2k', active: false },
  { name: 'Commits', iconName: 'GitCommit', count: '2k', active: false },
  { name: 'Packages', iconName: 'Package', count: '2k', active: false },
  { name: 'Wikis', iconName: 'FileText', count: '2k', active: false },
  { name: 'Topics', iconName: 'Tag', count: '2k', active: false },
  { name: 'Marketplace', iconName: 'ShoppingCart', count: '2k', active: false },
]

export const languages = [
  { name: 'HTML', color: 'bg-orange-500', count: '2.1k' },
  { name: 'JavaScript', color: 'bg-yellow-400', count: '1.8k' },
  { name: 'TypeScript', color: 'bg-blue-600', count: '892' },
  { name: 'Java', color: 'bg-red-600', count: '654' },
  { name: 'Swift', color: 'bg-orange-600', count: '432' },
  { name: 'Python', color: 'bg-blue-500', count: '321' },
  { name: 'CSS', color: 'bg-purple-500', count: '198' },
]

export const getLanguageColor = (language: string) => {
  const colors: { [key: string]: string } = {
    'Objective-C': 'bg-blue-500',
    Rust: 'bg-orange-600',
    TypeScript: 'bg-blue-600',
    Lua: 'bg-blue-400',
    'C++': 'bg-pink-500',
  }
  return colors[language] || 'bg-gray-500'
}
