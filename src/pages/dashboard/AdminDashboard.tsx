
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  Hotel,
  Calendar,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  X,
  LogOut,
  Bed,
  HeadphonesIcon,
  TrendingUp,
  Users,
  CreditCard,
  Settings
} from "lucide-react";
import { toast } from "sonner";
import type { Hotel as HotelType, Room, Booking, User, SupportTicket } from "../../types";
import { adminService } from "@/services/adminServuce";


export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("analytics");
  const [loading, setLoading] = useState(false);

  // Data states
  const [hotels, setHotels] = useState<HotelType[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);

  // Modal states
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<HotelType | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Form data
  const [hotelFormData, setHotelFormData] = useState({
    name: "",
    address: "",
    location: "",
    contactPhone: "",
    category: "",
    rating: 0,
  });

  const [roomFormData, setRoomFormData] = useState({
    hotelId: 0,
    roomType: "",
    pricePerNight: "",
    capacity: 1,
    amenities: "",
    isAvailable: true,
  });

 const [userFormData, setUserFormData] = useState<
  Omit<User, "userId" | "createdAt" | "updatedAt" | "role"> & { password: string }
>({
  firstName: "",
  lastName: "",
  email: "",
  contactPhone: "",
  address: "",
  userType: "member",
  password: ""
});


  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [hotelsData, roomsData, bookingsData, usersData, ticketsData] = await Promise.all([
        adminService.getAllHotels(),
        adminService.getAllRooms(),
        adminService.getAllBookings(),
        adminService.getAllUsers(),
        adminService.getAllSupportTickets(),
      ]);

      setHotels(hotelsData);
      setRooms(roomsData);
      setBookings(bookingsData);
      setUsers(usersData);
      setSupportTickets(ticketsData);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Hotel management functions
  const handleCreateHotel = async () => {
    try {
      await adminService.createHotel(hotelFormData);
      toast.success("Hotel created successfully");
      setShowHotelModal(false);
      resetHotelForm();
      loadAllData();
    } catch (error) {
      console.error("Error creating hotel:", error);
      toast.error("Failed to create hotel");
    }
  };

  const handleUpdateHotel = async () => {
    if (!selectedHotel) return;
    try {
      await adminService.updateHotel(selectedHotel.hotelId, hotelFormData);
      toast.success("Hotel updated successfully");
      setShowHotelModal(false);
      setSelectedHotel(null);
      resetHotelForm();
      loadAllData();
    } catch (error) {
      console.error("Error updating hotel:", error);
      toast.error("Failed to update hotel");
    }
  };

  const handleDeleteHotel = async (hotelId: number) => {
    if (!confirm("Are you sure you want to delete this hotel?")) return;
    try {
      await adminService.deleteHotel(hotelId);
      toast.success("Hotel deleted successfully");
      loadAllData();
    } catch (error) {
      console.error("Error deleting hotel:", error);
      toast.error("Failed to delete hotel");
    }
  };

  // Room management functions
  const handleCreateRoom = async () => {
    try {
      await adminService.createRoom(roomFormData);
      toast.success("Room created successfully");
      setShowRoomModal(false);
      resetRoomForm();
      loadAllData();
    } catch (error) {
      console.error("Error creating room:", error);
      toast.error("Failed to create room");
    }
  };

  const handleUpdateRoom = async () => {
    if (!selectedRoom) return;
    try {
      await adminService.updateRoom(selectedRoom.roomId, roomFormData);
      toast.success("Room updated successfully");
      setShowRoomModal(false);
      setSelectedRoom(null);
      resetRoomForm();
      loadAllData();
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Failed to update room");
    }
  };

  const handleDeleteRoom = async (roomId: number) => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    try {
      await adminService.deleteRoom(roomId);
      toast.success("Room deleted successfully");
      loadAllData();
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete room");
    }
  };

  // User management functions
  const handleCreateUser = async () => {
    try {
      console.log("Token in localStorage:", localStorage.getItem("token"));
      await adminService.createUser(userFormData);
      toast.success("User created successfully");
      setShowUserModal(false);
      resetUserForm();
      loadAllData();
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("Failed to create user");
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    try {
      console.log("Updating user with:", userFormData);
      await adminService.updateUser(selectedUser.userId, userFormData);
      toast.success("User updated successfully");
      setShowUserModal(false);
      setSelectedUser(null);
      resetUserForm();
      loadAllData();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await adminService.deleteUser(userId);
      toast.success("User deleted successfully");
      loadAllData();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const resetHotelForm = () => {
    setHotelFormData({
      name: "",
      address: "",
      location: "",
      contactPhone: "",
      category: "",
      rating: 0,
    });
  };

  const resetRoomForm = () => {
    setRoomFormData({
      hotelId: 0,
      roomType: "",
      pricePerNight: "",
      capacity: 1,
      amenities: "",
      isAvailable: true,
    });
  };

  const resetUserForm = () => {
    setUserFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      contactPhone: "",
      address: "",
      userType: "member",
    });
  };

  // Analytics calculations
  const totalRevenue = bookings.reduce((sum, booking) => sum + Number.parseFloat(booking.totalAmount ?? "0"), 0);
  const confirmedBookings = bookings.filter((b) => b.bookingStatus === "Confirmed").length;
  const pendingBookings = bookings.filter((b) => b.bookingStatus === "Pending").length;
  const cancelledBookings = bookings.filter((b) => b.bookingStatus === "Cancelled").length;

  // Chart data
  const bookingStatusData = [
    { name: "Confirmed", value: confirmedBookings, color: "#10B981" },
    { name: "Pending", value: pendingBookings, color: "#F59E0B" },
    { name: "Cancelled", value: cancelledBookings, color: "#EF4444" },
  ];

  const revenueByHotel = hotels.map((hotel) => {
    const hotelRooms = rooms.filter((room) => room.hotelId === hotel.hotelId);
    const hotelBookings = bookings.filter((booking) => hotelRooms.some((room) => room.roomId === booking.roomId));
    const revenue = hotelBookings.reduce((sum, booking) => sum + Number.parseFloat(booking.totalAmount ?? "0"), 0);
    return {
      name: hotel.name.substring(0, 15) + (hotel.name.length > 15 ? "..." : ""),
      revenue: revenue,
    };
  });

  const renderAnalytics = () => (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics & Reports</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Hotel className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Hotels</p>
              <p className="text-2xl font-bold">{hotels.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Bed className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Rooms</p>
              <p className="text-2xl font-bold">{rooms.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold">{bookings.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Booking Status Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Booking Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={bookingStatusData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {bookingStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Hotel Chart */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue by Hotel</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByHotel}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.bookingId} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">Booking #{booking.bookingId}</p>
                  <p className="text-sm text-gray-600">User #{booking.userId}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${booking.totalAmount}</p>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      booking.bookingStatus === "Confirmed"
                        ? "bg-green-100 text-green-800"
                        : booking.bookingStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {booking.bookingStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Support Tickets</h3>
          <div className="space-y-3">
            {supportTickets.slice(0, 5).map((ticket) => (
              <div key={ticket.ticketId} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">{ticket.subject}</p>
                  <p className="text-sm text-gray-600">User #{ticket.userId}</p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    ticket.status === "Resolved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderHotels = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Hotel Management</h2>
        <button
          onClick={() => {
            setSelectedHotel(null);
            resetHotelForm();
            setShowHotelModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Hotel</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hotels.map((hotel) => (
              <tr key={hotel.hotelId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{hotel.name}</div>
                    <div className="text-sm text-gray-500">{hotel.address}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hotel.location}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hotel.category || "N/A"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {hotel.rating ? `${hotel.rating}/5` : "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => {
                      setSelectedHotel(hotel);
                      setHotelFormData({
                        name: hotel.name,
                        address: hotel.address,
                        location: hotel.location,
                        contactPhone: hotel.contactPhone || "",
                        category: hotel.category || "",
                        rating: hotel.rating || 0,
                      });
                      setShowHotelModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="h-4 w-4 inline mr-1" />
                    Edit
                  </button>
                  <button onClick={() => handleDeleteHotel(hotel.hotelId)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4 inline mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRooms = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Room Management</h2>
        <button
          onClick={() => {
            setSelectedRoom(null);
            resetRoomForm();
            setShowRoomModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Room</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hotel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price/Night
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rooms.map((room) => (
              <tr key={room.roomId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{room.roomType}</div>
                  <div className="text-sm text-gray-500">{room.amenities}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {hotels.find((h) => h.hotelId === room.hotelId)?.name || `Hotel #${room.hotelId}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${room.pricePerNight}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{room.capacity} guests</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      room.isAvailable ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {room.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => {
                      setSelectedRoom(room);
                      setRoomFormData({
                        hotelId: room.hotelId,
                        roomType: room.roomType ?? "",
                        pricePerNight: room.pricePerNight?.toString() ?? "",
                        capacity: room.capacity ?? 1,
                        amenities: room.amenities || "",
                        isAvailable: room.isAvailable,
                      });
                      setShowRoomModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="h-4 w-4 inline mr-1" />
                    Edit
                  </button>
                  <button onClick={() => handleDeleteRoom(room.roomId)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4 inline mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Monitoring</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking) => {
              const room = rooms.find((r) => r.roomId === booking.roomId);
              const hotel = hotels.find((h) => h.hotelId === room?.hotelId);
              return (
                <tr key={booking.bookingId} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{booking.bookingId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">User #{booking.userId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <div className="font-medium">{room?.roomType || "Unknown Room"}</div>
                      <div className="text-gray-500">{hotel?.name || "Unknown Hotel"}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.checkInDate} to {booking.checkOutDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${booking.totalAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        booking.bookingStatus === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.bookingStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
        <button
          onClick={() => {
            setSelectedUser(null);
            resetUserForm();
            setShowUserModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add User</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.userId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {user.firstName} {user.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="px-2 py-1 rounded text-xs bg-purple-100 text-purple-800 capitalize">
                    {user.userType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800 capitalize">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setUserFormData({
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        contactPhone: user.contactPhone || "",
                        address: user.address || "",
                        userType: user.userType,
                        password: user.password || "" 
                      });
                      setShowUserModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Edit className="h-4 w-4 inline mr-1" />
                    Edit
                  </button>
                  <button onClick={() => handleDeleteUser(user.userId)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4 inline mr-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSupport = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Support Tickets</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {supportTickets.map((ticket) => (
              <tr key={ticket.ticketId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{ticket.ticketId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">User #{ticket.userId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{ticket.subject}</div>
                    <div className="text-sm text-gray-500">{ticket.description?.substring(0, 50)}...</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      ticket.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : ticket.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                    }`}
                  >
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      ticket.status === "Resolved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(ticket.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Payments</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Payment management functionality coming soon</p>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">System settings functionality coming soon</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-600 mt-1">Welcome, {user?.firstName}</p>
        </div>

        <div className="flex-1 p-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection("analytics")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeSection === "analytics"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <TrendingUp className="h-5 w-5" />
              <span>Analytics</span>
            </button>
            <button
              onClick={() => setActiveSection("hotels")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeSection === "hotels"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Hotel className="h-5 w-5" />
              <span>Hotels</span>
            </button>
            <button
              onClick={() => setActiveSection("rooms")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeSection === "rooms"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Bed className="h-5 w-5" />
              <span>Rooms</span>
            </button>
            <button
              onClick={() => setActiveSection("bookings")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeSection === "bookings"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Calendar className="h-5 w-5" />
              <span>Bookings</span>
            </button>
            <button
              onClick={() => setActiveSection("users")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeSection === "users"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Users</span>
            </button>
            <button
              onClick={() => setActiveSection("support")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeSection === "support"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <HeadphonesIcon className="h-5 w-5" />
              <span>Support</span>
            </button>
            <button
              onClick={() => setActiveSection("payments")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeSection === "payments"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <CreditCard className="h-5 w-5" />
              <span>Payments</span>
            </button>
            <button
              onClick={() => setActiveSection("settings")}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors w-full text-left ${
                activeSection === "settings"
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 w-full text-left text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {activeSection === "analytics" && renderAnalytics()}
            {activeSection === "hotels" && renderHotels()}
            {activeSection === "rooms" && renderRooms()}
            {activeSection === "bookings" && renderBookings()}
            {activeSection === "users" && renderUsers()}
            {activeSection === "support" && renderSupport()}
            {activeSection === "payments" && renderPayments()}
            {activeSection === "settings" && renderSettings()}
          </>
        )}
      </div>

      {/* Hotel Modal */}
      {showHotelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedHotel ? "Edit Hotel" : "Add New Hotel"}</h3>
              <button onClick={() => setShowHotelModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={hotelFormData.name}
                  onChange={(e) => setHotelFormData({ ...hotelFormData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={hotelFormData.address}
                  onChange={(e) => setHotelFormData({ ...hotelFormData, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={hotelFormData.location}
                  onChange={(e) => setHotelFormData({ ...hotelFormData, location: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                <input
                  type="text"
                  value={hotelFormData.contactPhone}
                  onChange={(e) => setHotelFormData({ ...hotelFormData, contactPhone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  value={hotelFormData.category}
                  onChange={(e) => setHotelFormData({ ...hotelFormData, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rating</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  value={hotelFormData.rating}
                  onChange={(e) => setHotelFormData({ ...hotelFormData, rating: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowHotelModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={selectedHotel ? handleUpdateHotel : handleCreateHotel}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {selectedHotel ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Room Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedRoom ? "Edit Room" : "Add New Room"}</h3>
              <button onClick={() => setShowRoomModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Hotel</label>
                <select
                  value={roomFormData.hotelId}
                  onChange={(e) => setRoomFormData({ ...roomFormData, hotelId: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Hotel</option>
                  {hotels.map((hotel) => (
                    <option key={hotel.hotelId} value={hotel.hotelId}>
                      {hotel.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Room Type</label>
                <input
                  type="text"
                  value={roomFormData.roomType}
                  onChange={(e) => setRoomFormData({ ...roomFormData, roomType: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price Per Night</label>
                <input
                  type="text"
                  value={roomFormData.pricePerNight}
                  onChange={(e) => setRoomFormData({ ...roomFormData, pricePerNight: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  min="1"
                  value={roomFormData.capacity}
                  onChange={(e) => setRoomFormData({ ...roomFormData, capacity: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amenities</label>
                <input
                  type="text"
                  value={roomFormData.amenities}
                  onChange={(e) => setRoomFormData({ ...roomFormData, amenities: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={roomFormData.isAvailable}
                  onChange={(e) => setRoomFormData({ ...roomFormData, isAvailable: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">Available</label>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowRoomModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={selectedRoom ? handleUpdateRoom : handleCreateRoom}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {selectedRoom ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedUser ? "Edit User" : "Add New User"}</h3>
              <button onClick={() => setShowUserModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  value={userFormData.firstName}
                  onChange={(e) => setUserFormData({ ...userFormData, firstName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={userFormData.lastName}
                  onChange={(e) => setUserFormData({ ...userFormData, lastName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={userFormData.email}
                  onChange={(e) => setUserFormData({ ...userFormData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={userFormData.password}
                  onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
                <input
                  type="text"
                  value={userFormData.contactPhone || ""}
                  onChange={(e) => setUserFormData({ ...userFormData, contactPhone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  value={userFormData.address || ""}
                  onChange={(e) => setUserFormData({ ...userFormData, address: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">User Type</label>
                <select
                  value={userFormData.userType}
                  onChange={(e) => setUserFormData({ 
                    ...userFormData, 
                    userType: e.target.value as "member" | "admin" 
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="member">member</option>
                  <option value="admin">admin</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex space-x-3">
              <button
                onClick={() => setShowUserModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={selectedUser ? handleUpdateUser : handleCreateUser}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {selectedUser ? "Update" : "Create"}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}





