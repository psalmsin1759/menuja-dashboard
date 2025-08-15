"use client";

import Logo from "@/components/shared/Logo";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Trigger reset password email
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center">
        <Logo />
        <h2 className="text-2xl font-semibold mb-4 mt-4" >Forgot Password</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-secondary"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
