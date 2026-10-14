import { site } from '../data/site.ts'
import type { ApplyKind } from '../types/job.ts'
import { RouteBar } from './RouteBar.tsx'

interface HeroProps {
  total: number
  counts: Record<ApplyKind, number>
  route: ApplyKind | null
  onRouteChange: (route: ApplyKind | null) => void
}

export function Hero({ total, counts, route, onRouteChange }: HeroProps) {
  return (
    <header className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:px-6 sm:pt-16">
      <p className="text-sm font-semibold text-muted">{site.name}</p>
      <h1 className="mt-3 max-w-[18ch] text-[clamp(2.4rem,6.5vw,4.6rem)] font-extrabold tracking-[-0.035em]">
        Frontend openings, one click from applying.
      </h1>
      <p className="mt-5 max-w-[62ch] text-lg text-muted">
        {total} roles, and every button names where it takes you: the company&apos;s own careers page, its
        hiring email, or its form.
      </p>
      <div className="mt-10">
        <RouteBar counts={counts} active={route} onChange={onRouteChange} />
      </div>
    </header>
  )
}
