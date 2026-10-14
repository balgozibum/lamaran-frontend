// Opens every apply link and company site and reports anything that does not answer 2xx/3xx.
// Some sites refuse scripted requests (401 sign-in walls, 403/406/429 bot protection); those are
// listed with "·" for a manual look in a browser but not counted as broken.
import { jobs } from '../src/data/jobs.ts'

const targets = jobs.flatMap((job) => [
  { id: job.id, url: job.website },
  ...(job.apply.kind === 'email' ? [] : [{ id: job.id, url: job.apply.url }]),
])

const REFUSED = new Set([401, 403, 406, 429])
let broken = 0
for (const { id, url } of targets) {
  try {
    const response = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0' }, signal: AbortSignal.timeout(20000) })
    const refused = REFUSED.has(response.status)
    if (!response.ok && !refused) broken += 1
    console.log(`${response.ok ? '✓' : refused ? '·' : '✗'} ${response.status} ${id} ${url}`)
  } catch (error) {
    broken += 1
    console.log(`✗ ERR ${id} ${url} (${(error as Error).message})`)
  }
}

console.log(broken === 0 ? `\nAll ${targets.length} links answered.` : `\n${broken} of ${targets.length} links failed.`)
process.exit(broken === 0 ? 0 : 1)
