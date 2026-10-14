import { useCallback, useState } from 'react'

const STORAGE_KEY = 'frontend-openings:applied'

function readStored(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [])
  } catch {
    return new Set()
  }
}

/** Which openings this visitor has marked as applied. Lives only in this browser. */
export function useAppliedJobs() {
  const [applied, setApplied] = useState<Set<string>>(readStored)

  const toggle = useCallback((id: string) => {
    setApplied((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {
        // Storage can be unavailable (private mode); the mark still works for this visit.
      }
      return next
    })
  }, [])

  return { applied, toggle }
}
