export const mockLoginPayload = {
  email: "admin@example.com",
  password: "securePassword123"
};

export const mockLoginResponse = {
  token: "mocked-jwt-token-12345",
  user: {
    id: "user-1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin"
  }
};

export const mockProfileResponse = {
  id: "user-1",
  email: "admin@example.com",
  name: "Admin User",
  role: "admin",
  createdAt: "2025-08-01T10:00:00Z"
};

export const mockLogoutResponse = {
  message: "Successfully logged out"
};
