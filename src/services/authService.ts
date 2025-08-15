import api from "@/lib/axios";
import type { LoginPayload } from "@/types/auth";
import { handleApiError } from "@/utils/handleApiError";

export async function loginUser(payload: LoginPayload) {
  try {
    const res = await api.post("/admins/login", payload);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getProfile(id: number) {
  try {
    const res = await api.get(`/admins/${id}`);
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function logoutUser() {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error) {
    handleApiError(error);
  }
}
