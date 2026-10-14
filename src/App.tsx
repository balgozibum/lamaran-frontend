import { useMemo, useState } from 'react'
import { EmptyState } from './components/EmptyState.tsx'
import { Footer } from './components/Footer.tsx'
import { Hero } from './components/Hero.tsx'
import { JobGroup } from './components/JobGroup.tsx'
import { Toolbar } from './components/Toolbar.tsx'
import { jobs } from './data/jobs.ts'
import { useAppliedJobs } from './hooks/useAppliedJobs.ts'
import { countByRoute, filterJobs, groupByDay, type JobFilters } from './lib/filterJobs.ts'

const initialFilters: JobFilters = { query: '', route: null, hideApplied: false }
const routeCounts = countByRoute(jobs)

export default function App() {
  const [filters, setFilters] = useState<JobFilters>(initialFilters)
  const { applied, toggle } = useAppliedJobs()

  const visible = useMemo(() => filterJobs(jobs, filters, applied), [filters, applied])
  const groups = useMemo(() => groupByDay(visible), [visible])

  return (
    <>
      <a
        href="#openings"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-20 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to openings
      </a>
      <Hero
        total={jobs.length}
        counts={routeCounts}
        route={filters.route}
        onRouteChange={(route) => setFilters((current) => ({ ...current, route }))}
      />
      <Toolbar
        query={filters.query}
        onQueryChange={(query) => setFilters((current) => ({ ...current, query }))}
        hideApplied={filters.hideApplied}
        onHideAppliedChange={(hideApplied) => setFilters((current) => ({ ...current, hideApplied }))}
        appliedCount={applied.size}
        shown={visible.length}
        total={jobs.length}
      />
      <main id="openings" className="mx-auto max-w-6xl px-4 sm:px-6">
        {groups.length > 0 ? (
          groups.map((group) => (
            <JobGroup key={group.day} day={group.day} jobs={group.jobs} applied={applied} onToggleApplied={toggle} />
          ))
        ) : (
          <EmptyState onReset={() => setFilters(initialFilters)} />
        )}
      </main>
      <Footer />
    </>
  )
}
