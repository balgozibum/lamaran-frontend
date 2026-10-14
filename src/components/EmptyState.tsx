export function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="mt-10 rounded-md border border-dashed border-line-strong px-6 py-12 text-center">
      <p className="text-lg font-semibold">No openings match these filters.</p>
      <p className="mt-1 text-muted">Try a shorter search, or show every opening again.</p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-md bg-ink px-4 py-2 text-sm font-semibold text-paper hover:opacity-90"
      >
        Show all openings
      </button>
    </div>
  )
}
