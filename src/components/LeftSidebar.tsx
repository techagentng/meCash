'use client'

import React from 'react'
import { Filter, BookOpen, Code, AlertCircle, GitPullRequest, MessageSquare, Users, GitCommit, Package, FileText, Tag, ShoppingCart } from 'lucide-react'
import { filterCategories, languages } from '@/lib/data'

export default function LeftSidebar() {
  return (
    <aside className="w-64 p-4 border-r border-[#30363d] hidden lg:block">
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center">
          <Filter className="w-4 h-4 mr-2" />
          Filter by
        </h3>
        <div className="space-y-1">
          {filterCategories.map((category) => {
            const IconComponent = BookOpen
            return (
              <div
                key={category.name}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-[#21262d] ${
                  category.active ? 'bg-[#21262d] text-white' : 'text-gray-400'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm">{category.name}</span>
                </div>
                <span className="text-xs bg-[#21262d] px-2 py-1 rounded-full">{category.count}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Languages list removed as requested */}
    </aside>
  )
}
