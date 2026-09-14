"use client";

import { FaEdit } from "react-icons/fa";
import { FiMail, FiUser, FiPhone, FiMapPin } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getApiUrl, getApiHeaders } from "@/lib/api-config";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  district?: string;
  successfulOrdersCount?: number;
  cancelledOrdersCount?: number;
}

export default function Dashboard() {
  const { userSession } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [ordersCount, setOrdersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios.get(getApiUrl("/users/me"), {
        headers: getApiHeaders(userSession?.accessToken),
      });
      const userData = response.data.data;
      setProfile(userData);
      setEditData({
        name: userData.name || "",
        phone: userData.phone || "",
        address: userData.address || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }, [userSession?.accessToken]);

  const fetchOrdersCount = useCallback(async () => {
    try {
      const response = await axios.get(getApiUrl("/orders/my-orders"), {
        headers: getApiHeaders(userSession?.accessToken),
      });
      setOrdersCount(response.data.data?.length || 0);
    } catch (error) {
      console.error("Error fetching orders count:", error);
    }
  }, [userSession?.accessToken]);

  useEffect(() => {
    if (userSession?.accessToken) {
      fetchProfile();
      fetchOrdersCount();
    }
  }, [userSession, fetchProfile, fetchOrdersCount]);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.patch(getApiUrl("/users/me"), editData, {
        headers: getApiHeaders(userSession?.accessToken),
      });
      setProfile(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  if (loading) {
    return (
      <section className="w-full flex justify-center items-center min-h-[320px]">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-1 border border-pink-100">
            <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-[11px] font-medium text-pink-700">
              Loading your dashboard
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Fetching your profile and recent activity. Please wait a moment.
          </p>
        </div>
      </section>
    );
  }

  if (!profile) {
    return (
      <section className="w-full flex justify-center items-center min-h-[320px]">
        <div className="max-w-md w-full text-center space-y-3 rounded-2xl border border-red-100 bg-red-50/70 px-6 py-6">
          <p className="text-sm font-semibold text-red-700">
            প্রোফাইল লোড করা যায়নি
          </p>
          <p className="text-xs md:text-sm text-red-600">
            অনুগ্রহ করে পেজটি রিফ্রেশ করুন বা একটু পরে আবার চেষ্টা করুন।
          </p>
        </div>
      </section>
    );
  }

  const firstLetter = (profile.name || profile.email || "?")
    .trim()
    .charAt(0)
    .toUpperCase();

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white shadow-md px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-pink-100/90">
              My account
            </p>
            <h2 className="text-xl md:text-2xl font-semibold">
              স্বাগতম, {profile.name || "customer"}
            </h2>
            <p className="text-xs sm:text-sm text-pink-50/95 max-w-md">
              আপনার ড্যাশবোর্ড থেকে অর্ডার, ঠিকানা এবং প্রোফাইল তথ্য এক জায়গা
              থেকে ম্যানেজ করুন।
            </p>
          </div>
          <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-3 bg-white/10 rounded-2xl px-3 py-2 sm:px-4 sm:py-3 backdrop-blur">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-semibold">
                {firstLetter}
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-pink-100/90">
                  Logged in as
                </span>
                <span className="text-sm sm:text-base font-medium truncate max-w-[180px] sm:max-w-[220px]">
                  {profile.email}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="rounded-xl bg-white/10 px-3 py-2 flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-wide text-pink-100/90">
                  Total orders
                </span>
                <span className="text-lg font-semibold">{ordersCount}</span>
              </div>
              <div className="rounded-xl bg-white/10 px-3 py-2 flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-wide text-pink-100/90">
                  Account status
                </span>
                <span className="text-xs sm:text-sm font-medium">
                  Active member
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white/90 shadow-sm px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="h-9 w-9 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                <FiUser size={18} />
              </span>
              <h2 className="text-base md:text-lg font-semibold text-gray-900">
                Account information
              </h2>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1 rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs md:text-sm font-medium text-pink-700 hover:bg-pink-100"
              >
                <FaEdit className="text-[11px]" />
                Edit profile
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-600">
                    Full name
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/60 px-3 py-2">
                    <FiUser className="text-gray-400" size={16} />
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-600">
                    Phone number
                  </label>
                  <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/60 px-3 py-2">
                    <FiPhone className="text-gray-400" size={16} />
                    <input
                      type="text"
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                      className="w-full bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">
                  Full address
                </label>
                <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50/60 px-3 py-2">
                  <FiMapPin className="mt-0.5 text-gray-400" size={16} />
                  <textarea
                    rows={2}
                    value={editData.address}
                    onChange={(e) =>
                      setEditData({ ...editData, address: e.target.value })
                    }
                    className="w-full bg-transparent text-sm outline-none resize-none"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleUpdateProfile}
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
                >
                  Save changes
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditData({
                      name: profile.name || "",
                      phone: profile.phone || "",
                      address: profile.address || "",
                    });
                  }}
                  className="inline-flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <span className="mt-1 h-8 w-8 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                  <FiUser size={16} />
                </span>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Full name
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {profile.name || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-8 w-8 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                  <FiPhone size={16} />
                </span>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Phone number
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {profile.phone || "Not provided"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-1 h-8 w-8 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                  <FiMapPin size={16} />
                </span>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Full address
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {profile.address || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white/90 shadow-sm px-4 py-4 sm:px-5 sm:py-5 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="h-9 w-9 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                <FiMail size={18} />
              </span>
              <div>
                <h2 className="text-base md:text-lg font-semibold text-gray-900">
                  Login details
                </h2>
                <p className="text-xs text-gray-500">
                  ইমেইল এবং পাসওয়ার্ড সংক্রান্ত তথ্য
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Email
              </p>
              <div className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50/70 px-3 py-2">
                <FiMail className="text-gray-400" size={16} />
                <p className="text-sm font-medium text-gray-900 break-all">
                  {profile.email}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Password
                </p>
                <div className="flex items-center gap-1">
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className="h-2 w-2 bg-gray-500 rounded-full inline-block"
                      />
                    ))}
                </div>
              </div>
              <button className="inline-flex items-center justify-center gap-1 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-xs md:text-sm font-medium text-pink-700 hover:bg-pink-100">
                <FaEdit className="text-[11px]" />
                Reset password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
