import type { DocumentCustomization, DocumentState } from '@/lib/document/types'
import type { TemplateId } from '@/lib/templates/registry'

export type SavedDocumentStatus = 'draft' | 'completed'

export type SavedDocument = {
  id: string
  schemaVersion: 1
  title: string
  status: SavedDocumentStatus
  document: DocumentState
  templateId: TemplateId
  customization: DocumentCustomization
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'kagoj.saved-documents.v1'

function isBrowser() {
  return typeof window !== 'undefined'
}

export function normalizeSavedDocuments(value: unknown): SavedDocument[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is SavedDocument => {
    if (!item || typeof item !== 'object') return false
    const candidate = item as Partial<SavedDocument>
    return typeof candidate.id === 'string' && candidate.document != null && typeof candidate.templateId === 'string'
  }).map((item) => ({
    ...(item as SavedDocument),
    schemaVersion: 1,
    document: { ...({ currency: 'BDT', paymentMethod: 'Cash', paymentReference: '', showPaymentStamp: true } as Pick<DocumentState, 'currency' | 'paymentMethod' | 'paymentReference' | 'showPaymentStamp'>), ...item.document },
    status: item.status === 'completed' ? 'completed' : 'draft',
    title: item.title || `${item.document.documentType} ${item.document.documentNumber}`,
    createdAt: item.createdAt || new Date().toISOString(),
    updatedAt: item.updatedAt || item.createdAt || new Date().toISOString(),
  }))
}

export function getSavedDocuments(): SavedDocument[] {
  if (!isBrowser()) return []
  try { return normalizeSavedDocuments(JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')) } catch { return [] }
}

function writeSavedDocuments(documents: SavedDocument[]) {
  if (isBrowser()) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(documents))
}

export function saveDocument(input: Omit<SavedDocument, 'schemaVersion' | 'createdAt' | 'updatedAt'> & { createdAt?: string; updatedAt?: string }): SavedDocument {
  const existing = getSavedDocuments()
  const previous = existing.find((item) => item.id === input.id)
  const now = new Date().toISOString()
  const saved: SavedDocument = { ...input, schemaVersion: 1, createdAt: input.createdAt || previous?.createdAt || now, updatedAt: input.updatedAt || now }
  writeSavedDocuments([saved, ...existing.filter((item) => item.id !== saved.id)])
  return saved
}

export function deleteSavedDocument(id: string) { writeSavedDocuments(getSavedDocuments().filter((item) => item.id !== id)) }

export function duplicateSavedDocument(id: string): SavedDocument | null {
  const source = getSavedDocuments().find((item) => item.id === id)
  if (!source) return null
  const now = new Date().toISOString()
  const copy: SavedDocument = { ...source, id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, title: `${source.title} copy`, status: 'draft', createdAt: now, updatedAt: now }
  writeSavedDocuments([copy, ...getSavedDocuments()])
  return copy
}

export function clearSavedDocuments() { if (isBrowser()) window.localStorage.removeItem(STORAGE_KEY) }

export { STORAGE_KEY }
