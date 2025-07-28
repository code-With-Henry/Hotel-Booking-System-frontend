import { apiService } from "./api"

export interface Hotel {
  hotelId: number
  name: string
  location: string
  address: string
  contactPhone?: string
  category?: string
  rating?: number
  createdAt: string
  updatedAt: string
}

export interface Room {
  roomId: number
  hotelId: number
  roomType?: string
  pricePerNight: string
  capacity?: number
  amenities?: string
  isAvailable: boolean
  createdAt: string
}

export interface HotelFilters {
  location?: string
  minRating?: number
  maxPrice?: number
  category?: string
  page?: number
  limit?: number
}

export const hotelService = {
  async getHotels(filters: HotelFilters = {}): Promise<{ hotels: Hotel[]; total: number }> {
    const queryParams = new URLSearchParams()

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        queryParams.append(key, value.toString())
      }
    })

    return apiService.get<{ hotels: Hotel[]; total: number }>(`/hotels?${queryParams}`)
  },

  async getHotelById(id: number): Promise<Hotel> {
    return apiService.get<Hotel>(`/hotels/${id}`)
  },

  async getHotelRooms(hotelId: number): Promise<Room[]> {
    return apiService.get<Room[]>(`/hotels/${hotelId}/rooms`)
  },

  async getRoomById(roomId: number): Promise<Room> {
    return apiService.get<Room>(`/rooms/${roomId}`)
  },

  async createBooking(bookingData: any): Promise<any> {
    return apiService.post('/bookings', bookingData)
  },

  async getAvailableRooms(hotelId: number, checkInDate: string, checkOutDate: string): Promise<Room[]> {
    return apiService.get<Room[]>(`/hotels/${hotelId}/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`)
  }
}
