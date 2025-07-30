import { useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "sonner"
import type { ApiResponse, MpesaInitiateRequest, MpesaInitiateResponse } from "@/types/api"
import { apiService } from "@/services/api"



interface LocationState {
  roomId: number
  total: number
  user: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  bookingData: {
    roomId: number
    hotelName: string
    checkInDate: string
    checkOutDate: string
    guests: number
  }
}

export default function PaymentPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LocationState | null
  const [loading, setLoading] = useState(false)

  if (!state) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>
          <p className="text-lg font-semibold text-red-500">
            No booking data available.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            onClick={() => navigate("/hotels")}
          >
            Back to Hotels
          </button>
        </div>
      </div>
    )
  }

  const { roomId, total, user, bookingData } = state

  const handleMpesaPayment = async () => {
    try {
      setLoading(true)

      const payload: MpesaInitiateRequest = {
        amount: total,
        phoneNumber: user.phone,
        bookingDetails: bookingData,
      }

      const res: ApiResponse<MpesaInitiateResponse> = await apiService.post(
        "/mpesa/initiate",
        payload
      )

      if (res.success) {
        toast.success(res.data?.CustomerMessage || "M-Pesa request sent")
      } else {
        toast.error(res.message || "Failed to initiate M-Pesa payment")
      }
    } catch (error: any) {
      console.error("M-Pesa payment error:", error)
      toast.error("Error processing M-Pesa payment")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
        <p>
          <strong>Room ID:</strong> {roomId}
        </p>
        <p>
          <strong>Name:</strong> {user.firstName} {user.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Check-in:</strong> {bookingData.checkInDate}
        </p>
        <p>
          <strong>Check-out:</strong> {bookingData.checkOutDate}
        </p>
        <p className="text-lg font-semibold mt-4">
          Total Amount: <span className="text-green-600">KES {total}</span>
        </p>

        <button
          className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-60"
          onClick={handleMpesaPayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay with M-Pesa"}
        </button>
      </div>
    </div>
  )
}
