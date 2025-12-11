/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  EyeIcon,
  ViewIcon,
  ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // TODO: call your Laravel login route
      // Example (token-based):
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          // credentials: "include", // if using Sanctum
        }
      );
      if (!res.ok) throw new Error("Invalid credentials");

      router.push("/admin/blog");
    } catch (err: any) {
      setError(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md px-8 py-16 rounded-lg bg-teal-50 space-y-4 overflow-hidden"
      >
        <div className="pointer-events-none w-full h-full absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-30 -top-100 h-[400px] w-[400px] rounded-full bg-teal-800 blur-3xl" />
          <div className="absolute -right-40 -bottom-100 h-[400px] w-[400px] rounded-full bg-teal-600 blur-3xl" />
        </div>

        <h1 className="z-10 text-xl font-semibold text-gray-900 text-center">
          Admin Login
        </h1>

        {error && (
          <div className="rounded-md bg-red-50 px-3 py-2 text-xs text-rose-700">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm text-slate-700 block mb-1">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border border-teal-950/10 px-4 py-4 text-sm text-gray-900  focus:outline-teal-950"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm text-slate-700 block mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full rounded-lg border border-teal-950/10 px-4 py-4 text-sm text-gray-900  focus:outline-teal-950"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer text-gray-500 hover:text-gray-800"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <HugeiconsIcon icon={ViewIcon} size={24} strokeWidth={2} />
              ) : (
                <HugeiconsIcon
                  icon={ViewOffSlashIcon}
                  size={24}
                  strokeWidth={2}
                />
              )}
            </button>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-orange-600 px-4 py-4 text-sm font-bold tracking-wide text-white cursor-pointer disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
