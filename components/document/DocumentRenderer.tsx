'use client'

import type { CSSProperties } from 'react'
import type { DocumentCustomization, DocumentState } from '@/lib/document/types'
import { calculateDocument, calculatePaymentStatus, formatBDT, formatDocumentDate, paymentStatusLabel } from '@/lib/document/helpers'
import { getTemplate, type TemplateId } from '@/lib/templates/registry'
import { getDefaultCustomization } from '@/lib/templates/defaults'

const value = (text: string, empty = '—') => text.trim() || empty

export function DocumentRenderer({ document, templateId = 'quiet-line', customization, compact = false }: { document: DocumentState; templateId?: TemplateId; customization?: Partial<DocumentCustomization>; compact?: boolean }) {
  const template = getTemplate(templateId)
  const style = { ...getDefaultCustomization(templateId), ...customization }
  const totals = calculateDocument(document)
  const paymentStatus = calculatePaymentStatus(totals.total, document.amountPaid)
  const density = { compact: 0.78, comfortable: 1, spacious: 1.18 }[style.density]
  const paperStyle = { '--doc-primary': style.primaryColor, '--doc-secondary': style.secondaryColor, '--doc-text': style.textColor, '--doc-radius': `${style.borderRadius}px`, '--doc-density': density, fontFamily: style.fontFamily } as CSSProperties
  return <article className={`a4-paper template-renderer ${compact ? 'is-compact' : ''} template-${template.id} renderer-density-${style.density}`} style={paperStyle}>
    <header className="a4-header"><div className="a4-brand">{style.showLogo && <span className="a4-logo">{value(style.logoText, 'K')}</span>}<div><strong>{value(document.businessName, 'Your business')}</strong><span>{value(document.businessAddress)}</span>{document.businessPhone && <span>{document.businessPhone}</span>}{document.businessEmail && <span>{document.businessEmail}</span>}</div></div><div className="a4-title"><span>{document.documentType.toUpperCase()}</span><strong>{value(document.documentNumber, 'DRAFT')}</strong><small>{formatDocumentDate(document.issueDate)}</small></div></header>
    <div className="a4-meta"><div><small>Bill to</small><strong>{value(document.customerName, 'Customer name')}</strong><span>{value(document.customerAddress)}</span>{document.customerPhone && <span>{document.customerPhone}</span>}{document.customerEmail && <span>{document.customerEmail}</span>}</div><dl><div><dt>Issue date</dt><dd>{formatDocumentDate(document.issueDate)}</dd></div><div><dt>Due date</dt><dd>{formatDocumentDate(document.dueDate)}</dd></div><div><dt>Payment</dt><dd>{value(document.paymentMethod)}</dd></div>{document.paymentReference && <div><dt>Reference</dt><dd>{document.paymentReference}</dd></div>}</dl></div>
    <div className="a4-items"><div className="a4-item-row a4-item-head"><span>Description</span>{style.showQuantity && <span>Qty</span>}{style.showUnitPrice && <span>Rate</span>}{style.showLineTotal && <span>Amount</span>}</div>{document.items.map((item, index) => <div className="a4-item-row" key={item.id}><span>{style.showItemNumbers && `${index + 1}. `}{value(item.description, 'Item description')}</span>{style.showQuantity && <span>{item.quantity}</span>}{style.showUnitPrice && <span>{formatBDT(item.unitPrice)}</span>}{style.showLineTotal && <span>{formatBDT(totals.lineTotals[index] || 0)}</span>}</div>)}</div>
    <div className="a4-bottom"><div className="a4-copy">{style.showNotes && <section><small>Notes</small><p>{value(document.notes)}</p></section>}<section><small>Payment status</small><p className={`a4-status status-${paymentStatus.toLowerCase()}`}>{paymentStatusLabel(paymentStatus)}</p></section></div><div className="a4-totals"><div><span>Subtotal</span><strong>{formatBDT(totals.subtotal)}</strong></div>{document.discount > 0 && <div><span>Discount</span><strong>-{formatBDT(document.discount)}</strong></div>}{document.deliveryCharge > 0 && <div><span>Delivery</span><strong>{formatBDT(document.deliveryCharge)}</strong></div>}{document.tax > 0 && <div><span>Tax</span><strong>{formatBDT(document.tax)}</strong></div>}<div className="a4-total"><span>{totals.amountDue > 0 ? 'Amount due' : 'Total'}</span><strong>{formatBDT(totals.amountDue > 0 ? totals.amountDue : totals.total)}</strong></div>{document.amountPaid > 0 && <div><span>Amount paid</span><strong>{formatBDT(document.amountPaid)}</strong></div>}{document.amountPaid > 0 && <div className="a4-balance"><span>Balance due</span><strong>{formatBDT(Math.max(0, totals.amountDue))}</strong></div>}</div></div>
    {style.showFooter && <footer className="a4-footer"><span>{value(document.notes, 'Thank you for your business.')}</span><span>Generated with Kagoj</span></footer>}
  </article>
}
