// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Request/Response Types for Authentication
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  contactPhone?: string
  address?: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user: {
    userId: number
    firstName: string
    lastName: string
    email: string
    contactPhone?: string
    address?: string
    userType: "member" | "admin"
  }
  token: string
}

// Hotel and Room Types
export interface HotelFilters {
  location?: string
  minRating?: number
  maxPrice?: number
  category?: string
  page?: number
  limit?: number
}

// Booking Types
export interface CreateBookingRequest {
  roomId: number
  checkInDate: string
  checkOutDate: string
  totalAmount: string
  guests?: number
  specialRequests?: string
}

export interface BookingWithDetails {
  bookingId: number
  userId: number
  roomId: number
  checkInDate?: string
  checkOutDate?: string
  totalAmount?: string
  bookingStatus: "Pending" | "Confirmed" | "Cancelled"
  createdAt: string
  updatedAt: string
  roomType?: string
  roomCapacity?: number
  hotelName?: string
  hotelAddress?: string
  userFirstName?: string
  userLastName?: string
  userEmail?: string
}

// Payment Types
export interface CreatePaymentRequest {
  bookingId: number
  amount: string
  paymentMethod: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardholderName?: string
}

// Support Ticket Types
export interface CreateTicketRequest {
  subject: string
  description: string
}

export interface SupportTicketWithUser {
  ticketId: number
  userId: number
  subject?: string
  description?: string
  status: "Open" | "Resolved"
  createdAt: string
  updatedAt: string
  userFirstName?: string
  userLastName?: string
  userEmail?: string
}
