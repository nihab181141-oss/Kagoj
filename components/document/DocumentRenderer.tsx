'use client'

import type { DocumentCustomization, DocumentState } from '@/lib/document/types'
import { calculateDocument, calculatePaymentStatus, formatBDT, formatDocumentDate, paymentStatusLabel } from '@/lib/document/helpers'
import { getTemplate, type TemplateId } from '@/lib/templates/registry'
import { getDefaultCustomization } from '@/lib/templates/defaults'

export function DocumentRenderer({ document, templateId = 'quiet-line', customization, compact = false }: { document: DocumentState; templateId?: TemplateId; customization?: Partial<DocumentCustomization>; compact?: boolean }) {
  const template = getTemplate(templateId)
  const style = { ...getDefaultCustomization(templateId), ...customization }
  const totals = calculateDocument(document)
  const paymentStatus = calculatePaymentStatus(totals.total, document.amountPaid)
  const dark = template.id === 'mono-mark' || template.id === 'studio'
  const density = { compact: 0.72, comfortable: 1, spacious: 1.3 }[style.density]
  const itemColumns = [style.showQuantity && 'Qty', style.showUnitPrice && 'Rate', style.showLineTotal && 'Total'].filter(Boolean).length
  return <div className={`template-renderer ${compact ? 'is-compact' : ''} template-${template.id} ${dark ? 'is-dark' : ''} renderer-density-${style.density}`} style={{ '--doc-primary': style.primaryColor, '--doc-secondary': style.secondaryColor, '--doc-text': style.textColor, '--doc-radius': `${style.borderRadius}px`, '--doc-density': density, fontFamily: style.fontFamily } as React.CSSProperties}>
    <div className="renderer-topline"><span className="renderer-mark">{style.showLogo ? style.logoText || 'K' : '•'}</span><span>{document.documentType}</span><span>#{document.documentNumber || 'DRAFT'}</span></div>
    <div className="renderer-intro"><div><strong>{document.documentType.toUpperCase()}</strong><small>{formatDocumentDate(document.issueDate)}</small></div><b>{formatBDT(totals.total)}</b></div>{document.showPaymentStamp && <div className={`payment-stamp stamp-${paymentStatus.toLowerCase()}`}>{paymentStatusLabel(paymentStatus)}</div>}
    {(style.showBusiness || style.showCustomer) && <div className="renderer-parties">{style.showBusiness && <div><small>FROM</small><strong>{document.businessName || 'Your business name'}</strong><span>{document.businessAddress || 'Dhaka, Bangladesh'}</span></div>}{style.showCustomer && <div><small>TO</small><strong>{document.customerName || 'Customer name'}</strong><span>{document.customerAddress || 'Customer details'}</span></div>}</div>}
    <div className="renderer-items">{document.items.slice(0, compact ? 3 : 8).map((item, index) => <div key={item.id}><span>{style.showItemNumbers && `${index + 1}. `}{item.description || `Item ${index + 1}`}</span><span>{style.showQuantity && `${item.quantity} × `}{style.showUnitPrice && formatBDT(item.unitPrice)}{style.showLineTotal && itemColumns > 0 && `  ${formatBDT(totals.lineTotals[index])}`}</span></div>)}</div>
    <div className="renderer-total"><span>{totals.amountDue > 0 ? 'TOTAL DUE' : 'TOTAL'}</span><strong>{formatBDT(totals.amountDue > 0 ? totals.amountDue : totals.total)}</strong></div>
    {style.showFooter && <div className="renderer-footer"><span>{style.showNotes ? (document.notes || 'Thank you for your business.') : ' '}</span><span>kagoj.studio</span></div>}
  </div>
}
