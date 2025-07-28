import type { ReactNode } from "react"

// Database schema types matching your Drizzle schema
export interface User {
  password: string
  userId: number
  firstName: string
  lastName: string
  email: string
  contactPhone?: string | null
  address?: string | null
  userType: "member" | "admin"    
  role: string                    
  createdAt: string
  updatedAt: string
}


export interface Hotel {
  hotelId: number
  name: string
  location: string
  address: string
  contactPhone?: string | null
  category?: string | null
  rating?: number | null
  createdAt: string
  updatedAt: string
}

export interface Room {
  roomId: number
  hotelId: number
  roomType?: string | null
  pricePerNight: string // decimal in DB
  capacity?: number | null
  amenities?: string | null // varchar in DB, not array
  isAvailable: boolean
  createdAt: string
}

export interface Booking {
  bookingId: number
  userId: number
  roomId: number
  checkInDate?: string | null // date in DB
  checkOutDate?: string | null // date in DB
  totalAmount?: string | null // decimal in DB
  bookingStatus: "Pending" | "Confirmed" | "Cancelled"
  createdAt: string
  updatedAt: string
}

export interface Payment {
  paymentId: number
  bookingId: number
  amount?: string | null // decimal in DB
  paymentStatus: "Pending" | "Completed" | "Failed"
  paymentDate: string
  paymentMethod?: string | null
  transactionId?: string | null
  createdAt: string
  updatedAt: string
}

export interface SupportTicket {
  priority: string
  message: any
  ticketId: number
  userId: number
  subject?: string | null
  description?: string | null
  status: "Open" | "Resolved"
  createdAt: string
  updatedAt: string
}

// Frontend-specific interfaces
export interface HotelWithRooms extends Hotel {
  rooms?: Room[]
  images?: string[] // Frontend only
}

export interface BookingWithDetails extends Booking {
  user?: User
  room?: Room
  hotel?: Hotel
  payment?: Payment
}

// User Dashboard specific interfaces
export interface UserBooking {
  room: any
  numberOfGuests: ReactNode
  roomId: ReactNode
  bookingId: number
  hotelName: string
  roomType: string
  checkInDate: string
  checkOutDate: string
  totalAmount: number
  bookingStatus: "Pending" | "Confirmed" | "Cancelled"
  createdAt: string
  hotelAddress: string
  roomCapacity: number
  amenities: string
}

// Admin Dashboard specific interfaces
export interface AdminStats {
  totalHotels: number
  totalRooms: number
  totalBookings: number
  totalRevenue: number
  totalUsers: number
  openTickets: number
}

export interface MonthlyRevenue {
  month: string
  revenue: number
  bookings: number
}
