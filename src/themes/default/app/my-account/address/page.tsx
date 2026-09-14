"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getApiUrl, getApiHeaders } from "@/lib/api-config";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { FiMapPin, FiPhone } from "react-icons/fi";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  district?: string;
}

export default function Address() {
  const { userSession } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    district: "",
    phone: "",
  });
  const [saving, setSaving] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await axios.get(getApiUrl("/users/me"), {
        headers: getApiHeaders(userSession?.accessToken),
      });
      const userData = response.data.data;
      setProfile(userData);
      setFormData({
        address: userData.address || "",
        district: userData.district || "",
        phone: userData.phone || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  }, [userSession?.accessToken]);

  useEffect(() => {
    if (userSession?.accessToken) {
      fetchProfile();
    }
  }, [userSession, fetchProfile]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await axios.patch(getApiUrl("/users/me"), formData, {
        headers: getApiHeaders(userSession?.accessToken),
      });
      setProfile(response.data.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating address:", error);
      alert("Failed to update address. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        address: profile.address || "",
        district: profile.district || "",
        phone: profile.phone || "",
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <section className="w-full flex justify-center items-center min-h-[320px]">
        <div className="max-w-md w-full text-center space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-1 border border-pink-100">
            <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-[11px] font-medium text-pink-700">
              Loading your address
            </span>
          </div>
          <p className="text-sm text-gray-600">
            আপনার সেভ করা ডেলিভারি ঠিকানা লোড হচ্ছে, একটু অপেক্ষা করুন।
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
            ঠিকানা লোড করা যায়নি
          </p>
          <p className="text-xs md:text-sm text-red-600">
            অনুগ্রহ করে পেজটি রিফ্রেশ করুন বা একটু পরে আবার চেষ্টা করুন।
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white shadow-md px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-pink-100/90">
              My account
            </p>
            <h2 className="text-xl md:text-2xl font-semibold">Saved address</h2>
            <p className="text-xs sm:text-sm text-pink-50/95 max-w-md">
              পছন্দের ডেলিভারি ঠিকানা আপডেট করে রাখুন, যেন প্রতিবার অর্ডার আরও
              দ্রুত হয়।
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs sm:text-sm">
            <FiMapPin className="text-pink-100" />
            <span>ডিফল্ট ডেলিভারি লোকেশন</span>
          </div>
        </div>
      </div>

      <div className="bg-white/95 rounded-2xl shadow-sm border border-pink-50 px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
              <FiMapPin size={18} />
            </span>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900">
                Default address
              </h3>
              <p className="text-xs text-gray-500">
                এই ঠিকানাতেই আপনার অর্ডার ডেলিভারি করা হবে।
              </p>
            </div>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1 rounded-full border border-pink-200 bg-pink-50 px-4 py-2 text-xs md:text-sm font-medium text-pink-700 hover:bg-pink-100"
            >
              <FaEdit className="text-[11px]" />
              Edit address
            </button>
          ) : (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-1 rounded-full bg-primary px-4 py-2 text-xs md:text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
              >
                <FaSave className="text-[11px]" />
                {saving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-4 py-2 text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-200"
              >
                <FaTimes className="text-[11px]" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">
                  Phone number
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/60 px-3 py-2">
                  <FiPhone className="text-gray-400" size={16} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="Enter phone number"
                    className="w-full bg-transparent text-sm outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-600">
                  District
                </label>
                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/60 px-3 py-2">
                  <FiMapPin className="text-gray-400" size={16} />
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) =>
                      setFormData({ ...formData, district: e.target.value })
                    }
                    placeholder="Enter district"
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
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="Enter full address"
                  rows={3}
                  className="w-full bg-transparent text-sm outline-none resize-none"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-8 w-8 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                <FiPhone size={16} />
              </span>
              <div>
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
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  District
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {profile.district || "Not provided"}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-8 w-8 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center">
                <FiMapPin size={16} />
              </span>
              <div>
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
    </div>
  );
}
