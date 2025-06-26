import api from '@/lib/api';
import { ApiResponse, Order, CreateOrderData } from '@/lib/types';

export const orderService = {
  async createOrder(data: CreateOrderData): Promise<ApiResponse<Order>> {
    const response = await api.post('/orders', data);
    return response.data;
  },

  async getOrders(page: number = 1, limit: number = 10, status?: string): Promise<ApiResponse<Order[]>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (status) {
      params.append('status', status);
    }

    const response = await api.get(`/orders?${params.toString()}`);
    return response.data;
  },

  async getUserOrders(page: number = 1, limit: number = 10): Promise<ApiResponse<Order[]>> {
    const response = await api.get(`/orders/my-orders?page=${page}&limit=${limit}`);
    return response.data;
  },

  async getOrder(id: string): Promise<ApiResponse<Order>> {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  async updateOrderStatus(id: string, status: string): Promise<ApiResponse<Order>> {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },

  async processPayment(id: string, paymentIntentId?: string): Promise<ApiResponse<Order>> {
    const response = await api.put(`/orders/${id}/pay`, { paymentIntentId });
    return response.data;
  },
};