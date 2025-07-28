
// import { useState, useEffect } from "react"
// import { useNavigate, useLocation } from "react-router-dom"
// import { useAuth } from "../../hooks/useAuth"
// import { Calendar, User, LogOut, CreditCard, X, Home, MessageSquare } from "lucide-react"
// import { toast } from "sonner"
// import type { UserBooking } from "../../types"
// import { userService } from "@/services/userServices"

// export default function UserDashboard() {
//   const { user, logout } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [activeSection, setActiveSection] = useState("dashboard")
//   const [loading, setLoading] = useState(true)
//   const [bookings, setBookings] = useState<UserBooking[]>([])
//   const [showBookingDetails, setShowBookingDetails] = useState(false)
//   const [selectedBooking, setSelectedBooking] = useState<UserBooking | null>(null)

//   useEffect(() => {
//     if (user) {
//       fetchBookings()
//     }
//   }, [user])

//   useEffect(() => {
//     if (location.state?.showBookings) {
//       setActiveSection("bookings")
//     }
//   }, [location.state])

//   const fetchBookings = async () => {
//     try {
//       setLoading(true)
//       const bookingsData = await userService.getUserBookings()
//       setBookings(bookingsData)
//     } catch (error) {
//       console.error("Error fetching bookings:", error)
//       toast.error("Failed to load bookings")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleLogout = () => {
//     logout()
//     navigate("/")
//   }

//   const handleCancelBooking = async (bookingId: number) => {
//     if (!confirm("Are you sure you want to cancel this booking?")) return
//     try {
//       await userService.cancelBooking(bookingId)
//       toast.success("Booking cancelled successfully")
//       fetchBookings()
//     } catch (error) {
//       console.error("Error cancelling booking:", error)
//       toast.error("Failed to cancel booking")
//     }
//   }

//   const renderDashboard = () => (
//     <div className="p-6">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.firstName}!</h1>
//         <p className="text-gray-600 mt-2">Here's your booking overview</p>
//       </div>

//       {loading ? (
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//             <StatCard icon={<Calendar className="h-8 w-8 text-blue-600" />} label="Total Bookings" value={bookings.length} />
//             <StatCard icon={<Calendar className="h-8 w-8 text-green-600" />} label="Active Bookings" value={bookings.filter((b) => b.bookingStatus === "Confirmed").length} />
//             <StatCard icon={<CreditCard className="h-8 w-8 text-purple-600" />} label="Total Spent" value={`$${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}`} />
//           </div>

//           <RecentBookings bookings={bookings} onView={setSelectedBooking} onShowDetails={() => setShowBookingDetails(true)} onCancel={handleCancelBooking} />
//         </>
//       )}
//     </div>
//   )

//   const renderRooms = () => (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-gray-900">My Rooms</h2>
//       <p className="text-gray-600 mt-2">Manage your room listings or view your reservations here.</p>
//       {/* You can add your room management logic here */}
//     </div>
//   )

//   const renderSupport = () => (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
//       <p className="text-gray-600 mt-2">View and manage your support requests here.</p>
//       {/* You can add your support tickets logic here */}
//     </div>
//   )


//   const renderBookings = () => (
//     <div className="p-6">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
//         <p className="text-gray-600 mt-2">Manage your hotel reservations</p>
//       </div>
//       {renderDashboard()}
//     </div>
//   )

//   const renderProfile = () => (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
//       <div className="mt-4 bg-white p-6 rounded-lg shadow">
//         <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
//         <p><strong>Email:</strong> {user?.email}</p>
//         <p><strong>User Type:</strong> {user?.userType}</p>
//       </div>
//     </div>
//   )


//   return (
//     <div className="flex h-screen bg-gray-50">
//       <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={handleLogout} user={user} />
//       <div className="flex-1 overflow-auto">
//         {activeSection === "dashboard" && renderDashboard()}
//         {activeSection === "bookings" && renderBookings()}
//         {activeSection === "profile" && renderProfile()}
//         {activeSection === "rooms" && renderRooms()}
//         {activeSection === "support" && renderSupport()}
//       </div>

