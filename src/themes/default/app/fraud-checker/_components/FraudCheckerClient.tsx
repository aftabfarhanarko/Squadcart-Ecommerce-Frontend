/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { FiPhone, FiInfo, FiCheckCircle } from "react-icons/fi";
import { IoShieldCheckmark } from "react-icons/io5";

const FraudCheckerClient = () => {
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [message, setMessage] = useState("");
  const [phoneToCheck, setPhoneToCheck] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = /^01\d{9}$/.test(mobile.trim());
    if (!isValid) {
      setStatus("error");
      setMessage("সঠিক বাংলাদেশি মোবাইল নম্বর লিখুন (যেমন: 01712345678)");
      return;
    }
    setPhoneToCheck(mobile.trim());
    setStatus("idle");
    setMessage("");
  };

  useEffect(() => {
    const checkFraud = async () => {
      if (!phoneToCheck) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setResult(null);
      try {
        const response = await fetch(
          `https://fraudchecker.link/free-fraud-checker-bd/api/search.php?phone=${encodeURIComponent(
            phoneToCheck,
          )}`,
        );
        const data = await response.json();

        if (data?.success && data?.data) {
          setResult(data.data);
          setStatus("success");
          setMessage("ফ্রড চেক সফলভাবে সম্পন্ন হয়েছে।");
        } else {
          setStatus("error");
          setMessage("কোনো ডেটা পাওয়া যায়নি।");
        }
      } catch {
        setStatus("error");
        setMessage("ফ্রড স্ট্যাটাস চেক করা যায়নি, পরে আবার চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    };

    checkFraud();
  }, [phoneToCheck]);

  const phoneInfo =
    (result as any)?.phone_info || (result as any)?.phone || null;
  const summary = (result as any)?.summary || result || null;
  const totalOrders = Number(
    summary?.total_orders ?? summary?.totalOrders ?? summary?.total ?? 0,
  );
  const successfulOrders = Number(
    summary?.successful_orders ??
      summary?.successOrders ??
      summary?.success ??
      0,
  );
  const returnedOrders = Number(
    summary?.returned_orders ?? summary?.returnOrders ?? summary?.returned ?? 0,
  );
  const successRate =
    totalOrders > 0 ? Math.round((successfulOrders / totalOrders) * 100) : 0;

  const providers = (result as any)?.providers || result || {};
  const pathao = providers?.pathao || providers?.Pathao || null;
  const steadfast = providers?.steadfast || providers?.Steadfast || null;
  const redx = providers?.redx || providers?.Redx || providers?.RedX || null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-pink-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-pink-500 via-rose-500 to-fuchsia-500 flex items-center justify-center text-white text-3xl shadow-lg shadow-pink-300/50">
            <IoShieldCheckmark />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              কুরিয়ার ফ্রড চেকার
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
              বাংলাদেশি কুরিয়ার সার্ভিস গ্রাহকের ডেলিভারির ইতিহাস চেক করে
              অর্ডার নেওয়ার আগে ফ্রড ঝুঁকি নির্ধারণ করুন। Pathao, Steadfast এবং
              RedX কুরিয়ার সাপোর্টের জন্য উপযোগী।
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-[0_18px_45px_rgba(244,114,182,0.18)] border border-pink-100 p-5 sm:p-6 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-slate-800">
                মোবাইল নম্বর
              </label>
              <div className="flex items-center gap-3 px-3 py-3 rounded-full border border-pink-200 bg-pink-50">
                <FiPhone className="text-slate-400 text-xl" />
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="flex-1 bg-transparent outline-none text-sm sm:text-base text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-6 py-3 rounded-full text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 hover:from-pink-600 hover:via-rose-600 hover:to-fuchsia-500 shadow-md shadow-pink-300/50 transition-all duration-150"
            >
              ফ্রড চেক করুন
            </button>
          </form>

          {status !== "idle" && (
            <div
              className={`mt-4 rounded-xl px-4 py-3 text-sm flex items-start gap-2 ${
                status === "success"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}
            >
              <span className="mt-0.5">
                {status === "success" ? (
                  <FiCheckCircle className="text-emerald-500" />
                ) : (
                  <FiInfo className="text-rose-500" />
                )}
              </span>
              <p>{message}</p>
            </div>
          )}

          {loading && (
            <div className="mt-3 text-sm text-slate-600">
              ফ্রড ডেটা লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-5">
              <div className="rounded-2xl border border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 py-4 sm:px-6 sm:py-5">
                <h2 className="text-sm font-semibold text-slate-900 mb-3">
                  ফোন নম্বরের তথ্য
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                  <div className="rounded-xl bg-white border border-slate-100 px-4 py-3">
                    <p className="text-xs text-slate-500 mb-1">
                      কাস্টমারের ফোন নম্বর
                    </p>
                    <p className="text-sm font-semibold text-slate-900 break-words">
                      {phoneInfo?.original || phoneInfo?.number || phoneToCheck}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-100 px-4 py-3">
                    <p className="text-xs text-slate-500 mb-1">অপারেটর</p>
                    <p className="text-sm font-semibold text-emerald-600">
                      {phoneInfo?.operator ||
                        phoneInfo?.operator_name ||
                        "অজানা"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-100 px-4 py-3">
                    <p className="text-xs text-slate-500 mb-1">
                      ইন্টারন্যাশনাল নম্বর
                    </p>
                    <p className="text-sm font-semibold text-sky-600 break-words">
                      {phoneInfo?.e164 || phoneInfo?.international || ""}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-gradient-to-r from-slate-50 via-white to-slate-50 px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      ঝুঁকি মূল্যায়ন
                    </h2>
                    <p className="text-xs text-slate-500">
                      মোট অর্ডার, সফল ডেলিভারি এবং রিটার্ন অর্ডারের সারাংশ
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700">
                    মোট অর্ডার: {totalOrders}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-sm">
                  <div className="rounded-xl bg-white border border-slate-100 px-4 py-3">
                    <p className="text-xs text-slate-500 mb-1">সফল ডেলিভারি</p>
                    <p className="text-xl font-bold text-emerald-600">
                      {successfulOrders}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-100 px-4 py-3">
                    <p className="text-xs text-slate-500 mb-1">রিটার্ন অর্ডার</p>
                    <p className="text-xl font-bold text-red-500">
                      {returnedOrders}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-100 px-4 py-3">
                    <p className="text-xs text-slate-500 mb-1">
                      সামগ্রিক সফলতার হার
                    </p>
                    <p className="text-xl font-bold text-sky-600">
                      {successRate}%
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-400"
                      style={{ width: `${successRate}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50 via-white to-emerald-50 px-4 py-4 sm:px-5 sm:py-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    Pathao
                  </h3>
                  <p className="text-xs text-emerald-700 mb-3">
                    কুরিয়ার রিপোর্ট
                  </p>
                  <p className="text-xs text-slate-600 mb-1">
                    মোট ডেলিভারি:{" "}
                    <span className="text-emerald-700 font-semibold">
                      {pathao?.total_deliveries ?? pathao?.total ?? 0}
                    </span>
                  </p>
                  <p className="text-xs text-slate-600 mb-1">
                    সফল:{" "}
                    <span className="text-emerald-700 font-semibold">
                      {pathao?.success ?? 0}
                    </span>
                  </p>
                  <p className="text-xs text-slate-600 mb-1">
                    রিটার্ন:{" "}
                    <span className="text-amber-700 font-semibold">
                      {pathao?.returned ?? 0}
                    </span>
                  </p>
                </div>

                <div className="rounded-2xl border border-sky-100 bg-gradient-to-b from-sky-50 via-white to-sky-50 px-4 py-4 sm:px-5 sm:py-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    Steadfast
                  </h3>
                  {steadfast ? (
                    <>
                      <p className="text-xs text-sky-700 mb-3">
                        কুরিয়ার রিপোর্ট
                      </p>
                      <p className="text-xs text-slate-600 mb-1">
                        মোট ডেলিভারি:{" "}
                        <span className="text-sky-700 font-semibold">
                          {steadfast?.total_deliveries ?? steadfast?.total ?? 0}
                        </span>
                      </p>
                      <p className="text-xs text-slate-600 mb-1">
                        সফল:{" "}
                        <span className="text-emerald-700 font-semibold">
                          {steadfast?.success ?? 0}
                        </span>
                      </p>
                      <p className="text-xs text-slate-600 mb-1">
                        রিটার্ন:{" "}
                        <span className="text-amber-700 font-semibold">
                          {steadfast?.returned ?? 0}
                        </span>
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-sky-700">
                      API সংযোগ পাওয়া যায়নি, পরে আবার চেষ্টা করুন।
                    </p>
                  )}
                </div>

                <div className="rounded-2xl border border-rose-100 bg-gradient-to-b from-rose-50 via-white to-rose-50 px-4 py-4 sm:px-5 sm:py-5">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2">
                    RedX
                  </h3>
                  {redx ? (
                    <>
                      <p className="text-xs text-rose-700 mb-3">
                        কুরিয়ার রিপোর্ট
                      </p>
                      <p className="text-xs text-slate-600 mb-1">
                        মোট ডেলিভারি:{" "}
                        <span className="text-rose-700 font-semibold">
                          {redx?.total_deliveries ?? redx?.total ?? 0}
                        </span>
                      </p>
                      <p className="text-xs text-slate-600 mb-1">
                        সফল:{" "}
                        <span className="text-emerald-700 font-semibold">
                          {redx?.success ?? 0}
                        </span>
                      </p>
                      <p className="text-xs text-slate-600 mb-1">
                        রিটার্ন:{" "}
                        <span className="text-amber-700 font-semibold">
                          {redx?.returned ?? 0}
                        </span>
                      </p>
                    </>
                  ) : (
                    <p className="text-xs text-rose-700">
                      কোনো ডেলিভারি হিস্ট্রি পাওয়া যায়নি।
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2 text-violet-600">
            <FiInfo />
            <span className="text-sm font-semibold tracking-wide">
              কিভাবে ব্যবহার করবেন
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="h-7 w-7 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                <FiCheckCircle />
              </div>
              <p className="text-sm text-slate-800">
                বাংলাদেশের মোবাইল নম্বর লিখুন (যেমন: 01712345678)
              </p>
            </div>
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="h-7 w-7 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                <FiCheckCircle />
              </div>
              <p className="text-sm text-slate-800">
                বিভিন্ন কুরিয়ার সিস্টেমের ডেটা থেকে ডেলিভারি হিস্ট্রি বিশ্লেষণ।
              </p>
            </div>
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="h-7 w-7 rounded-full bg-violet-100 flex items-center justify-center text-violet-600">
                <FiCheckCircle />
              </div>
              <p className="text-sm text-slate-800">
                রিস্ক লেভেল এবং সাকসেস রেট দেখে অর্ডার কনফার্মের সিদ্ধান্ত নিন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FraudCheckerClient;

