export type QuoteStatus =
  | 'PENDING'
  | 'CONSULTING_REQUIRED'
  | 'CONSULTING_PAID'
  | 'QUOTED'
  | 'APPROVED'
  | 'DEPOSIT_PAID'
  | 'PAID'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED'

export interface ServiceCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  order: number
  subcategories: ServiceSubcategory[]
}

export interface ServiceSubcategory {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string | null
  priceType: 'fixed' | 'range' | 'starting_from' | 'hourly'
  minPrice: number | null
  maxPrice: number | null
  basePrice: number | null
  estimatedDays: number | null
  features: string[]
  requiresConsulting: boolean
  consultingHoursMin: number | null
  consultingHoursMax: number | null
  consultingPrice: number | null
  consultingCriteria: string | null
  addons: ServiceAddon[]
  formFields: FormField[]
}

export interface ServiceAddon {
  id: string
  name: string
  description: string | null
  price: number
  priceType: 'fixed' | 'percentage'
}

export interface FormField {
  id: string
  label: string
  fieldType: 'text' | 'textarea' | 'number' | 'select' | 'multiselect' | 'boolean' | 'email'
  required: boolean
  placeholder: string | null
  helpText: string | null
  options: FormFieldOption[] | null
}

export interface FormFieldOption {
  label: string
  value: string
  priceModifier?: number
}

export interface QuoteEstimate {
  basePrice: number
  addonsPrice: number
  fieldModifiers: number
  total: number
  requiresConsulting: boolean
  consultingPrice: number | null
  consultingHours: number | null
  depositAmount: number
}

export interface CreateQuoteInput {
  subcategoryId: string
  addonIds: string[]
  fieldValues: Record<string, unknown>
  contactName: string
  contactEmail: string
  contactPhone?: string
  company?: string
  notes?: string
  estimatedTotal: number
}

export interface QuoteFieldValueResponse {
  label: string
  value: string
}

export interface QuoteResponse {
  id: string
  reference: string
  status: QuoteStatus
  token: string
  totalEstimate: number
  depositAmount: number
  paidAmount: number
  requiresConsulting: boolean
  consulting: {
    hours: number
    price: number
    status: 'PENDING' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED'
  } | null
  contactName: string
  contactEmail: string
  statusUrl: string
  items: {
    subcategoryName: string
    quantity: number
    unitPrice: number
    totalPrice: number
  }[]
  addons: {
    name: string
    price: number
  }[]
  fieldValues: QuoteFieldValueResponse[]
  statusHistory: {
    status: QuoteStatus
    timestamp: string
  }[]
  createdAt: string
}

export interface PaymentProvider {
  name: string
  methods: string[]
}

export interface PaymentResponse {
  redirectUrl: string
  quoteStatus: QuoteStatus
}

export interface AuthUser {
  id: string
  email: string
  name: string | null
  role: 'CLIENT' | 'ADMIN'
}

export interface QuoteListItem {
  id: string
  reference: string
  status: QuoteStatus
  contactName: string
  contactEmail: string
  totalEstimate: number
  createdAt: string
  subcategoryName: string
}

export interface PaginatedQuotes {
  data: QuoteListItem[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}
