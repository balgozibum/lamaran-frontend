import type { Job } from '../types/job.ts'

/** "jobs.lever.co" from a full URL, without "www.". */
export function hostOf(url: string): string {
  return new URL(url).hostname.replace(/^www\./, '')
}

export function mailtoHref(address: string, job: Job): string {
  const subject = `Application: ${job.role} – ${job.company}`
  return `mailto:${address}?subject=${encodeURIComponent(subject)}`
}

export function whatsappHref(phone: string): string {
  return `https://wa.me/${phone.replace(/\D/g, '')}`
}

/** "+65 8034 4033" for display. */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  return `+${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`
}
