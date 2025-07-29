

import { apiService } from "./api"
import type { User, UserBooking } from "../types"

export const userService = {
  async getUserBookings(): Promise<UserBooking[]> {
    try {
      return await apiService.get<UserBooking[]>("/bookings/my/bookings")
    } catch (error: any) {
      if (error.message?.includes("No bookings found")) {
        return []
      }
      throw error
    }
  },

  async cancelBooking(bookingId: number): Promise<void> {
    await apiService.put(`/bookings/cancel/${bookingId}`)
  },

  async getUserProfile(): Promise<User> {
    return apiService.get<User>("/user/profile")
  },

  async updateUserProfile(userData: Partial<User>): Promise<User> {
    return apiService.put<User>("/user/profile", userData)
  },

  // ✅ Fetch user's booked rooms
  async getUserBookedRooms(): Promise<any[]> {
    return apiService.get<any[]>("/user/rooms")
  },

  // ✅ FIXED: Fetch user's support tickets using correct route
  async getUserSupportTickets(userId: number): Promise<any[]> {
    return apiService.get<any[]>(`/support-tickets/user/${userId}`)
  },

  // ✅ FIXED: Create a new support ticket using correct route
  async createSupportTicket(ticketData: {
    userId: number
    subject: string
    description: string
  }): Promise<void> {
    await apiService.post("/tickets", ticketData)
  },
}

