import type { DocumentType } from '@/app/page'

export type TemplateId = 'quiet-line' | 'ledger' | 'studio' | 'receipt-grid' | 'mono-mark' | 'soft-form'

export type TemplateMeta = {
  id: TemplateId
  name: string
  category: string
  description: string
  supportedTypes: DocumentType[]
  accent: 'coral' | 'teal' | 'gold' | 'ink'
}

export const TEMPLATES: TemplateMeta[] = [
  { id: 'quiet-line', name: 'Quiet line', category: 'Minimal', description: 'Quiet hierarchy with plenty of room to breathe.', supportedTypes: ['Invoice', 'Payment Confirmation'], accent: 'coral' },
  { id: 'ledger', name: 'Ledger', category: 'Professional', description: 'Clear, confident, and built for repeat work.', supportedTypes: ['Invoice', 'Receipt'], accent: 'ink' },
  { id: 'studio', name: 'Studio', category: 'Modern', description: 'A bold editorial layout for creative teams.', supportedTypes: ['Invoice', 'Receipt', 'Payment Confirmation'], accent: 'teal' },
  { id: 'receipt-grid', name: 'Grid receipt', category: 'Retail', description: 'Fast, friendly, and easy to scan at checkout.', supportedTypes: ['Receipt'], accent: 'gold' },
  { id: 'mono-mark', name: 'Mono mark', category: 'Luxury', description: 'A restrained premium frame for important moments.', supportedTypes: ['Invoice', 'Payment Confirmation'], accent: 'ink' },
  { id: 'soft-form', name: 'Soft form', category: 'Service', description: 'Warm structure for service-based businesses.', supportedTypes: ['Invoice', 'Receipt'], accent: 'teal' },
]

export const DEFAULT_TEMPLATE_ID: TemplateId = 'quiet-line'
export const getTemplate = (id: TemplateId) => TEMPLATES.find((template) => template.id === id) ?? TEMPLATES[0]
export const supportsDocumentType = (template: TemplateMeta, type: DocumentType) => template.supportedTypes.includes(type)
