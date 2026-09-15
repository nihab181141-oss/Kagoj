import type { DocumentState, PaymentStatus } from '@/lib/document/types'

export const calculatePaymentStatus = (total: number, amountPaid: number): PaymentStatus => {
  if (total <= 0) return 'PENDING'
  if (amountPaid <= 0) return 'DUE'
  if (amountPaid >= total) return 'PAID'
  return 'PARTIALLY_PAID'
}
export const paymentStatusLabel = (status: PaymentStatus) => status === 'PARTIALLY_PAID' ? 'PARTIALLY PAID' : status

export const currencySymbol = (currency: DocumentState['currency']) => ({ BDT: '৳', USD: '$', EUR: '€', GBP: '£' })[currency]
export const formatMoney = (value: number, currency: DocumentState['currency'] = 'BDT') => `${currencySymbol(currency)} ${Math.max(0, value).toLocaleString(currency === 'BDT' ? 'en-BD' : 'en-US', { maximumFractionDigits: 2 })}`
export const formatBDT = (value: number) => formatMoney(value, 'BDT')
export const formatDocumentDate = (value: string) => value ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(`${value}T00:00:00`)).toUpperCase() : 'DATE NOT SET'
export const calculateDocument = (document: DocumentState) => {
  const lineTotals = document.items.map(item => Math.max(0, item.quantity) * Math.max(0, item.unitPrice))
  const subtotal = lineTotals.reduce((sum, value) => sum + value, 0)
  const total = Math.max(0, subtotal - Math.max(0, document.discount) + Math.max(0, document.deliveryCharge) + Math.max(0, document.tax))
  return { lineTotals, subtotal, total, amountDue: Math.max(0, total - Math.max(0, document.amountPaid)) }
}
