import type { DocumentCustomization } from '@/lib/document/types'
import type { TemplateId } from './registry'

export const DEFAULT_CUSTOMIZATION: Record<TemplateId, DocumentCustomization> = {
  'quiet-line': { primaryColor: '#E96D52', secondaryColor: '#EEECE7', textColor: '#202321', fontFamily: 'DM Sans', borderStyle: 'subtle', borderRadius: 8, density: 'comfortable', showLogo: true, logoText: 'K', showFooter: true, showNotes: true, showBusiness: true, showCustomer: true, showItemNumbers: false, showQuantity: true, showUnitPrice: true, showLineTotal: true },
  ledger: { primaryColor: '#202321', secondaryColor: '#C49349', textColor: '#202321', fontFamily: 'Inter', borderStyle: 'solid', borderRadius: 4, density: 'compact', showLogo: true, logoText: 'K', showFooter: true, showNotes: true, showBusiness: true, showCustomer: true, showItemNumbers: true, showQuantity: true, showUnitPrice: true, showLineTotal: true },
  studio: { primaryColor: '#2E9E8F', secondaryColor: '#D9F0EB', textColor: '#202321', fontFamily: 'Manrope', borderStyle: 'none', borderRadius: 16, density: 'spacious', showLogo: true, logoText: 'K', showFooter: true, showNotes: true, showBusiness: true, showCustomer: true, showItemNumbers: false, showQuantity: true, showUnitPrice: true, showLineTotal: true },
  'receipt-grid': { primaryColor: '#C49349', secondaryColor: '#F1E5CB', textColor: '#202321', fontFamily: 'DM Sans', borderStyle: 'solid', borderRadius: 2, density: 'compact', showLogo: true, logoText: 'K', showFooter: true, showNotes: false, showBusiness: true, showCustomer: true, showItemNumbers: true, showQuantity: true, showUnitPrice: true, showLineTotal: true },
  'mono-mark': { primaryColor: '#202321', secondaryColor: '#E96D52', textColor: '#F7F6F2', fontFamily: 'Plus Jakarta Sans', borderStyle: 'solid', borderRadius: 0, density: 'comfortable', showLogo: true, logoText: 'K', showFooter: true, showNotes: true, showBusiness: true, showCustomer: true, showItemNumbers: false, showQuantity: true, showUnitPrice: true, showLineTotal: true },
  'soft-form': { primaryColor: '#2E9E8F', secondaryColor: '#D9F0EB', textColor: '#202321', fontFamily: 'DM Serif Display', borderStyle: 'subtle', borderRadius: 20, density: 'spacious', showLogo: true, logoText: 'K', showFooter: true, showNotes: true, showBusiness: true, showCustomer: true, showItemNumbers: false, showQuantity: true, showUnitPrice: true, showLineTotal: true },
}

export const getDefaultCustomization = (id: TemplateId) => ({ ...DEFAULT_CUSTOMIZATION[id] })
