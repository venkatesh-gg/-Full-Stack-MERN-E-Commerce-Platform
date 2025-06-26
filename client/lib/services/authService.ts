import api from '@/lib/api';
import { AuthResponse, LoginData, RegisterData, User } from '@/lib/types';

export const authService = {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async getProfile(): Promise<AuthResponse> {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  async updateProfile(data: Partial<User>): Promise<AuthResponse> {
    const response = await api.put('/auth/profile', data);
    return response.data;
  },
};