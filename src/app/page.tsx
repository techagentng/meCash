'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchPage() {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      router.push(`/results?q=${encodeURIComponent(searchInput)}`)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#010409] text-white flex flex-col items-center justify-start pt-24 relative overflow-hidden">

      <h1 className="text-5xl font-black tracking-tight mb-10">GitHub</h1>

      <div className="w-full max-w-2xl px-6">
        <form onSubmit={handleSearch}>
          <div className="relative group">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search GitHub"
              className="w-full bg-transparent border border-[#4b5563] rounded-lg px-12 py-3 text-lg focus:outline-none focus:border-blue-400 transition"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-400"
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.1-5.4A7.75 7.75 0 1110.75 3a7.75 7.75 0 017.75 7.75z"/>
            </svg>
          </div>
        </form>

        <p className="text-gray-400 text-sm mt-3 text-center">
          Tip: For an <span className="text-blue-400 cursor-pointer hover:underline">advanced search</span>, use our <span className="text-blue-400 cursor-pointer hover:underline">prefixes</span>.
        </p>
      </div>

      <img
        src="/home-mobile-dark.png"
        alt="GitHub Art"
        className="w-[550px] mt-20 pointer-events-none select-none opacity-95"
      />
    </div>
  )
}
