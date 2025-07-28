import type React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"

interface ProtectedRouteProps {
  children: React.ReactNode
  adminOnly?: boolean
}

export default function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Admin route protection
  if (adminOnly && user.userType !== "admin") {
    return <Navigate to="/dashboard" replace />
  }

  // If admin tries to access /dashboard, redirect them to /admin
  if (!adminOnly && user.userType === "admin" && location.pathname === "/dashboard") {
    return <Navigate to="/admin" replace />
  }

  return <>{children}</>
}
