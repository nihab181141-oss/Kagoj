'use client'

import type { DocumentState } from '@/app/page'
import type { TemplateId } from '@/lib/templates/registry'
import { calculateDocument, formatBDT, formatDocumentDate } from '@/lib/document/helpers'
import { getTemplate } from '@/lib/templates/registry'

export function DocumentRenderer({ document, templateId = 'quiet-line', compact = false }: { document: DocumentState; templateId?: TemplateId; compact?: boolean }) {
  const template = getTemplate(templateId)
  const totals = calculateDocument(document)
  const isDark = template.id === 'mono-mark' || template.id === 'studio'
  return (
    <div className={`template-renderer ${compact ? 'is-compact' : ''} template-${template.id} ${isDark ? 'is-dark' : ''}`}>
      <div className="renderer-topline"><span className="renderer-mark">K</span><span>{document.documentType}</span><span>#{document.documentNumber || 'DRAFT'}</span></div>
      <div className="renderer-intro"><div><strong>{document.documentType.toUpperCase()}</strong><small>{formatDocumentDate(document.issueDate)}</small></div><b>{formatBDT(totals.total)}</b></div>
      <div className="renderer-parties"><div><small>FROM</small><strong>{document.businessName || 'Your business name'}</strong><span>{document.businessAddress || 'Dhaka, Bangladesh'}</span></div><div><small>TO</small><strong>{document.customerName || 'Customer name'}</strong><span>{document.customerAddress || 'Customer details'}</span></div></div>
      <div className="renderer-items">{document.items.slice(0, compact ? 3 : 8).map((item, index) => <div key={item.id}><span>{item.description || `Item ${index + 1}`}</span><span>{formatBDT(totals.lineTotals[index])}</span></div>)}</div>
      <div className="renderer-total"><span>{totals.amountDue > 0 ? 'TOTAL DUE' : 'TOTAL'}</span><strong>{formatBDT(totals.amountDue > 0 ? totals.amountDue : totals.total)}</strong></div>
      <div className="renderer-footer"><span>{document.notes || 'Thank you for your business.'}</span><span>kagoj.studio</span></div>
    </div>
  )
}
