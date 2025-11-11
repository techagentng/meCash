'use client'

import React from 'react'
import { Search, Bell, Plus, Menu } from 'lucide-react'

interface TopNavProps {
  searchQuery: string
  setSearchQuery: (s: string) => void
}

export default function TopNav({ searchQuery, setSearchQuery }: TopNavProps) {
  return (
    <header className="bg-[#21262d] border-b border-[#30363d] px-4 py-3">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div className="flex items-center space-x-4">
          <Menu className="w-5 h-5 text-gray-400 md:hidden" />
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">G</span>
            </div>
            <span className="font-semibold text-lg hidden md:block">GitHub</span>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
              placeholder="Search GitHub"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Plus className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
          <Bell className="w-5 h-5 text-gray-300 hover:text-white cursor-pointer" />
          <div className="w-8 h-8 bg-linear-to-r from-purple-400 to-pink-400 rounded-full" />
        </div>
      </div>
    </header>
  )
}
