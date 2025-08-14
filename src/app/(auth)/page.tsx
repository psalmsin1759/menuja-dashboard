"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   router.push("/dashboard")
  };

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center">
        <Logo />
        <h2 className="text-2xl font-semibold mb-4 mt-2">Login</h2>
      </div>

      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-secondary"
        >
          Login
        </button>
      </form>
      <div className="text-sm mt-4 flex justify-between">
        <Link
          href="/forgot-password"
          className="text-primary hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
