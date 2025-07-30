// import React, { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import { useAuth } from "../hooks/useAuth"
// import { toast } from "sonner"

// interface Room {
//   roomId: number
//   roomType: string
//   pricePerNight: number
//   capacity: number
//   hotelName: string
//   hotelAddress: string
//   imageUrl: string   //  Added Image
// }

// interface BookingData {
//   checkInDate: string
//   checkOutDate: string
//   guests: number
//   specialRequests: string
// }

// export default function Booking() {
//   const { roomId } = useParams()
//   const navigate = useNavigate()
//   const { user } = useAuth()

//   const [room, setRoom] = useState<Room | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [submitting, setSubmitting] = useState(false)
//   const [bookingData, setBookingData] = useState<BookingData>({
//     checkInDate: "",
//     checkOutDate: "",
//     guests: 1,
//     specialRequests: "",
//   })

//   useEffect(() => {
//     fetchRoomDetails()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [roomId])

//   const fetchRoomDetails = async () => {
//     try {
//       const parsedRoomId = roomId ? parseInt(roomId, 10) : 1
//       const mockRoom: Room = {
//         roomId: parsedRoomId,
//         roomType: "Deluxe Suite",
//         pricePerNight: 349,
//         capacity: 4,
//         hotelName: "Grand Plaza Hotel",
//         hotelAddress: "123 Broadway, New York, NY 10001",
//         imageUrl: "/"
//       }
//       setRoom(mockRoom)
//     } catch {
//       toast.error("Failed to load room details")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const calculateNights = () => {
//     if (!bookingData.checkInDate || !bookingData.checkOutDate) return 0
//     const checkIn = new Date(bookingData.checkInDate)
//     const checkOut = new Date(bookingData.checkOutDate)
//     const diffTime = checkOut.getTime() - checkIn.getTime()
//     return diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0
//   }

//   const nights = calculateNights()
//   const subtotal = nights * (room?.pricePerNight ?? 0)
//   const taxes = subtotal * 0.12
//   const total = subtotal + taxes

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!bookingData.checkInDate || !bookingData.checkOutDate) {
//       toast.error("Please select check-in and check-out dates")
//       return
//     }

//     if (new Date(bookingData.checkInDate) >= new Date(bookingData.checkOutDate)) {
//       toast.error("Check-out date must be after check-in date")
//       return
//     }

//     setSubmitting(true)

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000))
//       toast.success("Booking confirmed! Redirecting to dashboard...")

//       setTimeout(() => {
//         navigate("/dashboard", { state: { showBookings: true } })
//       }, 1500)
//     } catch {
//       toast.error("Booking failed. Please try again.")
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   if (!room) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Room not found</h2>
//           <button onClick={() => navigate("/hotels")} className="text-blue-600 hover:text-blue-800">
//             Back to Hotels
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-4xl mx-auto px-4">
//         <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Booking</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input type="text" value={user?.firstName || ""} disabled className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500" />
//                   <input type="text" value={user?.lastName || ""} disabled className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500" />
//                   <input type="email" value={user?.email || ""} disabled className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500 md:col-span-2" />
//                 </div>
//               </div>

//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-semibold mb-4">Booking Details</h2>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <input type="date" required value={bookingData.checkInDate} min={new Date().toISOString().split("T")[0]} onChange={(e) => setBookingData({ ...bookingData, checkInDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
//                   <input type="date" required value={bookingData.checkOutDate} min={bookingData.checkInDate || new Date().toISOString().split("T")[0]} onChange={(e) => setBookingData({ ...bookingData, checkOutDate: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md" />
//                   <select value={bookingData.guests} onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) })} className="w-full px-3 py-2 border border-gray-300 rounded-md">
//                     {Array.from({ length: room.capacity }, (_, i) => i + 1).map((num) => (
//                       <option key={num} value={num}>{num} Guest{num > 1 ? "s" : ""}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <textarea rows={3} value={bookingData.specialRequests} onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })} className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md" placeholder="Special Requests (Optional)" />
//               </div>

//               <div className="bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
//                 <p className="text-gray-500 text-sm">Payment section is for demo purposes.</p>
//               </div>

//               <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-3">
//                 <input type="checkbox" id="terms" required className="h-4 w-4" />
//                 <label htmlFor="terms" className="text-sm cursor-pointer">I agree to the terms and conditions</label>
//               </div>

//               <button type="submit" disabled={submitting} className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition">
//                 {submitting ? (
//                   <div className="flex items-center justify-center space-x-2">
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                     <span>Processing...</span>
//                   </div>
//                 ) : "Confirm Booking"}
//               </button>
//             </form>
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
//               <p className="font-medium">{room.hotelName}</p>
//               <p className="text-sm text-gray-600 mb-4">{room.hotelAddress}</p>

