

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell, Users } from "lucide-react"

interface Hotel {
  hotelId: number
  name: string
  location: string
  address: string
  rating: number
  description: string
  amenities: string[]
  images: string[]
}

interface Room {
  roomId: number
  roomType: string
  pricePerNight: number
  capacity: number
  amenities: string[]
  isAvailable: boolean
  description: string
}

export default function HotelDetails() {
  const { id } = useParams()
  const [hotel, setHotel] = useState<Hotel | null>(null)
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    fetchHotelDetails()
  }, [id])

  const fetchHotelDetails = async () => {
    try {
      // Mock data - replace with actual API call
      const mockHotel: Hotel = {
        hotelId: Number.parseInt(id || "1"),
        name: "Grand Plaza Hotel",
        location: "New York",
        address: "123 Broadway, New York, NY 10001",
        rating: 4.8,
        description:
          "Experience luxury and comfort at the Grand Plaza Hotel, located in the heart of Manhattan. Our elegant rooms and world-class amenities ensure an unforgettable stay in the city that never sleeps.",
        amenities: ["wifi", "parking", "gym", "restaurant", "spa", "pool", "concierge"],
        images: [
          "/public/images/image3.jpeg",
          "/public/images/image2.jpeg",
          "/public/images/image1.jpeg",
          "/public/images/image4.jpeg",
        ],
      }

      const mockRooms: Room[] = [
        {
          roomId: 1,
          roomType: "Standard Room",
          pricePerNight: 199,
          capacity: 2,
          amenities: ["wifi", "tv", "minibar"],
          isAvailable: true,
          description: "Comfortable standard room with city view",
        },
        {
          roomId: 2,
          roomType: "Deluxe Suite",
          pricePerNight: 349,
          capacity: 4,
          amenities: ["wifi", "tv", "minibar", "balcony", "kitchenette"],
          isAvailable: true,
          description: "Spacious suite with separate living area and premium amenities",
        },
        {
          roomId: 3,
          roomType: "Presidential Suite",
          pricePerNight: 799,
          capacity: 6,
          amenities: ["wifi", "tv", "minibar", "balcony", "kitchenette", "jacuzzi"],
          isAvailable: false,
          description: "Luxurious presidential suite with panoramic city views",
        },
      ]

      setHotel(mockHotel)
      setRooms(mockRooms)
    } catch (error) {
      console.error("Error fetching hotel details:", error)
    } finally {
      setLoading(false)
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case "wifi":
        return <Wifi className="h-5 w-5" />
      case "parking":
        return <Car className="h-5 w-5" />
      case "restaurant":
        return <Coffee className="h-5 w-5" />
      case "gym":
        return <Dumbbell className="h-5 w-5" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hotel not found</h2>
          <Link to="/hotels" className="text-blue-600 hover:text-blue-800">
            Back to Hotels
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hotel Images */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <img
                src={hotel.images[selectedImage] || "/placeholder.svg"}
                alt={hotel.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="space-y-2">
              {hotel.images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${hotel.name} ${index + 1}`}
                  className={`w-full h-20 object-cover rounded cursor-pointer ${
                    selectedImage === index ? "ring-2 ring-blue-500" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hotel Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mr-1" />
                    <span>{hotel.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-lg font-semibold">{hotel.rating}</span>
                    <span className="ml-1 text-gray-600">(324 reviews)</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{hotel.description}</p>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {hotel.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2 text-gray-600">
                      {getAmenityIcon(amenity)}
                      <span className="capitalize">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Available Rooms */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Rooms</h2>
              <div className="space-y-6">
                {rooms.map((room) => (
                  <div key={room.roomId} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{room.roomType}</h3>
                        <p className="text-gray-600 mb-3">{room.description}</p>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>Up to {room.capacity} guests</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {room.amenities.map((amenity) => (
                            <span
                              key={amenity}
                              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full capitalize"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-right ml-6">
                        <div className="text-2xl font-bold text-gray-900 mb-1">${room.pricePerNight}</div>
                        <div className="text-sm text-gray-600 mb-4">per night</div>

                        {room.isAvailable ? (
                          <Link
                            to={`/booking/${room.roomId}`}
                            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
                          >
                            Book Now
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="bg-gray-300 text-gray-500 px-6 py-2 rounded-md cursor-not-allowed font-medium"
                          >
                            Not Available
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Booking</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4+ Guests</option>
                  </select>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium">
                  Check Availability
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Hotel Highlights</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Free WiFi throughout</li>
                  <li>• 24/7 front desk service</li>
                  <li>• Fitness center & spa</li>
                  <li>• On-site restaurant</li>
                  <li>• Valet parking available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
