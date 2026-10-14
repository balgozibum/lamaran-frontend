import type { ApplyKind } from '../types/job.ts'

interface RouteCopy {
  /** Short name used in the hero bar and filters. */
  name: string
  /** Phrase completing "N openings …" in the hero bar. */
  countLabel: string
}

/** Display order: the most common route first. */
export const routeOrder: ApplyKind[] = ['website', 'email', 'form']

export const routeCopy: Record<ApplyKind, RouteCopy> = {
  website: { name: 'Website', countLabel: 'apply on the company site' },
  email: { name: 'Email', countLabel: 'apply by email' },
  form: { name: 'Form', countLabel: 'apply through a form' },
}

/** Tailwind classes per route, kept together so each color means the same thing everywhere. */
export const routeTone: Record<ApplyKind, { solid: string; soft: string; text: string }> = {
  website: { solid: 'bg-website text-on-route', soft: 'bg-website-soft', text: 'text-website' },
  email: { solid: 'bg-email text-on-route', soft: 'bg-email-soft', text: 'text-email' },
  form: { solid: 'bg-form text-on-route', soft: 'bg-form-soft', text: 'text-form' },
}
