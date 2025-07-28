

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { MessageSquare, Plus, Search, Filter } from "lucide-react"
import { toast } from "sonner"

interface SupportTicket {
  ticketId: number
  subject: string
  description: string
  status: "Open" | "Resolved"
  createdAt: string
  updatedAt: string
}

export default function Support() {
  const { user } = useAuth()
  const [tickets, setTickets] = useState<SupportTicket[]>([])
  const [loading, setLoading] = useState(true)
  const [showNewTicketForm, setShowNewTicketForm] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "Open" | "Resolved">("all")
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
  })

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    try {
      // Mock data - replace with actual API call
      const mockTickets: SupportTicket[] = [
        {
          ticketId: 1,
          subject: "Booking modification request",
          description: "I need to change my check-in date for booking #123",
          status: "Open",
          createdAt: "2024-01-25T10:00:00Z",
          updatedAt: "2024-01-25T10:00:00Z",
        },
        {
          ticketId: 2,
          subject: "Payment issue",
          description: "My payment was charged twice for the same booking",
          status: "Resolved",
          createdAt: "2024-01-20T14:30:00Z",
          updatedAt: "2024-01-22T09:15:00Z",
        },
      ]

      setTickets(mockTickets)
    } catch (error) {
      console.error("Error fetching tickets:", error)
      toast.error("Failed to load support tickets")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!newTicket.subject.trim() || !newTicket.description.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    try {
      // Mock API call - replace with actual backend call
      const newTicketData: SupportTicket = {
        ticketId: tickets.length + 1,
        subject: newTicket.subject,
        description: newTicket.description,
        status: "Open",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setTickets([newTicketData, ...tickets])
      setNewTicket({ subject: "", description: "" })
      setShowNewTicketForm(false)
      toast.success("Support ticket created successfully!")
    } catch (error) {
      toast.error("Failed to create support ticket")
    }
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    return matchesSearch && matchesStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Support Center</h1>
          <p className="text-gray-600 mt-2">Get help with your bookings and account</p>
        </div>

        {/* Quick Help Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">How do I cancel my booking?</h3>
              <p className="text-sm text-gray-600 mb-4">
                You can cancel your booking through your dashboard up to 24 hours before check-in for a full refund.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">How do I modify my booking?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Contact our support team or create a ticket to modify your booking dates or room preferences.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-gray-600 mb-4">
                We accept all major credit cards, PayPal, and bank transfers for your convenience.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">How do I get a receipt?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Receipts are automatically sent to your email after payment. You can also download them from your
                dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* Support Tickets Section */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Your Support Tickets</h2>
              <button
                onClick={() => setShowNewTicketForm(!showNewTicketForm)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>New Ticket</span>
              </button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <select
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as "all" | "Open" | "Resolved")}
                >
                  <option value="all">All Status</option>
                  <option value="Open">Open</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </div>

          {/* New Ticket Form */}
          {showNewTicketForm && (
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Support Ticket</h3>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your issue"
                    value={newTicket.subject}
                    onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide detailed information about your issue"
                    value={newTicket.description}
                    onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Submit Ticket
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewTicketForm(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tickets List */}
          <div className="p-6">
            {filteredTickets.length === 0 ? (
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  {tickets.length === 0 ? "No support tickets found" : "No tickets match your search"}
                </p>
                <p className="text-sm text-gray-400">
                  {tickets.length === 0 ? "Create a ticket if you need help" : "Try adjusting your search criteria"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.ticketId}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          #{ticket.ticketId} - {ticket.subject}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{ticket.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                          <span>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.status === "Open" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <div className="flex justify-end">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Immediate Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h4 className="font-medium text-gray-900">Phone Support</h4>
              <p className="text-blue-600 font-medium">+1 (555) 123-4567</p>
              <p className="text-sm text-gray-600">24/7 Available</p>
            </div>
            <div className="text-center">
              <h4 className="font-medium text-gray-900">Email Support</h4>
              <p className="text-blue-600 font-medium">support@hotelbook.com</p>
              <p className="text-sm text-gray-600">Response within 24 hours</p>
            </div>
            <div className="text-center">
              <h4 className="font-medium text-gray-900">Live Chat</h4>
              <p className="text-blue-600 font-medium">Available on website</p>
              <p className="text-sm text-gray-600">Mon-Fri 9AM-6PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
