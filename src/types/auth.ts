export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role: 'owner' | 'admin';
  isActive: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}
