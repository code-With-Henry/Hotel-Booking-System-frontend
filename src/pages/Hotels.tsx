

import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Search, Filter, Star, MapPin } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"

// Updated Hotel type to match your backend structure
export interface Hotel {
  hotelId: number
  name: string
  location: string
  address: string
  contactPhone?: string
  category?: string
  rating?: number
  imageUrl?: string
  priceRange?: string
  amenities?: string[]
  createdAt: string
  updatedAt: string
}

export interface HotelFilters {
  location: string
  minRating: number
  maxPrice: number
  category: string
  page: number
  limit: number
}

export default function Hotels() {
  const [searchParams] = useSearchParams()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [totalHotels, setTotalHotels] = useState(0)
  const [showFilters, setShowFilters] = useState(false)

  const [filters, setFilters] = useState<HotelFilters>({
    location: searchParams.get("location") || "",
    minRating: 0,
    maxPrice: 1000, // currently not used — backend lacks price data
    category: "",
    page: 1,
    limit: 12,
  })

  useEffect(() => {
    fetchHotels()
  }, [filters])

  const fetchHotels = async () => {
    setLoading(true)
    try {
      const response = await axios.get("http://localhost:4000/api/hotels")
      if (Array.isArray(response.data)) {
        const allHotels: Hotel[] = response.data

        // Apply filters manually
        const filteredHotels = allHotels.filter((hotel) => {
          const matchLocation = hotel.location
            ?.toLowerCase()
            .includes(filters.location.toLowerCase())
          const matchRating =
            !filters.minRating || (hotel.rating ?? 0) >= filters.minRating
          const matchCategory =
            !filters.category || hotel.category === filters.category
          return matchLocation && matchRating && matchCategory
        })

        // Apply pagination
        const start = (filters.page - 1) * filters.limit
        const paginatedHotels = filteredHotels.slice(start, start + filters.limit)

        setHotels(paginatedHotels)
        setTotalHotels(filteredHotels.length)
      } else {
        toast.error("Unexpected response format from backend")
        setHotels([])
        setTotalHotels(0)
      }
    } catch (error) {
      console.error("Error fetching hotels:", error)
      toast.error("Failed to load hotels")
      setHotels([])
      setTotalHotels(0)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (newFilters: Partial<HotelFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search hotels by name or location..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filters.location}
                  onChange={(e) => handleFilterChange({ location: e.target.value })}
                />
              </div>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-6 p-6 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Rating
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={filters.minRating}
                    onChange={(e) => handleFilterChange({ minRating: parseInt(e.target.value) })}
                  >
                    <option value={0}>Any Rating</option>
                    <option value={3}>3+ Stars</option>
                    <option value={4}>4+ Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={filters.category}
                    onChange={(e) => handleFilterChange({ category: e.target.value })}
                  >
                    <option value="">All</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Resort">Resort</option>
                    <option value="Lodge">Lodge</option>
                    <option value="Budget">Budget</option>
                    <option value="5-star">5-star</option>
                    <option value="4-star">4-star</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange({ maxPrice: parseInt(e.target.value) })}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600">${filters.maxPrice}</span>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() =>
                      setFilters({
                        location: "",
                        minRating: 0,
                        maxPrice: 1000,
                        category: "",
                        page: 1,
                        limit: 12,
                      })
                    }
                    className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : hotels.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No hotels found. Try adjusting filters.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">{totalHotels} Hotels Found</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <div
                  key={hotel.hotelId}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <img
                    src={hotel.imageUrl || "/placeholder.svg"}
                    alt={hotel.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-semibold">{hotel.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{hotel.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {hotel.location}
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{hotel.address}</p>
                    <p className="text-sm text-blue-600">{hotel.category}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-blue-600 font-bold">View Rooms</span>
                      <Link
                        to={`/hotels/${hotel.hotelId}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalHotels > filters.limit && (
              <div className="mt-8 flex justify-center space-x-4">
                <button
                  onClick={() => handleFilterChange({ page: Math.max(1, filters.page - 1) })}
                  disabled={filters.page === 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>
                <span>
                  Page {filters.page} of {Math.ceil(totalHotels / filters.limit)}
                </span>
                <button
                  onClick={() => handleFilterChange({ page: filters.page + 1 })}
                  disabled={filters.page >= Math.ceil(totalHotels / filters.limit)}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
