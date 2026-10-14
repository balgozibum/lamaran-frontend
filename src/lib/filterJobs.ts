import type { ApplyKind, Job } from '../types/job.ts'

export interface JobFilters {
  query: string
  route: ApplyKind | null
  hideApplied: boolean
}

function haystack(job: Job): string {
  const contact = job.apply.kind === 'email' ? job.apply.addresses.join(' ') : job.apply.url
  return [job.role, job.company, job.about, contact, ...job.skills, ...(job.requirements ?? [])].join(' ').toLowerCase()
}

export function filterJobs(jobs: Job[], filters: JobFilters, applied: ReadonlySet<string>): Job[] {
  const terms = filters.query.toLowerCase().split(/\s+/).filter(Boolean)
  return jobs.filter(
    (job) =>
      (filters.route === null || job.apply.kind === filters.route) &&
      !(filters.hideApplied && applied.has(job.id)) &&
      terms.every((term) => haystack(job).includes(term)),
  )
}

/** Jobs grouped by the day they were saved, newest day first, keeping source order inside a day. */
export function groupByDay(jobs: Job[]): { day: string; jobs: Job[] }[] {
  const days = [...new Set(jobs.map((job) => job.savedAt))].sort().reverse()
  return days.map((day) => ({ day, jobs: jobs.filter((job) => job.savedAt === day) }))
}

export function countByRoute(jobs: Job[]): Record<ApplyKind, number> {
  const counts: Record<ApplyKind, number> = { website: 0, email: 0, form: 0 }
  for (const job of jobs) counts[job.apply.kind] += 1
  return counts
}
