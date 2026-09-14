"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import {
  FiCheckCircle,
  FiMail,
  FiMapPin,
  FiPhone,
  FiSend,
} from "react-icons/fi";
import { API_CONFIG } from "@/lib/api-config";
import { getSystemUserByCompanyId } from "@/lib/api-services";
import { SystemUser } from "@/types/system-user";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  reason?: string;
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

const ContactUs = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    reason: "",
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({ type: "idle" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [companyInfo, setCompanyInfo] = useState<SystemUser | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      containerRef.current.style.setProperty("--mouse-x", `${x}px`);
      containerRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const data = await getSystemUserByCompanyId(API_CONFIG.companyId);
        if (data) setCompanyInfo(data);
      } catch {}
    };
    loadCompany();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ type: "loading" });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setFormStatus({
        type: "success",
        message: "Message sent successfully! We'll get back to you soon.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setFormStatus({ type: "idle" });
      }, 4000);
    } catch (error) {
      setFormStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative bg-gradient-to-br from-white to-primary/5 overflow-hidden"
      style={
        {
          "--mouse-x": "0px",
          "--mouse-y": "0px",
        } as React.CSSProperties
      }
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 py-12 sm:py-16 md:py-24">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in">
          <div className="inline-block mb-6">
            <span className="text-xs font-bold tracking-widest text-white px-4 py-2 rounded-full bg-primary">
              আমাদের সাথে যোগাযোগ
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black mb-6 leading-tight text-primary">
            {`চলুন কথা বলি`}
          </h1>

          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            {` আমাদের পণ্য বা সেবাসমূহ নিয়ে কোনো প্রশ্ন থাকলে নির্দ্বিধায় বার্তা দিন। আমরা দ্রুত উত্তর দেওয়ার চেষ্টা করি।`}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
          {[
            {
              icon: FiMail,
              title: "ইমেইল",
              content: companyInfo?.email || "skshobuj9988@gmail.com",
              description: "সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর",
            },
            {
              icon: FiPhone,
              title: "ফোন",
              content: companyInfo?.phone || "(+৮৮) ০১৭৭৪৬১৭৪৫২",
              description: "শনিবার থেকে বৃহস্পতিবার, সকাল ৯টা–সন্ধ্যা ৬টা",
            },
            {
              icon: FiMapPin,
              title: "ঠিকানা",
              content:
                companyInfo?.branchLocation ||
                "স্টেশন রোড, শাপলা চত্তর, রংপুর।",
              description: "শোরুম এবং অফিস",
            },
            {
              icon: FaWhatsapp,
              title: "হোয়াটসঅ্যাপ",
              content: "চ্যাট করুন",
              description: "তাৎক্ষণিক কথোপকথন",
              href: (() => {
                const raw = (companyInfo?.phone || "01774617452").replace(
                  /[^\d]/g,
                  "",
                );
                return `https://wa.me/88${raw}`;
              })(),
            },
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col items-start"
              >
                <div className="w-14 h-14 min-w-[56px] min-h-[56px] max-w-[56px] max-h-[56px] rounded-2xl inline-flex items-center justify-center mb-5 text-primary group-hover:scale-110 transition-transform duration-300 bg-primary/10 border border-primary/20 flex-shrink-0">
                  <IconComponent size={26} />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-1.5">
                  {item.title}
                </h3>
                {"href" in item && item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-bold text-gray-800 mb-1 underline decoration-primary hover:text-primary transition-colors break-all"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-sm font-bold text-gray-800 mb-1 break-all">
                    {item.content}
                  </p>
                )}
                <p className="text-xs text-gray-500 leading-relaxed mt-auto pt-2">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Contact Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Form */}
          <div className="order-2 lg:order-1 max-w-xl mx-auto w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                >
                  পূর্ণ নাম
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 bg-white"
                  style={{
                    borderColor:
                      focusedField === "name" ? "#D31A7A" : "#e5e7eb",
                    boxShadow:
                      focusedField === "name"
                        ? "0 0 0 3px rgba(211, 26, 122, 0.1)"
                        : "none",
                  }}
                  placeholder="আপনার নাম"
                />
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                >
                  ইমেইল
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 bg-white"
                  style={{
                    borderColor:
                      focusedField === "email" ? "#D31A7A" : "#e5e7eb",
                    boxShadow:
                      focusedField === "email"
                        ? "0 0 0 3px rgba(211, 26, 122, 0.1)"
                        : "none",
                  }}
                  placeholder="example@email.com"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                >
                  বিষয়
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  required
                  className="w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 bg-white"
                  style={{
                    borderColor:
                      focusedField === "subject" ? "#D31A7A" : "#e5e7eb",
                    boxShadow:
                      focusedField === "subject"
                        ? "0 0 0 3px rgba(211, 26, 122, 0.1)"
                        : "none",
                  }}
                  placeholder="কিসের বিষয়ে?"
                />
              </div>
              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                >
                  যোগাযোগের কারণ
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, reason: e.target.value }))
                  }
                  className="w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 bg-white"
                  style={{
                    borderColor:
                      focusedField === "reason" ? "#D31A7A" : "#e5e7eb",
                    boxShadow:
                      focusedField === "reason"
                        ? "0 0 0 3px rgba(211, 26, 122, 0.1)"
                        : "none",
                  }}
                  onFocus={() => setFocusedField("reason")}
                  onBlur={() => setFocusedField(null)}
                >
                  <option value="">একটি কারণ নির্বাচন করুন</option>
                  <option value="product">পণ্য সংক্রান্ত</option>
                  <option value="order">অর্ডার সংক্রান্ত</option>
                  <option value="delivery">ডেলিভারি সংক্রান্ত</option>
                  <option value="refund">রিটার্ন/রিফান্ড</option>
                  <option value="other">অন্যান্য</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-900 mb-3"
                >
                  বার্তা
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={6}
                  className="w-full px-6 py-4 rounded-xl border-2 transition-all duration-300 bg-white resize-none"
                  style={{
                    borderColor:
                      focusedField === "message" ? "#D31A7A" : "#e5e7eb",
                    boxShadow:
                      focusedField === "message"
                        ? "0 0 0 3px rgba(211, 26, 122, 0.1)"
                        : "none",
                  }}
                  placeholder="আরও বিস্তারিত লিখুন..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formStatus.type === "loading"}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 group"
              >
                {formStatus.type === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    পাঠানো হচ্ছে...
                  </>
                ) : (
                  <>
                    <FiSend
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                    বার্তা পাঠান
                  </>
                )}
              </button>

              {/* Status Messages */}
              {formStatus.type === "success" && (
                <div className="p-4 bg-green-50 border-2 border-green-500 rounded-xl flex items-start gap-3 animate-fade-in">
                  <FiCheckCircle
                    size={20}
                    className="text-green-600 mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-green-900">
                      বার্তা সফলভাবে পাঠানো হয়েছে! খুব শিগগিরই যোগাযোগ করা হবে।
                    </p>
                  </div>
                </div>
              )}

              {formStatus.type === "error" && (
                <div className="p-4 bg-red-50 border-2 border-red-500 rounded-xl">
                  <p className="font-semibold text-red-900">
                    কোনো ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Info Section */}
          <div className="order-1 lg:order-2 rounded-3xl p-8 sm:p-12 text-white shadow-2xl bg-primary">
            <h2 className="text-4xl font-black mb-8 leading-tight">
              {`আমরা সবসময় পাশে`}
            </h2>

            <div className="space-y-8 mb-10">
              <div className="flex gap-4">
                <div className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">দ্রুত উত্তর</h3>
                  <p className="text-white/90">
                    সাধারণত ২৪ ঘণ্টার মধ্যে অধিকাংশ প্রশ্নের উত্তর দেওয়া হয়
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">এক্সপার্ট সাপোর্ট</h3>
                  <p className="text-white/90">
                    বিশেষজ্ঞ টিম সাহায্য করতে সদা প্রস্তুত
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">বহুমাত্রিক যোগাযোগ</h3>
                  <p className="text-white/90">
                    ইমেইল, ফোন বা কন্টাক্ট ফর্ম— যেকোনো মাধ্যমে যোগাযোগ করুন
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/30">
              <p className="text-sm text-white/80">
                শনিবার–বৃহস্পতিবার সকাল ৯টা থেকে সন্ধ্যা ৬টা পর্যন্ত সাপোর্ট
                খোলা থাকে। জরুরি প্রয়োজনে ফোন করুন।
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 text-base sm:text-lg">
                <Link
                  href="/"
                  className="border rounded-full p-1.5 sm:p-2 hover:bg-white/10"
                >
                  <FaFacebookF />
                </Link>
                <Link
                  href="/"
                  className="border rounded-full p-1.5 sm:p-2 hover:bg-white/10"
                >
                  <FaXTwitter />
                </Link>
                <Link
                  href="/"
                  className="border rounded-full p-1.5 sm:p-2 hover:bg-white/10"
                >
                  <FaInstagram />
                </Link>
                <Link
                  href="/"
                  className="border rounded-full p-1.5 sm:p-2 hover:bg-white/10"
                >
                  <FaTiktok />
                </Link>
                <a
                  href={(() => {
                    const raw = (companyInfo?.phone || "01774617452").replace(
                      /[^\d]/g,
                      "",
                    );
                    return `https://wa.me/88${raw}`;
                  })()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border rounded-full p-1.5 sm:p-2 hover:bg-white/10"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <div className="relative h-[240px] sm:h-[300px] md:h-[350px]">
              <iframe
                title="Map"
                src={`https://www.google.com/maps?q=${encodeURIComponent(companyInfo?.branchLocation || "স্টেশন রোড, শাপলা চত্তর, রংপুর")}&output=embed`}
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-gray-700 text-lg">
            {` যা খুঁজছেন তা পাচ্ছেন না?`}
            <Link
              href="#"
              className="font-bold hover:opacity-80 transition-opacity ml-1 text-primary"
            >
              আমাদের FAQ দেখুন
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        div[style*="--mouse-x"]::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(211, 26, 122, 0.08),
            transparent 40%
          );
        }
      `}</style>
    </div>
  );
};

export default ContactUs;
