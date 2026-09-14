"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiAward,
  FiCheckCircle,
  FiCreditCard,
  FiHeadphones,
  FiHeart,
  FiPackage,
  FiPhoneCall,
  FiRefreshCw,
  FiShield,
  FiTruck,
} from "react-icons/fi";

export default function AboutUsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/40 to-white">
      <div className="max-w-7xl mx-auto px-5 py-10 space-y-10">
        <section className="rounded-3xl border border-pink-100 bg-white/80 shadow-sm backdrop-blur-sm px-6 py-8 md:px-10 md:py-10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-1 border border-pink-100">
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                <span className="text-[11px] font-semibold text-pink-700">
                  আমাদের সম্পর্কে · চিত্রকর্মো
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-[32px] font-semibold text-gray-900 leading-tight">
                আমরা কারা এবং কী করি
              </h1>
              <p className="text-sm md:text-[15px] text-gray-600">
                দ্রুত ডেলিভারি, নিরাপদ পেমেন্ট এবং অথেনটিক পণ্যের প্রতিশ্রুতি
                নিয়ে চিত্রকর্মো আপনার অনলাইন কেনাকাটাকে করে আরও সহজ ও
                বিশ্বাসযোগ্য। প্রতিটি অর্ডারের পেছনে আছে একটি নিবেদিত টিম।
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 text-center">
                  <p className="text-xl font-bold text-primary">5+</p>
                  <p className="text-[11px] text-gray-600">বছরের অভিজ্ঞতা</p>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 text-center">
                  <p className="text-xl font-bold text-primary">10k+</p>
                  <p className="text-[11px] text-gray-600">পণ্য</p>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 text-center">
                  <p className="text-xl font-bold text-primary">500+</p>
                  <p className="text-[11px] text-gray-600">পার্টনার</p>
                </div>
                <div className="rounded-2xl bg-gray-50 border border-gray-200 px-4 py-3 text-center">
                  <p className="text-xl font-bold text-primary">100k+</p>
                  <p className="text-[11px] text-gray-600">গ্রাহক</p>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3 text-xs md:text-sm text-gray-700">
                <div className="flex gap-3 rounded-2xl border border-gray-200 bg-white/80 px-4 py-3">
                  <div className="mt-1 text-primary">
                    <FiTruck />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      দ্রুত ডেলিভারি
                    </p>
                    <p className="mt-1 text-[11px] md:text-xs text-gray-600">
                      সারা দেশে নির্ভরযোগ্য শিপিং নেটওয়ার্ক।
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-2xl border border-gray-200 bg-white/80 px-4 py-3">
                  <div className="mt-1 text-primary">
                    <FiPackage />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">অথেনটিক পণ্য</p>
                    <p className="mt-1 text-[11px] md:text-xs text-gray-600">
                      যাচাইকৃত ও ব্র্যান্ডেড পণ্য, যাতে থাকে মানের নিশ্চয়তা।
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 rounded-2xl border border-gray-200 bg-white/80 px-4 py-3">
                  <div className="mt-1 text-primary">
                    <FiPhoneCall />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      সহায়তা সাপোর্ট
                    </p>
                    <p className="mt-1 text-[11px] md:text-xs text-gray-600">
                      যেকোন প্রশ্নে দ্রুত রেসপন্স ও গাইডলাইন।
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-gray-50/60 p-6 md:p-7">
              <h3 className="text-sm font-semibold text-gray-900">
                আমাদের মূল ফোকাস
              </h3>
              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <div className="flex gap-3">
                  <div className="mt-1 text-primary">
                    <FiHeart />
                  </div>
                  <div>
                    <p className="font-semibold">গ্রাহকের প্রতি প্রতিশ্রুতি</p>
                    <p className="text-xs text-gray-600 mt-1">
                      মানসম্মত পণ্য এবং দ্রুত সেবা দিয়ে দীর্ঘমেয়াদি সম্পর্ক
                      গড়ে তোলা।
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 text-primary">
                    <FiAward />
                  </div>
                  <div>
                    <p className="font-semibold">বিশ্বস্ত ব্র্যান্ড ইমেজ</p>
                    <p className="text-xs text-gray-600 mt-1">
                      ই-কমার্সে আস্থা তৈরি করতে স্বচ্ছ মূল্য এবং পরিষ্কার
                      নীতিমালা।
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1 text-primary">
                    <FiShield />
                  </div>
                  <div>
                    <p className="font-semibold">নিরাপত্তা ও নিশ্চয়তা</p>
                    <p className="text-xs text-gray-600 mt-1">
                      পেমেন্ট ও ডেলিভারির প্রতিটি ধাপে গ্রাহকের তথ্যের নিরাপত্তা
                      নিশ্চিতকরণ।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 md:p-7">
            <h3 className="text-lg md:text-xl font-bold text-primary">
              কেন আমাদের বেছে নেবেন
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <FiCheckCircle className="text-primary" /> ১০০% অথেনটিক পণ্য
              </li>
              <li className="flex items-center gap-2">
                <FiTruck className="text-primary" /> দ্রুত ডেলিভারি ও ট্র্যাকিং
                সুবিধা
              </li>
              <li className="flex items-center gap-2">
                <FiRefreshCw className="text-primary" /> সহজ রিটার্ন ও এক্সচেঞ্জ
                নীতিমালা
              </li>
              <li className="flex items-center gap-2">
                <FiCreditCard className="text-primary" /> নিরাপদ অনলাইন পেমেন্ট
                গেটওয়ে
              </li>
              <li className="flex items-center gap-2">
                <FiHeadphones className="text-primary" /> ২৪/৭ গ্রাহক সহায়তা
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white/80 p-6 md:p-7">
            <h3 className="text-lg md:text-xl font-bold text-primary">
              প্রায়শই জিজ্ঞাসিত প্রশ্ন
            </h3>
            <div className="mt-4 space-y-3">
              {[
                {
                  q: "ডেলিভারি কতদিনে?",
                  a: "সাধারণত ১-৩ কর্মদিবসের মধ্যে অর্ডার পৌঁছে যায়, অবস্থানভেদে সময় কিছুটা ভিন্ন হতে পারে।",
                },
                {
                  q: "পণ্য অরিজিনাল কি?",
                  a: "সব পণ্য যাচাইকৃত সোর্স থেকে সংগ্রহ করা হয় এবং প্রতিটি অর্ডার গ্যারান্টিযুক্ত।",
                },
                {
                  q: "রিটার্ন কীভাবে করবো?",
                  a: "রিটার্ন নীতিমালা অনুসারে নির্ধারিত সময়ের মধ্যে অনুরোধ করলে আমাদের টিম আপনাকে সম্পূর্ণ গাইড করবে।",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-200 bg-white"
                >
                  <button
                    type="button"
                    className="w-full text-left px-4 py-3 text-sm font-medium text-gray-900"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    {item.q}
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-3 text-xs md:text-sm text-gray-700">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-pink-100 bg-white/80 px-6 py-6 md:px-8 md:py-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-sm font-semibold text-gray-900">
              আপনার ব্র্যান্ড বা সংগ্রহটির জন্য চিত্রকর্মোর সাথে যুক্ত হতে চান?
            </p>
            <p className="text-xs md:text-sm text-gray-600">
              যেকোন পার্টনারশিপ, প্রশ্ন বা বিশেষ প্রোজেক্ট নিয়ে কথা বলতে আমাদের
              সাথে যোগাযোগ করুন।
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            <Link
              href="/contact-us"
              className="px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 text-sm font-medium"
            >
              যোগাযোগ করুন
            </Link>
            <a
              href="https://wa.me/8801XXXXXXXXX"
              target="_blank"
              className="px-5 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary/10 text-sm font-medium"
            >
              WhatsApp
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
