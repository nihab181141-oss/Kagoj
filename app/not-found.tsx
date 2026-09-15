import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="error-state" role="status">
      <div className="eyebrow teal">PAGE NOT FOUND</div>
      <h1>That page moved<span>.</span></h1>
      <p>The document or workspace view you requested is no longer available.</p>
      <Link className="button primary" href="/">Return to Kagoj</Link>
    </main>
  )
}
