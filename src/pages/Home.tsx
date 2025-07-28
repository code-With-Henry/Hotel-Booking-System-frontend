import type React from "react";
import { Link } from "react-router-dom";
import { Search, Shield, Clock, MapPin, Users } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [searchData, setSearchData] = useState({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchData as any);
    window.location.href = `/hotels?${params.toString()}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white"
        style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80")`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Find Your Perfect Stay</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              Discover amazing hotels and book your dream vacation
            </p>

            
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                    value={searchData.location}
                    onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  />
                </div>

                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                  value={searchData.checkIn}
                  onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                />

                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                  value={searchData.checkOut}
                  onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                />

                <div className="relative">
                  <Users className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <select
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-gray-900"
                    value={searchData.guests}
                    onChange={(e) =>
                      setSearchData({ ...searchData, guests: Number.parseInt(e.target.value) })
                    }
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={3}>3 Guests</option>
                    <option value={4}>4+ Guests</option>
                  </select>
                </div>

                <div className="md:col-span-4">
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 text-white py-3 px-6 rounded-md hover:bg-yellow-600 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <Search className="h-5 w-5" />
                    <span>Search Hotels</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose HotelBook?</h2>
            <p className="text-xl text-gray-600">We make hotel booking simple, secure, and rewarding</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
              <p className="text-gray-600">Find the perfect hotel with our advanced search and filtering options</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Booking</h3>
              <p className="text-gray-600">Your personal information and payments are always protected</p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Get help whenever you need it with our round-the-clock customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Remove Featured Hotels Section */}
      {/* You can add dynamic hotels here later */}

      {/* CTA Section */}
      <section className="py-16 bg-yellow-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Find a safe place to stay?</h2>
          <p className="text-xl mb-8 text-yellow-100">Join thousands of satisfied customers who trust HotelBook</p>
          <Link
            to="/register"
            className="bg-white text-yellow-600 px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-semibold"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
}
