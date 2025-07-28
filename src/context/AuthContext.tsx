
import { createContext, useState, useEffect, type ReactNode } from "react"
import axios from "axios"

interface UserType {
  userId: number
  id: string
  firstName: string
  lastName: string
  email: string
  userType: "admin" | "member"
}

interface RegisterInput {
  firstName: string
  lastName: string
  email: string
  password: string
  contactPhone?: string
  address?: string
}

interface AuthContextType {
  user: UserType | null
  login: (email: string, password: string) => Promise<UserType>
  logout: () => void
  register: (data: RegisterInput) => Promise<void>
  loading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null)
  const [loading, setLoading] = useState(true)

  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api"

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser))
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
      } catch (err) {
        console.error("Failed to parse stored user", err)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/auth/login", { email, password })
      const { token, userId, firstName, lastName, email: userEmail, userType } = response.data

      const userData: UserType = {
        id: userId.toString(),
        userId,
        firstName,
        lastName,
        email: userEmail,
        userType,
      }

      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      localStorage.setItem("token", token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      return userData
    } catch (err) {
      throw err
    }
  }

  const register = async (data: RegisterInput) => {
    try {
      await axios.post("/auth/register", data)
    } catch (err) {
      throw err
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    delete axios.defaults.headers.common["Authorization"]
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

