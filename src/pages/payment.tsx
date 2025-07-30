
import { useLocation, useNavigate } from "react-router-dom"

export default function PaymentPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state

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

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
        <p><strong>Room ID:</strong> {roomId}</p>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Check-in:</strong> {bookingData.checkInDate}</p>
        <p><strong>Check-out:</strong> {bookingData.checkOutDate}</p>
        <p className="text-lg font-semibold mt-4">
          Total Amount: <span className="text-green-600">KES {total}</span>
        </p>

        <button
          className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          onClick={() => alert("Coming soon: integrate real payment here.")}
        >
          Pay Now
        </button>
      </div>
    </div>
  )
}
