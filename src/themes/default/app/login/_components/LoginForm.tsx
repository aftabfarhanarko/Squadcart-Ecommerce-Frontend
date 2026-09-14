"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  background-color: transparent;
`;

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callBackURL = searchParams.get("callbackUrl");
  const canSubmit = useMemo(() => {
    const validEmail = /\S+@\S+\.\S+/.test(email);
    return validEmail && password.length >= 6 && !loading;
  }, [email, password, loading]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("অনুগ্রহ করে সঠিক ইমেইল লিখুন");
      setLoading(false);
      return;
    }
    if (!password || password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      setLoading(false);
      return;
    }

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error || "ইমেইল বা পাসওয়ার্ড সঠিক নয়");
      setLoading(false);
    } else {
      router.push(callBackURL || "/my-account/dashboard");
      router.refresh();
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="w-full">
        <div className="max-w-7xl mx-auto px-5 py-10">
          <div className="max-w-md mx-auto rounded-2xl bg-white shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-6 pt-6 text-center">
              <div className="inline-block mb-3">
                <span className="text-xs font-bold tracking-widest text-white px-4 py-2 rounded-full bg-primary">
                  স্বাগতম
                </span>
              </div>
              <h2 className="text-3xl font-black text-primary">লগইন</h2>
              {callBackURL && (
                <p className="text-sm text-gray-600 mt-2">
                  লগইন সফল হলে আপনাকে নেওয়া হবে: {callBackURL}
                </p>
              )}
            </div>

            <div className="p-6 border-t border-gray-100">
              {error && (
                <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                  {error}
                </div>
              )}
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FiMail />
                  </span>
                  <Input
                    type="email"
                    placeholder="ইমেইল"
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ paddingLeft: "34px" }}
                  />
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FiLock />
                  </span>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="পাসওয়ার্ড"
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ paddingLeft: "34px", paddingRight: "40px" }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="accent-primary" />
                    মনে রাখুন
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-primary text-sm"
                  >
                    পাসওয়ার্ড ভুলে গেছেন?
                  </Link>
                </div>
                <button
                  className="bg-primary p-2.5 rounded text-white w-full hover:bg-primary/90 disabled:opacity-50 font-semibold"
                  type="submit"
                  disabled={!canSubmit}
                >
                  {loading ? "লগইন হচ্ছে..." : "লগইন"}
                </button>
              </form>

              <div className="flex items-center justify-center gap-2 mt-4">
                <p>অ্যাকাউন্ট নেই?</p>
                <Link href="/register" className="text-primary font-semibold">
                  রেজিস্টার করুন
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
