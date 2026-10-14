import { ChevronDown } from 'lucide-react'
import type { Job } from '../types/job.ts'

export function JobDetails({ job }: { job: Job }) {
  const hasNotes = job.notes.length > 0
  return (
    <details className="group border-t border-line pt-3">
      <summary className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
        <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        {hasNotes ? 'Requirements and how to apply' : 'Requirements'}
      </summary>
      <div className="mt-3 grid gap-5 text-[0.95rem] lg:grid-cols-2">
        <section>
          <h4 className="text-sm font-semibold text-muted">Requirements</h4>
          {job.requirements ? (
            <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-faint">
              {job.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-muted">Not copied into the source sheet. Read them on the job page before applying.</p>
          )}
        </section>
        {hasNotes && (
          <section>
            <h4 className="text-sm font-semibold text-muted">How to apply</h4>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 marker:text-faint">
              {job.notes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </details>
  )
}
