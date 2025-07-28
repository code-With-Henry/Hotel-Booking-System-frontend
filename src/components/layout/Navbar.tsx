import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { Hotel, Menu, X, User, LogOut } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth() as { user: { firstName: string } | null; logout: () => void }
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
    setShowUserMenu(false)
  }

  return (
    <nav className="bg-blue-400 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Hotel className="h-8 w-8 text-yellow-600" />
              <span className="text-xl font-bold text-gray-900">HotelBook</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-yellow-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/hotels" className="text-yellow-400 hover:text-white transition-colors">
              Hotels
            </Link>
            <Link to="/about" className="text-yellow-400 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-yellow-400 hover:text-white transition-colors">
              Contact
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-yellow-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>{user.firstName}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/support"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Support
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 inline mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-yellow-600 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-yellow-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-yellow-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/hotels"
                className="block px-3 py-2 text-gray-700 hover:text-yellow-600"
                onClick={() => setIsOpen(false)}
              >
                Hotels
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 text-gray-700 hover:text-yellow-600"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-yellow-600"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:text-yellow-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/support"
                    className="block px-3 py-2 text-gray-700 hover:text-yellow-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Support
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-yellow-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-gray-700 hover:text-yellow-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block px-3 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 mx-3"
                    onClick={() => setIsOpen(false)}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