//       {showBookingDetails && selectedBooking && (
//         <BookingDetailsModal booking={selectedBooking} onClose={() => setShowBookingDetails(false)} onCancel={handleCancelBooking} />
//       )}
//     </div>
//   )
// }

// // Extracted reusable components
// const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
//   <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow flex items-center">
//     {icon}
//     <div className="ml-4">
//       <p className="text-sm text-gray-600">{label}</p>
//       <p className="text-2xl font-bold">{value}</p>
//     </div>
//   </div>
// )

// const RecentBookings = ({ bookings, onView, onShowDetails, onCancel }: { bookings: UserBooking[], onView: (b: UserBooking) => void, onShowDetails: () => void, onCancel: (id: number) => void }) => (
//   <div className="bg-white rounded-lg shadow p-6">
//     <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
//     {bookings.length === 0 ? (
//       <div className="text-center py-8">
//         <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//         <p className="text-gray-500">No bookings found</p>
//         <p className="text-sm text-gray-400 mt-2">Your bookings will appear here once you make a reservation</p>
//       </div>
//     ) : (
//       <div className="space-y-4">
//         {bookings.slice(0, 5).map((booking) => (
//           <div key={booking.bookingId} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
//             <div className="flex-1">
//               <h4 className="font-medium text-gray-900">Hotel Booking #{booking.bookingId}</h4>
//               <p className="text-sm text-gray-600">{booking.checkInDate} to {booking.checkOutDate}</p>
//               <p className="text-sm text-gray-500">{booking.numberOfGuests} guests</p>
//             </div>
//             <div className="text-right">
//               <p className="font-bold text-gray-900">${booking.totalAmount}</p>
//               <span className={`px-2 py-1 rounded text-xs ${booking.bookingStatus === "Confirmed" ? "bg-green-100 text-green-800" : booking.bookingStatus === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>{booking.bookingStatus}</span>
//             </div>
//             <div className="ml-4 space-x-2">
//               <button onClick={() => { onView(booking); onShowDetails() }} className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
//               {booking.bookingStatus === "Confirmed" && (
//                 <button onClick={() => onCancel(booking.bookingId)} className="text-red-600 hover:text-red-800 text-sm">Cancel</button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// )

// const Sidebar = ({ activeSection, setActiveSection, onLogout, user }: { activeSection: string, setActiveSection: (s: string) => void, onLogout: () => void, user: any }) => (
//   <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
//     <div className="p-6 border-b border-gray-200">
//       <h2 className="text-xl font-bold text-gray-800">User Dashboard</h2>
//       <p className="text-sm text-gray-600 mt-1">Welcome, {user?.firstName}</p>
//     </div>

//     <div className="flex-1 p-4">
//       <nav className="space-y-2">
//         <SidebarButton label="Dashboard" icon={<Calendar className="h-5 w-5" />} active={activeSection === "dashboard"} onClick={() => setActiveSection("dashboard")} />
//         <SidebarButton label="My Bookings" icon={<Calendar className="h-5 w-5" />} active={activeSection === "bookings"} onClick={() => setActiveSection("bookings")} />
//         <SidebarButton label="My Rooms" icon={<Home className="h-5 w-5" />} active={activeSection === "rooms"} onClick={() => setActiveSection("rooms")} />
//         <SidebarButton label="Support Tickets" icon={<MessageSquare className="h-5 w-5" />} active={activeSection === "support"} onClick={() => setActiveSection("support")} />
//         <SidebarButton label="Profile" icon={<User className="h-5 w-5" />} active={activeSection === "profile"} onClick={() => setActiveSection("profile")} />
//       </nav>
//     </div>

