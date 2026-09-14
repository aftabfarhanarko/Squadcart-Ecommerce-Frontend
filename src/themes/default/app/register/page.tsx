"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import styled from "styled-components";
import { useAuth } from "@/context/AuthContext";

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  background-color: transparent;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  &:focus {
    border-color: #d31a7a;
    box-shadow: 0 0 0 3px rgba(211, 26, 122, 0.1);
  }
`;
export default function RegisterPage() {
  const [full_name, setFullName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accept, setAccept] = useState(false);
  const router = useRouter();
  const { register } = useAuth();
  const canSubmit = useMemo(() => {
    const validEmail = /\S+@\S+\.\S+/.test(email);
    const strongPass = password.length >= 6;
    const match = password && password === confirm;
    return (
      !!full_name.trim() &&
      validEmail &&
      strongPass &&
      match &&
      accept &&
      !loading
    );
  }, [full_name, email, password, confirm, accept, loading]);
  const passScore = useMemo(() => {
    let s = 0;
    if (password.length >= 6) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/\d/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  }, [password]);
  const scoreLabel =
    ["দুর্বল", "সহনীয়", "ভাল", "মজবুত", "খুব মজবুত"][passScore] || "দুর্বল";

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!full_name.trim() || !email.trim() || !password.trim()) {
      setError("নাম, ইমেইল এবং পাসওয়ার্ড প্রয়োজন");
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("অনুগ্রহ করে সঠিক ইমেইল লিখুন");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      setLoading(false);
      return;
    }
    if (password !== confirm) {
      setError("পাসওয়ার্ড এবং কনফার্ম পাসওয়ার্ড মিলছে না");
      setLoading(false);
      return;
    }
    if (!accept) {
      setError("শর্তাবলী সম্মতিতে টিক দিন");
      setLoading(false);
      return;
    }

    const res = await register({
      name: full_name,
      email,
      password,
      phone: phone_number,
    });

    if (res.success) {
      toast.success("রেজিস্ট্রেশন সফল হয়েছে। লগইন করুন।");
      router.push("/login?callbackUrl=/my-account/dashboard");
    } else {
      setError(res.error || "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-white to-primary/5">
      <div className="max-w-7xl mx-auto px-5 py-8 min-h-screen flex items-center justify-center">
        <div className=" w-auto mx-auto rounded-2xl bg-white shadow-md border border-gray-100 overflow-hidden">
          <div className="px-6 pt-6 text-center">
            <div className="inline-block mb-3">
              <span className="text-xs font-bold tracking-widest text-white px-4 py-2 rounded-full bg-primary">
                নতুন অ্যাকাউন্ট
              </span>
            </div>
            <h2 className="text-3xl font-black text-primary">রেজিস্টার</h2>
          </div>
          <div className="p-6 border-t border-gray-100">
            <p className="text-sm text-gray-600 text-center mb-4">
              দ্রুত ডেলিভারি, নিরাপদ পেমেন্ট, সন্তুষ্টি গ্যারান্টি
            </p>
            {error && (
              <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                {error}
              </div>
            )}
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FiUser />
                </span>
                <Input
                  type="text"
                  placeholder="পূর্ণ নাম"
                  onChange={(e) => setFullName(e.target.value)}
                  style={{ paddingLeft: "34px" }}
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FiPhone />
                </span>
                <Input
                  type="text"
                  placeholder="মোবাইল নাম্বার"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  style={{ paddingLeft: "34px" }}
                />
              </div>
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
                <span className="absolute left-3 top-1/4 -translate-y-1/2 text-gray-500">
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
                  className="absolute right-3 top-1/4 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
                <div className="mt-2">
                  <div className="h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 rounded bg-primary transition-all"
                      style={{ width: `${(passScore / 4) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    পাসওয়ার্ড শক্তি: {scoreLabel}
                  </p>
                </div>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FiLock />
                </span>
                <Input
                  type={showConfirm ? "text" : "password"}
                  placeholder="কনফার্ম পাসওয়ার্ড"
                  onChange={(e) => setConfirm(e.target.value)}
                  style={{ paddingLeft: "34px", paddingRight: "40px" }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowConfirm((s) => !s)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <Input type="text" placeholder="রেফারাল কোড (ঐচ্ছিক)" />
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={accept}
                    onChange={(e) => setAccept(e.target.checked)}
                  />
                  আমি শর্তাবলী ও প্রাইভেসি পলিসি মেনে নিচ্ছি
                </label>
                <Link href="/terms" className="text-primary text-sm">
                  শর্তাবলী
                </Link>
              </div>
              <button
                className="bg-primary p-2.5 rounded text-white w-full hover:bg-primary/90 disabled:opacity-50 font-semibold"
                type="submit"
                disabled={!canSubmit}
              >
                {loading ? "রেজিস্টার হচ্ছে..." : "রেজিস্টার"}
              </button>
            </form>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-500">অথবা</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="border rounded-lg py-2 text-sm hover:bg-gray-50">
                Google
              </button>
              <button className="border rounded-lg py-2 text-sm hover:bg-gray-50">
                Facebook
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <p>ইতিমধ্যেই অ্যাকাউন্ট আছে?</p>
              <Link href="/login" className="text-primary font-semibold">
                লগইন করুন
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
