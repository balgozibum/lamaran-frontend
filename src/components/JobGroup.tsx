import { formatDay } from '../lib/dates.ts'
import type { Job } from '../types/job.ts'
import { JobItem } from './JobItem.tsx'

interface JobGroupProps {
  day: string
  jobs: Job[]
  applied: ReadonlySet<string>
  onToggleApplied: (id: string) => void
}

export function JobGroup({ day, jobs, applied, onToggleApplied }: JobGroupProps) {
  const headingId = `day-${day}`
  return (
    <section aria-labelledby={headingId} className="mt-10 first:mt-6">
      <h2 id={headingId} className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-2 text-lg font-bold">
        <span>Saved {formatDay(day)}</span>
        <span className="tabular text-sm font-medium text-muted">
          {jobs.length} {jobs.length === 1 ? 'opening' : 'openings'}
        </span>
      </h2>
      <div className="divide-y divide-line">
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} applied={applied.has(job.id)} onToggleApplied={onToggleApplied} />
        ))}
      </div>
    </section>
  )
}
