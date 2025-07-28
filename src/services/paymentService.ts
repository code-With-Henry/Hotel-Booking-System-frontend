import { apiService } from "./api"

export interface Payment {
  paymentId: number
  bookingId: number
  amount?: string
  paymentStatus: "Pending" | "Completed" | "Failed"
  paymentDate: string
  paymentMethod?: string
  transactionId?: string
  createdAt: string
  updatedAt: string
}

export interface CreatePaymentRequest {
  bookingId: number
  amount: string
  paymentMethod: string
  cardNumber?: string
  expiryDate?: string
  cvv?: string
  cardholderName?: string
}

export const paymentService = {
  async createPayment(paymentData: CreatePaymentRequest): Promise<Payment> {
    return apiService.post<Payment>("/payments", paymentData)
  },

  async getPaymentByBookingId(bookingId: number): Promise<Payment> {
    return apiService.get<Payment>(`/payments/booking/${bookingId}`)
  },

  async updatePaymentStatus(paymentId: number, status: "Pending" | "Completed" | "Failed"): Promise<Payment> {
    return apiService.put<Payment>(`/payments/${paymentId}/status`, { status })
  },
}
