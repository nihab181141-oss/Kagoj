'use client'

import type { InstantDocument } from '@/lib/instant/types'
import { formatBDT, instantLabel } from '@/lib/instant/types'

export function InstantDocumentPreview({ document }: { document: InstantDocument }) {
  const total = document.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  return <article className="instant-document-preview" aria-label={`${instantLabel(document.mode)} preview`}>
    <div className="instant-doc-top"><div><span className="instant-logo">K</span><strong>{document.businessName || 'Your business'}</strong></div><span className="instant-doc-label">{instantLabel(document.mode)}</span></div>
    <div className="instant-doc-meta"><div><small>TO</small><b>{document.customerName || 'Customer name'}</b></div><div><small>DATE</small><b>{document.date || 'Today'}</b></div><div><small>NO.</small><b>{document.documentNumber}</b></div></div>
    <div className="instant-doc-items">{document.items.map(item => <div key={item.id}><span>{item.description || 'Item'}</span><span>{item.quantity} × {formatBDT(item.unitPrice)}</span><strong>{formatBDT(item.quantity * item.unitPrice)}</strong></div>)}</div>
    <div className="instant-doc-total"><span>{document.mode === 'payment' ? 'AMOUNT RECEIVED' : 'TOTAL DUE'}</span><strong>{formatBDT(document.mode === 'payment' ? document.amountPaid || total : total)}</strong></div>
    {(document.mode !== 'invoice' || document.paymentMethod) && <div className="instant-doc-payment"><span>Payment method</span><b>{document.paymentMethod}{document.reference ? ` · ${document.reference}` : ''}</b></div>}
    {document.notes && <p className="instant-doc-notes">{document.notes}</p>}
    <div className="instant-doc-footer">Generated with Kagoj · kagoj.app</div>
  </article>
}
