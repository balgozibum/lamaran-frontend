import { ExternalLink, FileText, Mail, MessageCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { routeTone } from '../data/routes.ts'
import { formatPhone, hostOf, mailtoHref, whatsappHref } from '../lib/apply.ts'
import { cn } from '../lib/cn.ts'
import type { Job } from '../types/job.ts'
import { CopyButton } from './CopyButton.tsx'

interface ActionLinkProps {
  href: string
  tone: string
  external: boolean
  children: ReactNode
}

function ActionLink({ href, tone, external, children }: ActionLinkProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'flex min-h-11 w-full min-w-0 items-center gap-2.5 rounded-md px-3.5 py-2.5 text-sm font-semibold leading-tight transition-[filter] hover:brightness-110',
        tone,
      )}
    >
      {children}
    </a>
  )
}

/** The apply action, labelled with its real destination so visitors know where the click goes. */
export function ApplyPanel({ job }: { job: Job }) {
  const { apply } = job
  const tone = routeTone[apply.kind].solid

  if (apply.kind === 'email') {
    return (
      <div className="flex flex-col gap-2">
        {apply.addresses.map((address) => (
          <div key={address} className="flex gap-2">
            <ActionLink href={mailtoHref(address, job)} tone={tone} external={false}>
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-xs font-medium opacity-85">Email your CV to</span>
                <span className="block break-all">{address}</span>
              </span>
            </ActionLink>
            <CopyButton value={address} label={address} />
          </div>
        ))}
        {apply.whatsapp && (
          <a
            href={whatsappHref(apply.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted underline decoration-line-strong underline-offset-4 hover:text-ink"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp {formatPhone(apply.whatsapp)}
          </a>
        )}
      </div>
    )
  }

  const isForm = apply.kind === 'form'
  return (
    <ActionLink href={apply.url} tone={tone} external>
      {isForm ? <FileText className="size-4 shrink-0" aria-hidden="true" /> : <ExternalLink className="size-4 shrink-0" aria-hidden="true" />}
      <span className="min-w-0">
        <span className="block text-xs font-medium opacity-85">{isForm ? 'Fill in the form on' : 'Apply on'}</span>
        <span className="block break-all">{hostOf(apply.url)}</span>
      </span>
      <span className="sr-only">(opens in a new tab)</span>
    </ActionLink>
  )
}
