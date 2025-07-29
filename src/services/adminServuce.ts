
import { apiService } from "./api"
import type { Hotel, Room, Booking, SupportTicket, User } from "../types"

export interface CreateUserInput {
  firstName: string
  lastName: string
  email: string
  password: string
  contactPhone?: string | null
  address?: string | null
  userType: "member" | "admin"
}

export const adminService = {
  // ✅ Hotels management
  async getAllHotels(): Promise<Hotel[]> {
    return apiService.get<Hotel[]>("/hotels")
  },

  async createHotel(hotelData: Omit<Hotel, "hotelId" | "createdAt" | "updatedAt">): Promise<Hotel> {
    return apiService.post<Hotel>("/hotels", hotelData)
  },

  async updateHotel(id: number, hotelData: Partial<Hotel>): Promise<Hotel> {
    return apiService.put<Hotel>(`/hotels/${id}`, hotelData)
  },

  async deleteHotel(id: number): Promise<void> {
    return apiService.delete(`/hotels/${id}`)
  },

  // ✅ Rooms management
  async getAllRooms(): Promise<Room[]> {
    return apiService.get<Room[]>("/rooms")
  },

  async createRoom(roomData: Omit<Room, "roomId" | "createdAt">): Promise<Room> {
    return apiService.post<Room>("/rooms", roomData)
  },

  async updateRoom(id: number, roomData: Partial<Room>): Promise<Room> {
    return apiService.put<Room>(`/rooms/${id}`, roomData)
  },

  async deleteRoom(id: number): Promise<void> {
    return apiService.delete(`/rooms/${id}`)
  },

  // ✅ Bookings management — matches backend: `/api/bookings/bookings`
  async getAllBookings(): Promise<Booking[]> {
    return apiService.get<Booking[]>("/bookings/bookings")
  },

  // ✅ Support tickets — matches backend: `/api/tickets`
  async getAllSupportTickets(): Promise<SupportTicket[]> {
    return apiService.get<SupportTicket[]>("//support-tickets")
  },

  // ✅ Users management
  async getAllUsers(): Promise<User[]> {
    return apiService.get<User[]>("/users")
  },

  async createUser(userData: CreateUserInput): Promise<User> {
    return apiService.post<User>("/users", userData)
  },

  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    return apiService.put<User>(`/users/${id}`, userData)
  },

  async deleteUser(id: number): Promise<void> {
    return apiService.delete(`/users/${id}`)
  },
}
