import { Search } from 'lucide-react'

interface ToolbarProps {
  query: string
  onQueryChange: (query: string) => void
  hideApplied: boolean
  onHideAppliedChange: (hide: boolean) => void
  appliedCount: number
  shown: number
  total: number
}

export function Toolbar({ query, onQueryChange, hideApplied, onHideAppliedChange, appliedCount, shown, total }: ToolbarProps) {
  return (
    <div className="sticky top-0 z-10 border-y border-line bg-paper/90 backdrop-blur">
      <search className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3 sm:px-6">
        <label className="relative min-w-0 flex-1 basis-64">
          <span className="sr-only">Search roles, companies, or skills</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-faint" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search role, company, or skill"
            className="w-full rounded-md border border-line bg-surface py-2 pr-3 pl-9 text-base placeholder:text-faint focus:border-ink focus:outline-none"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={hideApplied}
            onChange={(event) => onHideAppliedChange(event.target.checked)}
            className="size-4 accent-[var(--ink)]"
          />
          Hide applied ({appliedCount})
        </label>
        <output className="tabular text-sm text-muted" aria-live="polite">
          Showing {shown} of {total}
        </output>
      </search>
    </div>
  )
}
