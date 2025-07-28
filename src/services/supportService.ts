import { apiService } from "./api"

export interface SupportTicket {
  ticketId: number
  userId: number
  subject?: string
  description?: string
  status: "Open" | "Resolved"
  createdAt: string
  updatedAt: string
}

export interface CreateTicketRequest {
  subject: string
  description: string
}

export const supportService = {
  async createTicket(ticketData: CreateTicketRequest): Promise<SupportTicket> {
    return apiService.post<SupportTicket>("/tickets", ticketData)   
  },

  async getUserTickets(): Promise<SupportTicket[]> {
    return apiService.get<SupportTicket[]>("/tickets")              
  },

  async getTicketById(id: number): Promise<SupportTicket> {
    return apiService.get<SupportTicket>(`/tickets/${id}`)          
  },

  async updateTicketStatus(id: number, status: "Open" | "Resolved"): Promise<SupportTicket> {
    return apiService.put<SupportTicket>(`/tickets/${id}`, { status })  
  },
}
