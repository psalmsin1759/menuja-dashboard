const mockAxiosInstance = {
  interceptors: { request: { use: jest.fn() } },
  get: jest.fn(),
  post: jest.fn(),
};

jest.mock("axios", () => ({
  create: jest.fn(() => mockAxiosInstance),
}));

jest.mock("@/utils/handleApiError");

import { loginUser, getProfile, logoutUser } from "@/services/auth.service";
import { handleApiError } from "@/utils/handleApiError";
jest.mock("@/utils/handleApiError");

const mockedHandleApiError = handleApiError as unknown as jest.Mock;

describe("authService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should login user successfully", async () => {
    const mockData = {
      token: "123",
      admin: { id: "1", email: "test@mail.com" },
    };
    mockAxiosInstance.post.mockResolvedValueOnce({ data: mockData });

    const result = await loginUser({
      email: "test@mail.com",
      password: "pass",
    });
    expect(mockAxiosInstance.post).toHaveBeenCalledWith("/admins/login", {
      email: "test@mail.com",
      password: "pass",
    });
    expect(result).toEqual(mockData);
  });

  it("should handle login error", async () => {
    const error = new Error("Login failed");
    mockAxiosInstance.post.mockRejectedValueOnce(error);
    mockedHandleApiError.mockImplementation(() => {
      throw error;
    });

    await expect(
      loginUser({ email: "test@mail.com", password: "pass" })
    ).rejects.toEqual(expect.objectContaining({ message: "Login failed" }));

    expect(handleApiError).toHaveBeenCalledWith(error);
  });

  it("should get profile by ID", async () => {
    const mockUser = { id: "1", email: "test@mail.com" };
    mockAxiosInstance.get.mockResolvedValueOnce({ data: mockUser });

    const result = await getProfile(1);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith("/admins/1");
    expect(result).toEqual(mockUser);
  });

  it("should logout user", async () => {
    mockAxiosInstance.post.mockResolvedValueOnce({ data: { success: true } });

    const result = await logoutUser();
    expect(mockAxiosInstance.post).toHaveBeenCalledWith("/auth/logout");
    expect(result).toEqual({ success: true });
  });
});
