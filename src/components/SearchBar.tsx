'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'

interface SearchBarProps {
  initialValue?: string
  onSearch: (query: string) => void
  placeholder?: string
}

export default function SearchBar({ initialValue = '', onSearch, placeholder = 'Search GitHub' }: SearchBarProps) {
  const [value, setValue] = useState(initialValue)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  // debounce callback (300ms)
  const debounced = useCallback((v: string) => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => onSearch(v), 300)
  }, [onSearch])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    debounced(e.target.value)
  }

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (timerRef.current) window.clearTimeout(timerRef.current)
    onSearch(value.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        aria-label="Search"
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]"
      />
    </form>
  )
}
