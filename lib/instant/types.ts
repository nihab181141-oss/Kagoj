import type { DocumentItem, DocumentState, DocumentType } from '@/lib/document/types'

export type InstantMode = 'invoice' | 'receipt' | 'payment'
export type InstantCurrency = 'BDT' | 'USD' | 'EUR'
export type InstantPaymentMethod = 'Cash' | 'bKash' | 'Nagad' | 'Bank Transfer' | 'Card'

export type InstantDocument = {
  mode: InstantMode
  businessName: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  customerName: string
  customerAddress: string
  customerPhone: string
  customerEmail: string
  shipToName: string
  shipToAddress: string
  documentNumber: string
  date: string
  dueDate: string
  currency: InstantCurrency
  paymentMethod: InstantPaymentMethod
  reference: string
  items: DocumentItem[]
  discount: number
  deliveryCharge: number
  tax: number
  amountPaid: number
  notes: string
  terms: string
  paymentTerms: string
  poNumber: string
  logoUrl: string
}

export const INSTANT_MODES: { id: InstantMode; label: string; description: string }[] = [
  { id: 'invoice', label: 'Invoice', description: 'Request payment professionally.' },
  { id: 'receipt', label: 'Receipt', description: 'Confirm a completed purchase.' },
  { id: 'payment', label: 'Payment Confirmation', description: 'Share proof of payment.' },
]

export const instantDefaults = (mode: InstantMode): InstantDocument => ({
  mode, businessName: '', businessAddress: '', businessPhone: '', businessEmail: '', customerName: '', customerAddress: '', customerPhone: '', customerEmail: '', shipToName: '', shipToAddress: '', documentNumber: '', date: new Date().toISOString().slice(0, 10), dueDate: '', currency: 'BDT', paymentMethod: 'bKash', reference: '', items: [{ id: `instant-${Date.now()}`, description: '', quantity: 1, unitPrice: 0 }], discount: 0, deliveryCharge: 0, tax: 0, amountPaid: 0, notes: '', terms: '', paymentTerms: '', poNumber: '', logoUrl: '',
})

export const instantTotal = (document: InstantDocument) => {
  const subtotal = document.items.reduce((sum, item) => sum + Math.max(0, item.quantity) * Math.max(0, item.unitPrice), 0)
  return Math.max(0, subtotal - document.discount + document.deliveryCharge + document.tax)
}
export const instantSubtotal = (document: InstantDocument) => document.items.reduce((sum, item) => sum + Math.max(0, item.quantity) * Math.max(0, item.unitPrice), 0)
export const instantLabel = (mode: InstantMode) => mode === 'invoice' ? 'INVOICE' : mode === 'receipt' ? 'RECEIPT' : 'PAYMENT CONFIRMATION'
export const instantTitle = (mode: InstantMode) => mode === 'invoice' ? 'Create an invoice' : mode === 'receipt' ? 'Create a receipt' : 'Confirm a payment'
export const currencySymbol = (currency: InstantCurrency) => currency === 'BDT' ? '৳' : currency === 'USD' ? '$' : '€'
export const formatInstantMoney = (value: number, currency: InstantCurrency = 'BDT') => `${currencySymbol(currency)}${Math.round(Math.max(0, value)).toLocaleString(currency === 'BDT' ? 'en-BD' : 'en-US')}`
export const formatBDT = (value: number) => formatInstantMoney(value, 'BDT')
export const instantToDocument = (doc: InstantDocument): DocumentState => ({ businessName: doc.businessName || 'Your business', businessAddress: doc.businessAddress, businessPhone: doc.businessPhone, businessEmail: doc.businessEmail, customerName: doc.customerName || 'Customer name', customerAddress: doc.customerAddress, customerPhone: doc.customerPhone, customerEmail: doc.customerEmail, documentType: doc.mode === 'invoice' ? 'Invoice' : doc.mode === 'receipt' ? 'Receipt' : 'Payment Confirmation', documentNumber: doc.documentNumber, issueDate: doc.date, dueDate: doc.dueDate || doc.date, notes: doc.notes, items: doc.items, discount: doc.discount, deliveryCharge: doc.deliveryCharge, tax: doc.tax, amountPaid: doc.amountPaid })
export const instantModeFromType = (type: DocumentType): InstantMode => type === 'Invoice' ? 'invoice' : type === 'Receipt' ? 'receipt' : 'payment'
export const isInstantReady = (doc: InstantDocument) => Boolean(doc.businessName.trim() && doc.customerName.trim() && doc.items.some(item => item.description.trim() && item.unitPrice > 0))
export const emptyInstantField = (value: string, fallback: string) => value.trim() || fallback
