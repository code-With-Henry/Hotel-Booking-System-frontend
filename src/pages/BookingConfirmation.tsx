
import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { CheckCircle, Calendar, MapPin, Users, Wifi, Car, Coffee, Dumbbell } from "lucide-react"
import { useAuth } from "../hooks/useAuth"

interface BookingDetails {
  bookingId: number
  hotelName: string
  hotelAddress: string
  roomType: string
  checkInDate: string
  checkOutDate: string
  guests: number
  totalAmount: number
  nights: number
  amenities: string[]
  bookingStatus: string
  confirmationNumber: string
}

export default function BookingConfirmation() {
  const { bookingId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to get booking details
    setTimeout(() => {
      setBooking({
        bookingId: Number(bookingId) || 1,
        hotelName: "Grand Palace Hotel",
        hotelAddress: "123 Main Street, New York, NY 10001",
        roomType: "Deluxe Suite",
        checkInDate: "2024-03-15",
        checkOutDate: "2024-03-18",
        guests: 2,
        totalAmount: 450,
        nights: 3,
        amenities: ["WiFi", "Parking", "Breakfast", "Gym"],
        bookingStatus: "Confirmed",
        confirmationNumber: "HTL-2024-001234",
      })
      setLoading(false)
    }, 1000)
  }, [bookingId])

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "parking":
        return <Car className="h-4 w-4" />
      case "breakfast":
        return <Coffee className="h-4 w-4" />
      case "gym":
        return <Dumbbell className="h-4 w-4" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading booking details...</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Booking not found</p>
          <button
            onClick={() => navigate("/hotels")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Browse Hotels
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
          <p className="mt-2 text-gray-600">
            Thank you {user?.firstName}, your reservation has been successfully confirmed.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{booking.hotelName}</h2>
                <div className="flex items-center mt-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-blue-100">{booking.hotelAddress}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-blue-100">Confirmation #</p>
                <p className="text-xl font-bold">{booking.confirmationNumber}</p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Check-in/Check-out */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Check-in</p>
                    <p className="font-semibold">{booking.checkInDate}</p>
                    <p className="text-sm text-gray-500">After 3:00 PM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Check-out</p>
                    <p className="font-semibold">{booking.checkOutDate}</p>
                    <p className="text-sm text-gray-500">Before 11:00 AM</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Guests</p>
                    <p className="font-semibold">{booking.guests} guests</p>
                  </div>
                </div>
              </div>

              {/* Room & Pricing */}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Room Type</p>
                  <p className="font-semibold">{booking.roomType}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-semibold">{booking.nights} nights</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-blue-600">${booking.totalAmount}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    ${Math.round(booking.totalAmount / booking.nights)} per night
                  </p>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Included Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {booking.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2 text-gray-600">
                    {getAmenityIcon(amenity)}
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Information */}
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Important Information</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Please bring a valid ID for check-in</li>
                <li>• Cancellation is free up to 24 hours before check-in</li>
                <li>• Contact the hotel directly for special requests</li>
                <li>• A confirmation email has been sent to {user?.email}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors text-center font-medium"
          >
            View My Bookings
          </Link>
          <Link
            to="/hotels"
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors text-center font-medium"
          >
            Book Another Hotel
          </Link>
          <button
            onClick={() => window.print()}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  )
}
