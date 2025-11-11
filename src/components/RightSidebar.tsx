'use client'

import React from 'react'
import { Heart } from 'lucide-react'

export default function RightSidebar() {
  return (
    <aside className="w-80 p-4 border-l border-[#30363d] hidden xl:block">
      <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-4 mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Heart className="w-5 h-5 text-pink-500" />
          <h3 className="font-semibold">Sponsor open source projects you depend on</h3>
        </div>
        <p className="text-sm text-gray-400 mb-4">
          Contributors are working behind the scenes to make open source better for everyone—give them the help and recognition they deserve.
        </p>
        <button className="text-[#58a6ff] text-sm hover:underline">Explore sponsorable projects →</button>
      </div>

      <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-4">
        <h3 className="font-semibold mb-2">How can we improve search?</h3>
        <button className="text-[#58a6ff] text-sm hover:underline">Give feedback</button>
        <div className="mt-4 p-3 bg-[#21262d] rounded-md">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-yellow-400">💡</span>
            <span className="text-gray-300">ProTip!</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Press the <kbd className="bg-[#30363d] px-1 rounded">?</kbd> key to activate the search input again and adjust your query.</p>
        </div>
      </div>
    </aside>
  )
}
