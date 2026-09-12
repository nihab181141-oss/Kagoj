export type BusinessType = 'Retail' | 'Service' | 'Freelancer' | 'Online business' | 'Other'

export type UserProfile = {
  businessName: string
  ownerName: string
  position: string
  businessType: BusinessType | ''
  country: string
  currency: 'BDT' | 'USD' | 'EUR' | 'GBP'
  logoDataUrl: string
}

export const emptyUserProfile = (): UserProfile => ({
  businessName: '', ownerName: '', position: '', businessType: '', country: 'Bangladesh', currency: 'BDT', logoDataUrl: '',
})