//     <div className="p-4 border-t border-gray-200">
//       <button onClick={onLogout} className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
//         <LogOut className="h-5 w-5" />
//         <span>Logout</span>
//       </button>
//     </div>
//   </div>
// )

// const SidebarButton = ({ label, icon, active, onClick }: { label: string, icon: React.ReactNode, active: boolean, onClick: () => void }) => (
//   <button onClick={onClick} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${active ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"}`}>
//     {icon}
//     <span>{label}</span>
//   </button>
// )

// const BookingDetailsModal = ({ booking, onClose, onCancel }: { booking: UserBooking, onClose: () => void, onCancel: (id: number) => void }) => (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//     <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold">Booking Details</h3>
//         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//           <X className="h-6 w-6" />
//         </button>
//       </div>
//       <div className="space-y-4">
//         <p><strong>Booking ID:</strong> #{booking.bookingId}</p>
//         <p><strong>Room ID:</strong> #{booking.roomId}</p>
//         <p><strong>Check-in:</strong> {booking.checkInDate}</p>
//         <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
//         <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
//         <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
//         <p><strong>Status:</strong> {booking.bookingStatus}</p>
//         <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
//       </div>
//       <div className="mt-6 flex space-x-3">
//         <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">Close</button>
//         {booking.bookingStatus === "Confirmed" && (
//           <button onClick={() => { onCancel(booking.bookingId); onClose() }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Cancel Booking</button>
//         )}
//       </div>
//     </div>
//   </div>
// )






import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { Calendar, User, LogOut, CreditCard, X, Home, MessageSquare } from "lucide-react"
import { toast } from "sonner"
import type { UserBooking, SupportTicket } from "../../types"
import { userService } from "@/services/userServices"
import { TicketForm } from "@/components/ticketForm" 



