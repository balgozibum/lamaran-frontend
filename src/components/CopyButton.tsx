import { Check, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'

/** Copies a value for visitors whose device has no mail app set up for mailto links. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [copied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // Clipboard can be blocked; the address stays visible on the button to copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
      title={copied ? 'Copied' : 'Copy address'}
      className="grid size-11 shrink-0 place-items-center rounded-md border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:text-ink"
    >
      {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
    </button>
  )
}
