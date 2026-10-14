import { ShieldAlert } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-line">
      <div className="mx-auto flex max-w-6xl gap-3 px-4 py-10 sm:px-6">
        <ShieldAlert className="mt-0.5 size-5 shrink-0 text-email" aria-hidden="true" />
        <p className="max-w-[62ch] text-muted">
          <strong className="font-semibold text-ink">Never pay anything to apply for these openings.</strong> No real
          employer asks for a registration fee, training fee, equipment deposit, or visa payment. If anyone does,
          stop and do not send money.
        </p>
      </div>
    </footer>
  )
}
