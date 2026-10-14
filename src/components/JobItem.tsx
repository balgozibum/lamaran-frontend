import { TriangleAlert } from 'lucide-react'
import { hostOf } from '../lib/apply.ts'
import type { Job } from '../types/job.ts'
import { ApplyPanel } from './ApplyPanel.tsx'
import { JobDetails } from './JobDetails.tsx'

interface JobItemProps {
  job: Job
  applied: boolean
  onToggleApplied: (id: string) => void
}

export function JobItem({ job, applied, onToggleApplied }: JobItemProps) {
  const titleId = `job-${job.id}`
  return (
    <article aria-labelledby={titleId} className="grid gap-x-10 gap-y-4 py-7 md:grid-cols-[minmax(0,1fr)_18rem]">
      <div className="min-w-0">
        <h3 id={titleId} className="text-xl font-bold tracking-[-0.015em] sm:text-2xl">
          {job.role}
        </h3>
        <p className="mt-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.95rem]">
          <span className="font-semibold">{job.company}</span>
          <a
            href={job.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted underline decoration-line-strong underline-offset-4 hover:text-ink"
          >
            {hostOf(job.website)}
            <span className="sr-only"> (company website, opens in a new tab)</span>
          </a>
          <span className="text-faint">{job.employment}</span>
        </p>
        <p className="mt-3 max-w-[68ch] text-muted">{job.about}</p>

        {job.skills.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Key skills">
            {job.skills.map((skill) => (
              <li key={skill} className="rounded-sm bg-sunken px-2 py-0.5 text-[0.8rem] font-medium">
                {skill}
              </li>
            ))}
          </ul>
        )}

        {job.caution && (
          <p className="mt-4 flex max-w-[68ch] gap-2.5 rounded-md bg-notice-soft px-3.5 py-2.5 text-sm text-notice">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              <strong className="font-semibold">Check first: </strong>
              {job.caution}
            </span>
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 md:pt-1">
        <ApplyPanel job={job} />
        <label className="flex items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={applied}
            onChange={() => onToggleApplied(job.id)}
            className="size-4 accent-[var(--ink)]"
          />
          I&apos;ve applied
        </label>
      </div>

      {/* Third grid child so on phones the apply button comes before the long requirements list. */}
      <div className="min-w-0 md:col-start-1">
        <JobDetails job={job} />
      </div>
    </article>
  )
}