export default function UserDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [activeSection, setActiveSection] = useState("dashboard")
  const [loading, setLoading] = useState(true)
  const [bookings, setBookings] = useState<UserBooking[]>([])
  const [showBookingDetails, setShowBookingDetails] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<UserBooking | null>(null)
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([])

  useEffect(() => {
    if (user) {
      fetchBookings()
      fetchSupportTickets()
    }
  }, [user])

  useEffect(() => {
    if (location.state?.showBookings) {
      setActiveSection("bookings")
    }
  }, [location.state])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const bookingsData = await userService.getUserBookings()
      setBookings(bookingsData)
    } catch (error) {
      console.error("Error fetching bookings:", error)
      toast.error("Failed to load bookings")
    } finally {
      setLoading(false)
    }
  }

  const fetchSupportTickets = async () => {
    if (!user) return 
    try {
      const tickets = await userService.getUserSupportTickets(user!.userId)
      setSupportTickets(tickets)
    } catch (error) {
      console.error("Error fetching support tickets:", error)
      toast.error("Failed to load support tickets")
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const handleCancelBooking = async (bookingId: number) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return
    try {
      await userService.cancelBooking(bookingId)
      toast.success("Booking cancelled successfully")
      fetchBookings()
    } catch (error) {
      console.error("Error cancelling booking:", error)
      toast.error("Failed to cancel booking")
    }
  }

  const renderDashboard = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.firstName}!</h1>
      <p className="text-gray-600 mb-6">Here's your booking overview</p>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard icon={<Calendar className="h-8 w-8 text-blue-600" />} label="Total Bookings" value={bookings.length} />
            <StatCard icon={<Calendar className="h-8 w-8 text-green-600" />} label="Active Bookings" value={bookings.filter((b) => b.bookingStatus === "Confirmed").length} />
            <StatCard icon={<CreditCard className="h-8 w-8 text-purple-600" />} label="Total Spent" value={`$${bookings.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}`} />
          </div>

          <RecentBookings bookings={bookings} onView={setSelectedBooking} onShowDetails={() => setShowBookingDetails(true)} onCancel={handleCancelBooking} />
        </>
      )}
    </div>
  )

  const renderRooms = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900">My Rooms</h2>
      <p className="text-gray-600 mt-2">Manage your room listings or view your reservations here.</p>
    </div>
  )

  // const renderSupport = () => (
  //   <div className="p-6">
  //     <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
  //     <p className="text-gray-600 mt-2 mb-6">View and manage your support requests here.</p>

  //     {supportTickets.length === 0 ? (
  //       <p className="text-gray-500">You have not submitted any support tickets yet.</p>
  //     ) : (
  //       <ul className="space-y-4">
  //         {supportTickets.map((ticket) => (
  //           <li key={ticket.ticketId} className="bg-white p-4 rounded-lg shadow border">
  //             <div className="flex justify-between items-center mb-1">
  //               <h3 className="font-semibold text-gray-800">#{ticket.ticketId} - {ticket.subject}</h3>
  //               <span className={`text-sm px-2 py-1 rounded ${ticket.status === "Open" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
  //                 {ticket.status}
  //               </span>
  //             </div>
  //             <p className="text-gray-600 text-sm">{ticket.message}</p>
  //             <p className="text-xs text-gray-400 mt-2">Submitted: {new Date(ticket.createdAt).toLocaleString()}</p>
  //           </li>
  //         ))}
  //       </ul>
  //     )}
  //   </div>
  // )
  const renderSupport = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Support Tickets</h2>
      <p className="text-gray-600 mb-6">Submit a new support request or view your existing tickets.</p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Submit a New Ticket</h3>
        <TicketForm onTicketCreated={fetchSupportTickets} />
      </div>
      {supportTickets.length === 0 ? (
        <p className="text-gray-500">You have not submitted any support tickets yet.</p>
      ) : (
        <ul className="space-y-4">
          {supportTickets.map((ticket) => (
             <li key={ticket.ticketId} className="bg-white p-4 rounded-lg shadow border">
               <div className="flex justify-between items-center mb-1">
                  <h3 className="font-semibold text-gray-800">#{ticket.ticketId} - {ticket.subject}</h3>
                  <span className={`text-sm px-2 py-1 rounded ${ticket.status === "Open" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{ticket.message}</p>
                <p className="text-xs text-gray-400 mt-2">Submitted: {new Date(ticket.createdAt).toLocaleString()}</p>

             </li>

          ))}

        </ul>

      )}
    </div>

  )

  const renderBookings = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h2>
      <p className="text-gray-600 mb-6">Manage your hotel reservations</p>
      {renderDashboard()}
    </div>
  )

  const renderProfile = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
      <div className="mt-4 bg-white p-6 rounded-lg shadow">
        <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>User Type:</strong> {user?.userType}</p>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} onLogout={handleLogout} user={user} />
      <div className="flex-1 overflow-auto">
        {activeSection === "dashboard" && renderDashboard()}
        {activeSection === "bookings" && renderBookings()}
        {activeSection === "profile" && renderProfile()}
        {activeSection === "rooms" && renderRooms()}
        {activeSection === "support" && renderSupport()}
      </div>

      {showBookingDetails && selectedBooking && (
        <BookingDetailsModal booking={selectedBooking} onClose={() => setShowBookingDetails(false)} onCancel={handleCancelBooking} />
      )}
    </div>
  )
}

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) => (
  <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow flex items-center">
    {icon}
    <div className="ml-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
)

const RecentBookings = ({ bookings, onView, onShowDetails, onCancel }: { bookings: UserBooking[], onView: (b: UserBooking) => void, onShowDetails: () => void, onCancel: (id: number) => void }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
    {bookings.length === 0 ? (
      <div className="text-center py-8">
        <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">No bookings found</p>
        <p className="text-sm text-gray-400 mt-2">Your bookings will appear here once you make a reservation</p>
      </div>
    ) : (
      <div className="space-y-4">
        {bookings.slice(0, 5).map((booking) => (
          <div key={booking.bookingId} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">Hotel: {booking.room?.hotelName} | Room: {booking.room?.roomName}</h4>
              <p className="text-sm text-gray-600">{booking.checkInDate} to {booking.checkOutDate}</p>
              <p className="text-sm text-gray-500">{booking.numberOfGuests} guests</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">${booking.totalAmount}</p>
              <span className={`px-2 py-1 rounded text-xs ${booking.bookingStatus === "Confirmed" ? "bg-green-100 text-green-800" : booking.bookingStatus === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                {booking.bookingStatus}
              </span>
            </div>
            <div className="ml-4 space-x-2">
              <button onClick={() => { onView(booking); onShowDetails() }} className="text-blue-600 hover:text-blue-800 text-sm">View Details</button>
              {booking.bookingStatus === "Confirmed" && (
                <button onClick={() => onCancel(booking.bookingId)} className="text-red-600 hover:text-red-800 text-sm">Cancel</button>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)

const Sidebar = ({ activeSection, setActiveSection, onLogout, user }: { activeSection: string, setActiveSection: (s: string) => void, onLogout: () => void, user: any }) => (
  <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-xl font-bold text-gray-800">User Dashboard</h2>
      <p className="text-sm text-gray-600 mt-1">Welcome, {user?.firstName}</p>
    </div>

    <div className="flex-1 p-4">
      <nav className="space-y-2">
        <SidebarButton label="Dashboard" icon={<Calendar className="h-5 w-5" />} active={activeSection === "dashboard"} onClick={() => setActiveSection("dashboard")} />
        <SidebarButton label="Bookings" icon={<Calendar className="h-5 w-5" />} active={activeSection === "bookings"} onClick={() => setActiveSection("bookings")} />
        <SidebarButton label="Rooms" icon={<Home className="h-5 w-5" />} active={activeSection === "rooms"} onClick={() => setActiveSection("rooms")} />
        <SidebarButton label="Support Tickets" icon={<MessageSquare className="h-5 w-5" />} active={activeSection === "support"} onClick={() => setActiveSection("support")} />
        <SidebarButton label="Profile" icon={<User className="h-5 w-5" />} active={activeSection === "profile"} onClick={() => setActiveSection("profile")} />
      </nav>
    </div>

    <div className="p-4 border-t border-gray-200">
      <button onClick={onLogout} className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
        <LogOut className="h-5 w-5" />
        <span>Logout</span>
      </button>
    </div>
  </div>
)

const SidebarButton = ({ label, icon, active, onClick }: { label: string, icon: React.ReactNode, active: boolean, onClick: () => void }) => (
  <button onClick={onClick} className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${active ? "bg-blue-100 text-blue-700 font-medium" : "text-gray-600 hover:bg-gray-100"}`}>
    {icon}
    <span>{label}</span>
  </button>
)

const BookingDetailsModal = ({ booking, onClose, onCancel }: { booking: UserBooking, onClose: () => void, onCancel: (id: number) => void }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Booking Details</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-4 text-sm">
        <p><strong>Booking ID:</strong> #{booking.bookingId}</p>
        <p><strong>Hotel:</strong> {booking.room?.hotelName}</p>
        <p><strong>Room:</strong> {booking.room?.roomName} ({booking.room?.roomType})</p>
        <p><strong>Check-in:</strong> {booking.checkInDate}</p>
        <p><strong>Check-out:</strong> {booking.checkOutDate}</p>
        <p><strong>Guests:</strong> {booking.numberOfGuests}</p>
        <p><strong>Total Amount:</strong> ${booking.totalAmount}</p>
        <p><strong>Status:</strong> {booking.bookingStatus}</p>
        <p><strong>Created At:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
      </div>
      <div className="mt-6 flex space-x-3">
        <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">Close</button>
        {booking.bookingStatus === "Confirmed" && (
          <button onClick={() => { onCancel(booking.bookingId); onClose() }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">Cancel Booking</button>
        )}
      </div>
    </div>
  </div>
)
