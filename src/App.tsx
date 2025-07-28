

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "sonner"
import { useAuth } from "./hooks/useAuth"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Hotels from "./pages/Hotels"
import Booking from "./pages/Booking"
import BookingConfirmation from "./pages/BookingConfirmation"
import UserDashboard from "./pages/dashboard/UserDashboard"
import AdminDashboard from "./pages/dashboard/AdminDashboard"
import Support from "./pages/Support"
import About from "./pages/About"
import Contact from "./pages/Contact"
import HotelDetails from "./pages/HotelDetail"
import ProtectedRoute from "./components/auth/protectedRoute"
import { AuthProvider } from "./context/AuthContext"


function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public routes with navbar */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path="/hotels"
          element={
            <>
              <Navbar />
              <Hotels />
              <Footer />
            </>
          }
        />
        <Route
          path="/hotels/:id"
          element={
            <>
              <Navbar />
              <HotelDetails />
              <Footer />
            </>
          }
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to={user.userType === "admin" ? "/admin" : "/hotels"} />
            ) : (
              <>
                <Navbar />
                <Login />
                <Footer />
              </>
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to={user.userType === "admin" ? "/admin" : "/hotels"} />
            ) : (
              <>
                <Navbar />
                <Register />
                <Footer />
              </>
            )
          }
        />

        {/* Protected Routes */}
        <Route
          path="/booking/:roomId"
          element={
            <ProtectedRoute>
              <Navbar />
              <Booking />
              <Footer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking-confirmation/:bookingId"
          element={
            <ProtectedRoute>
              <BookingConfirmation />
            </ProtectedRoute>
          }
        />

        {/* Dashboard Routes - No Navbar/Footer */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>{user?.userType === "admin" ? <Navigate to="/admin" /> : <UserDashboard />}</ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <Navbar />
              <Support />
              <Footer />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App

