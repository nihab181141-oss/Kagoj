export default function Loading() {
  return (
    <main className="loading-state" aria-live="polite" aria-busy="true">
      <span className="loading-mark" aria-hidden="true">K</span>
      <p>Preparing your document studio…</p>
    </main>
  )
}
