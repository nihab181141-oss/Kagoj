'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[v0] Application error:', error)
  }, [error])

  return (
    <main className="error-state" role="alert">
      <div className="eyebrow coral">KAGOJ COULD NOT LOAD</div>
      <h1>Let&apos;s try that again<span>.</span></h1>
      <p>Your work is safe. Reload the workspace or return to the start.</p>
      <div className="error-actions">
        <button className="button primary" onClick={() => reset()}>Try again</button>
        <a className="button ghost" href="/">Back to Kagoj</a>
      </div>
    </main>
  )
}
