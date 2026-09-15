import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'kagoj — Beautiful business documents, instantly',
  description: 'Create polished invoices, receipts, quotations and business documents for your Bangladesh-first business.',
  generator: 'v0.app',
  metadataBase: new URL('https://kagoj.app'),
  openGraph: { title: 'kagoj — Beautiful business documents, instantly', description: 'Create polished business documents in seconds.', type: 'website', siteName: 'kagoj' },
  twitter: { card: 'summary_large_image', title: 'kagoj — Beautiful business documents, instantly', description: 'Create polished business documents in seconds.' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f7f6f2',
  viewportFit: 'cover',
  userScalable: false,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body>{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body>
    </html>
  )
}
