export type DocumentType = 'Invoice' | 'Receipt' | 'Payment Confirmation'
export type CurrencyCode = 'BDT' | 'USD' | 'EUR' | 'GBP'
export type PaymentMethod = 'Cash' | 'bKash' | 'Nagad' | 'Bank Transfer' | 'Card' | 'COD' | 'Other'
export type PaymentStatus = 'PAID' | 'DUE' | 'PARTIALLY_PAID' | 'PENDING'

export type DocumentItem = {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

export type DocumentState = {
  businessName: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  customerName: string
  customerAddress: string
  customerPhone: string
  customerEmail: string
  documentType: DocumentType
  documentNumber: string
  issueDate: string
  dueDate: string
  notes: string
  items: DocumentItem[]
  discount: number
  deliveryCharge: number
  tax: number
  amountPaid: number
  currency: CurrencyCode
  paymentMethod: PaymentMethod
  paymentReference: string
  showPaymentStamp: boolean
}

export type DocumentCustomization = {
  primaryColor: string
  secondaryColor: string
  textColor: string
  fontFamily: 'DM Sans' | 'Inter' | 'Manrope' | 'Plus Jakarta Sans' | 'DM Serif Display'
  borderStyle: 'none' | 'subtle' | 'solid'
  borderRadius: number
  density: 'compact' | 'comfortable' | 'spacious'
  showLogo: boolean
  logoText: string
  showFooter: boolean
  showNotes: boolean
  showBusiness: boolean
  showCustomer: boolean
  showItemNumbers: boolean
  showQuantity: boolean
  showUnitPrice: boolean
  showLineTotal: boolean
}

export type CalculatedDocument = { lineTotals: number[]; subtotal: number; total: number; amountDue: number }
EOF
