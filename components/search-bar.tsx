"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { searchSuggestions } from "@/lib/portfolio-data"

interface SearchBarProps {
  initialQuery?: string
  autoFocus?: boolean
  compact?: boolean
}

export function SearchBar({ initialQuery = "", autoFocus = false, compact = false }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filteredSuggestions = searchSuggestions
    .filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()) && query.length > 0)
    .slice(0, 8)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  const handleSearch = (searchQuery: string) => {
    const trimmed = searchQuery.trim()
    if (trimmed) {
      setShowSuggestions(false)
      router.push(`/search?q=${encodeURIComponent(trimmed)}`)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev < filteredSuggestions.length - 1 ? prev + 1 : prev))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1))
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (selectedIndex >= 0) {
        handleSearch(filteredSuggestions[selectedIndex])
      } else {
        handleSearch(query)
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelectedIndex(-1)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={handleKeyDown}
          className={`w-full bg-white text-black
            border-2 border-[#cccccc]
            focus:outline-none focus:border-[#666666]
            ${compact ? "px-3 py-1 text-[12px]" : "px-4 py-2 text-[14px]"}`}
          placeholder={compact ? "Search" : "Search my portfolio..."}
          style={{
            fontFamily: "Arial, Helvetica, sans-serif",
          }}
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border-2 border-t-0 border-[#cccccc] z-50 overflow-hidden">
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => handleSearch(suggestion)}
                className={`w-full text-left px-3 py-1 text-[12px] border-b border-[#cccccc] last:border-b-0
                  ${index === selectedIndex ? "bg-[#c0c0c0]" : "hover:bg-[#c0c0c0]"}`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      {!compact && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button
            type="submit"
            className="px-4 py-1 text-[12px] text-black
              bg-[#c0c0c0] border-2 border-[#dfdfdf]
              active:border-[#808080]"
            style={{
              boxShadow: "1px 1px 0px #ffffff inset, -1px -1px 0px #808080 inset",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            Jos_zenith Search
          </button>
          <button
            type="button"
            onClick={() => {
              handleSearch("lucky")
            }}
            className="px-4 py-1 text-[12px] text-black
              bg-[#c0c0c0] border-2 border-[#dfdfdf]
              active:border-[#808080]"
            style={{
              boxShadow: "1px 1px 0px #ffffff inset, -1px -1px 0px #808080 inset",
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            I&apos;m Feeling Lucky
          </button>
        </div>
      )}

      {/* Quick category links */}
      {!compact && (
        <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px]">
          {["about", "experience", "projects", "skills", "achievements", "certifications", "contact"].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handleSearch(term)}
              className="text-[#0000cc] underline capitalize"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </form>
  )
}
