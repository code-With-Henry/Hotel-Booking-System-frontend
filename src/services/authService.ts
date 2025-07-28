import { apiService } from "./api"

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

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return apiService.post<AuthResponse>("/auth/login", credentials)
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    return apiService.post<AuthResponse>("/auth/register", userData)
  },

  async logout(): Promise<void> {
    return apiService.post<void>("/auth/logout")
  },

  async verifyToken(): Promise<AuthResponse["user"]> {
    return apiService.get<AuthResponse["user"]>("/auth/verify")
  },
}