//               {nights > 0 && (
//                 <div className="border-t pt-4 space-y-2 text-sm">
//                   <div className="flex justify-between"><span>Check-in:</span><span>{bookingData.checkInDate}</span></div>
//                   <div className="flex justify-between"><span>Check-out:</span><span>{bookingData.checkOutDate}</span></div>
//                   <div className="flex justify-between"><span>Guests:</span><span>{bookingData.guests}</span></div>
//                   <div className="flex justify-between"><span>{nights} night(s)</span><span>${subtotal.toFixed(2)}</span></div>
//                   <div className="flex justify-between"><span>Taxes & Fees</span><span>${taxes.toFixed(2)}</span></div>
//                   <div className="flex justify-between font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { toast } from "sonner"
import type { ApiResponse, MpesaInitiateResponse } from "../types/api"
import { apiService } from "@/services/api"

interface Room {
  roomId: number
  roomType: string
  pricePerNight: number
  capacity: number
  hotelName: string
  hotelAddress: string
  imageUrl: string
}

interface BookingData {
  checkInDate: string
  checkOutDate: string
  guests: number
}

export default function BookingPage() {
  const { roomId } = useParams()
  const [room, setRoom] = useState<Room | null>(null)
  const [bookingData, setBookingData] = useState<BookingData>({
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  })
  const [submitting, setSubmitting] = useState(false)
  const [mpesaLoading, setMpesaLoading] = useState(false)

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRoomDetails = async () => {
      const response = await fetch(`/api/rooms/${roomId}`)
      const data = await response.json()
      if (!response.ok) {
        toast.error("Error fetching room details")
        return
      }
      setRoom(data)
    }
    fetchRoomDetails()
  }, [roomId])

  const calculateNights = () => {
    const checkIn = new Date(bookingData.checkInDate)
    const checkOut = new Date(bookingData.checkOutDate)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const nights = calculateNights()
  const subtotal = room ? nights * room.pricePerNight : 0
  const taxes = subtotal * 0.12
  const total = subtotal + taxes

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!room || !user) {
      toast.error("Missing room or user information.")
      return
    }

    setSubmitting(true)

    try {
      const response: ApiResponse<any> = await apiService.post("/bookings", {
        ...bookingData,
        userId: user.userId,
        roomId: room.roomId,
      })

      if (!response.success) {
        toast.error(response.message || "Failed to book room.")
        return
      }

      toast.success("Booking successful!")

      setTimeout(() => {
        navigate("/payment", {
          state: {
            roomId: room.roomId,
            total: total.toFixed(2),
            user: {
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone,
            },
            bookingData,
          },
        })
      }, 1500)
    } catch (err: any) {
      toast.error(err.message || "Booking failed.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleMpesaPayment = async () => {
    if (!bookingData.checkInDate || !bookingData.checkOutDate) {
      toast.error("Please fill in check-in and check-out dates")
      return
    }

    if (!room || !user) {
      toast.error("Missing booking or user data")
      return
    }

    const totalAmount = subtotal + taxes
    setMpesaLoading(true)

    try {
      const res: ApiResponse<MpesaInitiateResponse> = await apiService.post("/mpesa/initiate", {
        amount: totalAmount,
        phoneNumber: user.phone,
        bookingDetails: {
          roomId: room.roomId,
          hotelName: room.hotelName,
          checkInDate: bookingData.checkInDate,
          checkOutDate: bookingData.checkOutDate,
          guests: bookingData.guests,
        },
      })

      if (!res.success) throw new Error(res.message)
      toast.success("STK Push sent to your phone.")
    } catch (err: any) {
      toast.error(err.message || "Payment failed.")
    } finally {
      setMpesaLoading(false)
    }
  }

  if (!room) return <p className="p-4">Loading...</p>

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">{room.hotelName}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <img
          src={room.imageUrl}
          alt={room.roomType}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-semibold">{room.roomType}</h2>
        <p className="text-gray-600">{room.hotelAddress}</p>
        <p className="text-gray-800 font-medium mt-2">
          KES {room.pricePerNight} per night
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Check-in Date</label>
          <input
            type="date"
            name="checkInDate"
            value={bookingData.checkInDate}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label>Check-out Date</label>
          <input
            type="date"
            name="checkOutDate"
            value={bookingData.checkOutDate}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label>Number of Guests</label>
          <input
            type="number"
            name="guests"
            value={bookingData.guests}
            onChange={handleChange}
            min={1}
            max={room.capacity}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <p>Nights: {nights}</p>
          <p>Subtotal: KES {subtotal.toFixed(2)}</p>
          <p>Taxes: KES {taxes.toFixed(2)}</p>
          <p className="font-bold">Total: KES {total.toFixed(2)}</p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {submitting ? "Booking..." : "Confirm Booking"}
        </button>
      </form>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleMpesaPayment}
          disabled={mpesaLoading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {mpesaLoading ? "Processing M-Pesa..." : "Pay with M-Pesa"}
        </button>
      </div>
    </div>
  )
}
