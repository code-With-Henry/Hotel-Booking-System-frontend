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

  // ✅ Fetch user's support tickets using userId
  async getUserSupportTickets(userId: number): Promise<any[]> {
    return apiService.get<any[]>(`/tickets/user/${userId}`)
  },

  // ✅ Create a new support ticket
  async createSupportTicket(ticketData: {
    userId: number
    subject: string
    description: string
  }): Promise<void> {
    await apiService.post("/tickets", ticketData)
  },
}
