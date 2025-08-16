"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getProfile, loginUser, logoutUser } from "@/services/auth.service";
import type { User, LoginPayload } from "@/types/auth";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export default function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const adminId = localStorage.getItem("adminId");
    if (!token) {
      setState((prev) => ({ ...prev, loading: false }));
      return;
    }

    (async () => {
      try {
        const data = await getProfile(Number(adminId));
        setState({ user: data, loading: false, error: null });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        console.error("Auth profile fetch failed", err);
        localStorage.removeItem("accessToken");
        setState({ user: null, loading: false, error: null });
      }
    })();
  }, []);

  // Login function
  const login = useCallback(async (payload: LoginPayload) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { token, admin } = await loginUser(payload);
      localStorage.setItem("accessToken", token);
      Cookies.set("token", token, { expires: 7, secure: true });
      localStorage.setItem("adminId", String(admin._id));
      setState({ user: admin, loading: false, error: null });
      router.push("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setState({
        user: null,
        loading: false,
        error: err?.message || "Login failed",
      });
    }
  }, [router]);


  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch {
      // Even if API logout fails, clear locally
    } finally {
      localStorage.removeItem("accessToken");
      setState({ user: null, loading: false, error: null });
      router.push("/login");
    }
  }, [router]);

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    isAuthenticated: !!state.user,
  };
}
