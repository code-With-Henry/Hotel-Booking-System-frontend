// VITE_API_BASE_URL should be defined in your .env file like:
// VITE_API_BASE_URL=https://your-backend-api.azurewebsites.net/api

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://hotel-booking-system.azurewebsites.net/api"

class ApiService {
  private baseURL: string

  constructor() {
    this.baseURL = API_BASE_URL
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    const token = localStorage.getItem("token")

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)

      const contentType = response.headers.get("content-type")

      if (!response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json()
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        } else {
          const text = await response.text()
          console.error(`Unexpected response format:\n${text}`)
          throw new Error(`HTTP error! status: ${response.status} - Non-JSON response`)
        }
      }

      // Expecting JSON response
      return await response.json()
    } catch (error) {
      console.error(`API request failed at endpoint: ${endpoint}`, error)
      throw error
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}

export const apiService = new ApiService()
