/** How a candidate sends the application. Each kind gets its own color and action across the site. */
export type ApplyRoute =
  | { kind: 'email'; addresses: string[]; whatsapp?: string }
  | { kind: 'website'; url: string }
  | { kind: 'form'; url: string }

export type ApplyKind = ApplyRoute['kind']

export interface Job {
  id: string
  role: string
  company: string
  website: string
  /** ISO date the posting was saved in the source spreadsheet. */
  savedAt: string
  employment: string
  apply: ApplyRoute
  /** One or two sentences about the company, rewritten from the posting. */
  about: string
  /** Requirements as written in the posting; null when the spreadsheet only had a placeholder. */
  requirements: string[] | null
  /** Process notes or extra instructions from the posting. */
  notes: string[]
  /** Something to check before applying, stated as fact from the posting. */
  caution?: string
  skills: string[]
}
