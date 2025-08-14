"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    
    router.push("/dashboard");
  };

  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center">
        <Logo />
        <h2 className="text-2xl font-semibold mb-4 mt-2">Login</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`w-full border px-3 py-2 rounded ${
              errors.email ? "border-red-500" : ""
            }`}
            value={form.email}
            onChange={onChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

       
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`w-full border px-3 py-2 rounded ${
              errors.password ? "border-red-500" : ""
            }`}
            value={form.password}
            onChange={onChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

       
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-secondary"
        >
          Login
        </button>
      </form>

     
      <div className="text-sm mt-4 flex justify-between">
        <Link href="/forgot-password" className="text-primary hover:underline">
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
