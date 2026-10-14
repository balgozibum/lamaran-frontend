// Validates src/data/jobs.ts: unique ids, real https links, no job-board or LinkedIn apply links,
// and well-formed email addresses. Run with `npm run check:data`.
import { jobs } from '../src/data/jobs.ts'

const BLOCKED_HOSTS = ['linkedin.com', 'lnkd.in', 'bit.ly']
const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
const errors: string[] = []
const ids = new Set<string>()

function checkUrl(id: string, field: string, value: string) {
  let url: URL
  try {
    url = new URL(value)
  } catch {
    errors.push(`${id}: ${field} is not a URL (${value})`)
    return
  }
  if (url.protocol !== 'https:') errors.push(`${id}: ${field} must use https (${value})`)
  if (BLOCKED_HOSTS.some((host) => url.hostname.endsWith(host))) errors.push(`${id}: ${field} points to ${url.hostname}`)
}

for (const job of jobs) {
  if (ids.has(job.id)) errors.push(`${job.id}: duplicate id`)
  ids.add(job.id)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(job.savedAt)) errors.push(`${job.id}: savedAt must be YYYY-MM-DD`)
  if (!job.about.trim()) errors.push(`${job.id}: about is empty`)
  checkUrl(job.id, 'website', job.website)
  if (job.apply.kind === 'email') {
    if (job.apply.addresses.length === 0) errors.push(`${job.id}: no email address`)
    for (const address of job.apply.addresses) {
      if (!EMAIL.test(address)) errors.push(`${job.id}: bad email ${address}`)
    }
  } else {
    checkUrl(job.id, 'apply.url', job.apply.url)
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}
console.log(`✓ ${jobs.length} openings, data valid`)
