import { apiService } from "./api"

export interface Booking {
  bookingId: number
  userId: number
  roomId: number
  checkInDate?: string
  checkOutDate?: string
  totalAmount?: string
  bookingStatus: "Pending" | "Confirmed" | "Cancelled"
  createdAt: string
  updatedAt: string
}

export interface BookingWithDetails extends Booking {
  user?: {
    firstName: string
    lastName: string
    email: string
  }
  room?: {
    roomType?: string
    hotel?: {
      name: string
      address: string
    }
  }
  payment?: {
    paymentStatus: "Pending" | "Completed" | "Failed"
    paymentMethod?: string
  }
}

export interface CreateBookingRequest {
  roomId: number
  checkInDate: string
  checkOutDate: string
  totalAmount: string
  guests?: number
  specialRequests?: string
}

export const bookingService = {
  async createBooking(bookingData: CreateBookingRequest): Promise<Booking> {
    return apiService.post<Booking>("/bookings", bookingData)
  },

  // ✅ Fixed: changed from "/bookings/user" to "/bookings"
  async getUserBookings(): Promise<BookingWithDetails[]> {
    return apiService.get<BookingWithDetails[]>("/bookings")
  },

  async getBookingById(id: number): Promise<BookingWithDetails> {
    return apiService.get<BookingWithDetails>(`/bookings/${id}`)
  },

  async cancelBooking(id: number): Promise<Booking> {
    return apiService.put<Booking>(`/bookings/${id}/cancel`)
  },

  // Admin endpoints
  async getAllBookings(): Promise<BookingWithDetails[]> {
    return apiService.get<BookingWithDetails[]>("/bookings/admin")
  },

  async updateBookingStatus(id: number, status: "Pending" | "Confirmed" | "Cancelled"): Promise<Booking> {
    return apiService.put<Booking>(`/bookings/${id}/status`, { status })
  },
}

