import { Users, Award, Globe, Heart } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About HotelBook</h1>
            <p className="text-xl md:text-2xl text-yellow-100 max-w-3xl mx-auto">
              We're passionate about making travel accessible and enjoyable for everyone. Our mission is to connect
              travelers with their perfect accommodations.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2020, HotelBook started with a simple idea: make hotel booking as easy and transparent as
                possible. We noticed that travelers were frustrated with hidden fees, complicated booking processes, and
                lack of reliable information.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Today, we've grown to serve thousands of customers worldwide, partnering with hotels of all sizes to
                provide authentic, verified accommodations that meet every traveler's needs and budget.
              </p>
              <p className="text-lg text-gray-600">
                Our commitment to excellence, transparency, and customer satisfaction drives everything we do. We
                believe that great travel experiences start with finding the perfect place to stay.
              </p>
            </div>
            <div>
              <img src="/Room.jpeg" alt="Our Room" width="300" height="200" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer First</h3>
              <p className="text-gray-600">
                Every decision we make is centered around providing the best experience for our customers.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service, from technology to customer support.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600">
                We connect travelers with accommodations worldwide, making global travel accessible.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Passion</h3>
              <p className="text-gray-600">
                We're passionate about travel and helping people create unforgettable memories.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The people behind HotelBook's success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Henry Koskei",
                role: "CEO & Founder",
                image: "/henryprofile.jpeg",
                bio: "Former travel industry executive with 15+ years of experience in hospitality and technology.",
              },
              {
                name: "Michael Olunga",
                role: "CTO",
                image: "/michaelprofile.jpeg",
                bio: "Tech veteran who previously led engineering teams at major travel platforms.",
              },
              {
                name: "Emily Kimani",
                role: "Head of Customer Success",
                image: "/emilyprofile.jpeg",
                bio: "Customer experience expert dedicated to ensuring every traveler has an amazing journey.",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-yellow-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-yellow-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-yellow-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-yellow-100">Partner Hotels</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">150+</div>
              <div className="text-yellow-100">Cities Country Wide</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8/5</div>
              <div className="text-yellow-100">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
