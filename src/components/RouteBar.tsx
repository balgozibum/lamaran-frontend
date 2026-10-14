import { routeCopy, routeOrder, routeTone } from '../data/routes.ts'
import { cn } from '../lib/cn.ts'
import type { ApplyKind } from '../types/job.ts'

interface RouteBarProps {
  counts: Record<ApplyKind, number>
  active: ApplyKind | null
  onChange: (route: ApplyKind | null) => void
}

/** The hero's signature: the share of each application route, drawn to scale, doubling as the filter. */
export function RouteBar({ counts, active, onChange }: RouteBarProps) {
  const total = routeOrder.reduce((sum, route) => sum + counts[route], 0)

  return (
    <div>
      <div className="route-bar flex h-4 gap-1 sm:h-5" aria-hidden="true">
        {routeOrder.map((route) => (
          <span
            key={route}
            className={cn(
              'min-w-2 rounded-[3px] transition-opacity',
              routeTone[route].solid,
              active !== null && active !== route && 'opacity-25',
            )}
            style={{ flexGrow: counts[route] }}
          />
        ))}
      </div>

      <fieldset className="mt-4">
        <legend className="sr-only">Filter by how you apply</legend>
        <div className="grid gap-2 sm:grid-cols-[repeat(3,minmax(0,1fr))_auto]">
          {routeOrder.map((route) => {
            const pressed = active === route
            return (
              <button
                key={route}
                type="button"
                aria-pressed={pressed}
                onClick={() => onChange(pressed ? null : route)}
                className={cn(
                  'flex items-baseline gap-3 rounded-md border px-4 py-3 text-left transition-colors',
                  pressed
                    ? cn('border-transparent', routeTone[route].soft)
                    : 'border-line bg-surface hover:border-line-strong',
                )}
              >
                <span className={cn('tabular text-3xl font-extrabold leading-none', routeTone[route].text)}>
                  {counts[route]}
                </span>
                <span className="text-sm leading-snug text-muted">{routeCopy[route].countLabel}</span>
              </button>
            )
          })}
          <button
            type="button"
            aria-pressed={active === null}
            onClick={() => onChange(null)}
            className={cn(
              'rounded-md border px-4 py-3 text-sm font-semibold transition-colors',
              active === null ? 'border-ink bg-ink text-paper' : 'border-line bg-surface hover:border-line-strong',
            )}
          >
            All {total}
          </button>
        </div>
      </fieldset>
    </div>
  )
}
