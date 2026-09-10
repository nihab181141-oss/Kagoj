import type { DocumentItem } from '@/lib/document/types'

export type InstantMode = 'invoice' | 'receipt' | 'payment'

export type InstantDocument = {
  mode: InstantMode
  businessName: string
  customerName: string
  documentNumber: string
  date: string
  paymentMethod: 'Cash' | 'bKash' | 'Nagad' | 'Bank Transfer' | 'Card'
  reference: string
  items: DocumentItem[]
  amountPaid: number
  notes: string
}

export const INSTANT_MODES: { id: InstantMode; label: string; description: string }[] = [
  { id: 'invoice', label: 'Invoice', description: 'Request payment professionally.' },
  { id: 'receipt', label: 'Receipt', description: 'Confirm a completed purchase.' },
  { id: 'payment', label: 'Payment Confirmation', description: 'Share proof of payment.' },
]

export const instantDefaults = (mode: InstantMode): InstantDocument => ({
  mode,
  businessName: 'Kagoj Studio',
  customerName: '',
  documentNumber: mode === 'invoice' ? 'INV-001' : mode === 'receipt' ? 'REC-001' : 'PAY-001',
  date: new Date().toISOString().slice(0, 10),
  paymentMethod: 'bKash',
  reference: '',
  items: [{ id: 'instant-1', description: mode === 'payment' ? 'Payment received' : 'Design service', quantity: 1, unitPrice: 0 }],
  amountPaid: 0,
  notes: '',
})

export const instantTotal = (document: InstantDocument) => document.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
export const instantLabel = (mode: InstantMode) => mode === 'invoice' ? 'INVOICE' : mode === 'receipt' ? 'RECEIPT' : 'PAYMENT CONFIRMATION'
export const instantTitle = (mode: InstantMode) => mode === 'invoice' ? 'Create an invoice' : mode === 'receipt' ? 'Create a receipt' : 'Confirm a payment'

export const formatBDT = (value: number) => `৳${Math.round(value).toLocaleString('en-BD')}`
