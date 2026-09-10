import type { DocumentCustomization, DocumentState } from '@/lib/document/types'
import { calculateDocument, formatBDT, formatDocumentDate } from '@/lib/document/helpers'
import { getTemplate, type TemplateId } from '@/lib/templates/registry'
import { getDefaultCustomization } from '@/lib/templates/defaults'

export type ExportStatus = 'idle' | 'working' | 'success' | 'error'

export function sanitizeFilename(value: string) {
  const safe = value.trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()
  return safe || 'kagoj-document'
}

export function getDocumentFilename(document: DocumentState) {
  return `${sanitizeFilename(document.businessName)}-${sanitizeFilename(document.documentType)}-${sanitizeFilename(document.documentNumber || 'draft')}.pdf`
}

function hexToRgb(hex: string) {
  const clean = hex.replace('#', '')
  const value = clean.length === 3 ? clean.split('').map(char => char + char).join('') : clean
  return { r: parseInt(value.slice(0, 2), 16), g: parseInt(value.slice(2, 4), 16), b: parseInt(value.slice(4, 6), 16) }
}

export async function createPdfBlob(document: DocumentState, templateId: TemplateId, customization?: Partial<DocumentCustomization>) {
  const { jsPDF } = await import('jspdf')
  const template = getTemplate(templateId)
  const style = { ...getDefaultCustomization(templateId), ...customization }
  const totals = calculateDocument(document)
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
  const primary = hexToRgb(style.primaryColor)
  const margin = 18
  const width = 210
  const right = width - margin
  let y = 20
  const line = (offset = 0) => { pdf.setDrawColor(primary.r, primary.g, primary.b); pdf.line(margin, y + offset, right, y + offset) }
  pdf.setTextColor(32, 35, 33)
  pdf.setFont('helvetica', 'bold'); pdf.setFontSize(22); pdf.text(style.showLogo ? style.logoText || 'Kagoj' : document.businessName || 'Kagoj', margin, y)
  pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9); pdf.text(template.name, right, y, { align: 'right' }); y += 8
  pdf.setTextColor(90, 94, 90); pdf.text(document.businessName || 'Your business name', margin, y); pdf.text(document.businessAddress || 'Dhaka, Bangladesh', margin, y + 5); y += 14
  pdf.setTextColor(32, 35, 33); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(26); pdf.text(document.documentType, margin, y); pdf.setFontSize(10); pdf.text(`#${document.documentNumber || 'DRAFT'}`, right, y, { align: 'right' }); y += 6
  pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9); pdf.text(`Issue date: ${formatDocumentDate(document.issueDate)}`, right, y, { align: 'right' }); y += 10; line(); y += 10
  pdf.setFont('helvetica', 'bold'); pdf.setFontSize(9); pdf.text('BILL TO', margin, y); pdf.setFont('helvetica', 'normal'); pdf.text(document.customerName || 'Customer name', margin, y + 6); pdf.text(document.customerAddress || 'Customer details', margin, y + 11); y += 23
  const columns = [margin, 112, 135, 160, right]
  pdf.setFillColor(primary.r, primary.g, primary.b); pdf.rect(margin, y - 5, right - margin, 8, 'F'); pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.text('DESCRIPTION', columns[0] + 2, y); pdf.text('QTY', columns[1], y); pdf.text('RATE', columns[2], y); pdf.text('TOTAL', columns[3], y); y += 10
  pdf.setTextColor(32, 35, 33); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9)
  document.items.forEach((item, index) => { if (y > 260) { pdf.addPage(); y = 20 } pdf.text(`${style.showItemNumbers ? `${index + 1}. ` : ''}${item.description || `Item ${index + 1}`}`.slice(0, 54), columns[0] + 2, y); pdf.text(String(item.quantity), columns[1], y); pdf.text(formatBDT(item.unitPrice), columns[2], y); pdf.text(formatBDT(totals.lineTotals[index]), columns[3], y); y += 9 })
  y += 5; line(); y += 12
  pdf.setFont('helvetica', 'normal'); pdf.text('Subtotal', 135, y); pdf.text(formatBDT(totals.subtotal), right, y, { align: 'right' }); y += 7
  if (document.discount) { pdf.text('Discount', 135, y); pdf.text(`-${formatBDT(document.discount)}`, right, y, { align: 'right' }); y += 7 }
  if (document.deliveryCharge) { pdf.text('Delivery charge', 135, y); pdf.text(formatBDT(document.deliveryCharge), right, y, { align: 'right' }); y += 7 }
  if (document.tax) { pdf.text('Tax', 135, y); pdf.text(formatBDT(document.tax), right, y, { align: 'right' }); y += 7 }
  pdf.setFont('helvetica', 'bold'); pdf.setFontSize(14); pdf.text(totals.amountDue > 0 ? 'Amount due' : 'Total', 135, y + 3); pdf.setTextColor(primary.r, primary.g, primary.b); pdf.text(formatBDT(totals.amountDue > 0 ? totals.amountDue : totals.total), right, y + 3, { align: 'right' }); y += 18
  if (style.showNotes && document.notes) { pdf.setTextColor(90, 94, 90); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(9); pdf.text(document.notes, margin, y) }
  return pdf.output('blob') as Blob
}

export async function downloadDocument(document: DocumentState, templateId: TemplateId, customization?: Partial<DocumentCustomization>) {
  const blob = await createPdfBlob(document, templateId, customization)
  const url = URL.createObjectURL(blob); const anchor = window.document.createElement('a'); anchor.href = url; anchor.download = getDocumentFilename(document); anchor.click(); URL.revokeObjectURL(url)
}

export function printDocument() { window.print() }

export async function shareDocument(document: DocumentState, templateId: TemplateId, customization?: Partial<DocumentCustomization>) {
  const blob = await createPdfBlob(document, templateId, customization)
  const file = new File([blob], getDocumentFilename(document), { type: 'application/pdf' })
  if (navigator.share && navigator.canShare?.({ files: [file] })) { await navigator.share({ title: `${document.documentType} from ${document.businessName}`, files: [file] }); return 'shared' as const }
  await downloadDocument(document, templateId, customization); return 'downloaded' as const
}
