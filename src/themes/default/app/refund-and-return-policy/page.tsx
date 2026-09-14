"use client";

import { FiCheckCircle, FiClock, FiRefreshCw, FiXCircle } from "react-icons/fi";

const RefundPolicyPage = () => {
  return (
    <main className="max-w-5xl mx-auto sm:px-5 px-3 py-10 space-y-10">
      <header className="space-y-3 text-center md:text-left">
        <span className="inline-block text-xs font-bold tracking-widest text-white px-4 py-2 rounded-full bg-primary mb-2">
          রিফান্ড ও রিটার্ন পলিসি
        </span>
        <h1 className="text-2xl md:text-3xl font-semibold text-primary">
          কবে, কীভাবে এবং কোন শর্তে রিফান্ড পাবেন
        </h1>
        <p className="text-sm md:text-base text-gray-600 max-w-2xl">
          আমাদের লক্ষ্য হলো সহজ, পরিষ্কার এবং ন্যায্য রিফান্ড ও রিটার্ন পলিসি
          অনুসরণ করা, যাতে আপনি নিশ্চিন্তে অর্ডার করতে পারেন। নিচে পুরো
          প্রক্রিয়া এবং শর্তগুলো ধাপে ধাপে ব্যাখ্যা করা হলো।
        </p>
      </header>

      <section className="grid grid-cols-2  md:grid-cols-4 sm:gap-4 gap-2">
        <div className="rounded-2xl bg-white border border-gray-200 p-4 flex flex-col gap-1">
          <div className="text-primary sm:text-xl text-lg">
            <FiClock />
          </div>
          <p className="text-xs font-semibold text-gray-900">
            রিফান্ড টাইমফ্রেম
          </p>
          <p className="text-xs text-[10px] text-gray-600">
            প্রডাক্ট ডেলিভারির পর সাধারণত ৭–১০ কর্মদিবসের মধ্যে রিফান্ড
            প্রক্রিয়াজাত করা হয়।
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-gray-200 p-4 flex flex-col gap-1">
          <div className="text-primary sm:text-xl text-lgl">
            <FiRefreshCw />
          </div>
          <p className="text-xs font-semibold text-gray-900">রিটার্ন উইন্ডো</p>
          <p className="text-xs text-[10px] text-gray-600">
            ডেলিভারির পর নির্দিষ্ট সময়ের (যেমন ৩–৭ দিন) মধ্যে রিটার্ন রিকোয়েস্ট
            করতে হবে।
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-gray-200 p-4 flex flex-col gap-1">
          <div className="text-green-500 sm:text-xl text-lg">
            <FiCheckCircle />
          </div>
          <p className="text-xs font-semibold text-gray-900">এপ্রুভড কন্ডিশন</p>
          <p className="text-xs text-[10px] text-gray-600">
            ভুল প্রডাক্ট, ডিফেক্টিভ বা ড্যামেজড পণ্য হলে রিফান্ড/রিপ্লেসমেন্ট
            প্রযোজ্য।
          </p>
        </div>
        <div className="rounded-2xl bg-white border border-gray-200 p-4 flex flex-col gap-1">
          <div className="text-red-500 sm:text-xl text-lg">
            <FiXCircle />
          </div>
          <p className="text-xs font-semibold text-gray-900">নন‑রিফান্ডেবল</p>
          <p className="sm:text-xs text-[10px] text-gray-600">
            কিছু ক্যাটাগরির পণ্য রিফান্ডের আওতায় পড়ে না (নিচে বিস্তারিত
            দেখুন)।
          </p>
        </div>
      </section>

      <section className="rounded-2xl bg-white border border-gray-200 px-6 py-8 md:px-8 md:py-9 shadow-sm space-y-8 text-gray-800">
        <article className="prose max-w-none prose-sm sm:prose-base text-gray-800 flex flex-col gap-4">
          <section>
            <h2>১. রিটার্ন করার সময়সীমা (Return Window)</h2>
            <p>
              সাধারণত প্রডাক্ট ডেলিভারি নেওয়ার পর{" "}
              <strong>৩–৭ কর্মদিবসের</strong> মধ্যে আপনি রিটার্ন বা রিফান্ডের
              জন্য আবেদন করতে পারবেন (ব্যবসায়িক নীতিমালা অনুযায়ী এই সময়সীমা
              পরিবর্তন হতে পারে)। নির্দিষ্ট সময়ের পর করা রিকোয়েস্ট সাধারণত
              গ্রহণ করা হয় না, যদি না বিশেষ কোনো পরিস্থিতি থাকে।
            </p>
            <ul>
              <li>ডেলিভারি তারিখ থেকে কাউন্ট শুরু হবে।</li>
              <li>
                প্রয়োজন হলে ডেলিভারি স্লিপ/মেসেজ প্রমাণ হিসেবে দেখাতে হতে পারে।
              </li>
              <li>
                টাইমফ্রেম শেষ হওয়ার আগে সাপোর্ট টিমের সাথে যোগাযোগ করতে হবে।
              </li>
            </ul>
          </section>

          <section>
            <h2>২. কোন কোন ক্ষেত্রে রিফান্ড/রিপ্লেসমেন্ট প্রযোজ্য</h2>
            <p>
              নিচের পরিস্থিতিগুলোর যেকোনো একটিতে আপনি রিফান্ড বা রিপ্লেসমেন্ট
              চাইতে পারেন:
            </p>
            <ul>
              <li>ভুল প্রডাক্ট পাওয়া (আপনার অর্ডারের সাথে মিলে না)।</li>
              <li>প্রডাক্ট ড্যামেজড বা ডিফেক্টিভ অবস্থায় পাওয়া।</li>
              <li>অর্ডার করা সাইজ/ভ্যারিয়েন্টের পরিবর্তে অন্য কিছু পাওয়া।</li>
              <li>ডেলিভারির আগেই অর্ডার ক্যানসেল রিকোয়েস্ট এপ্রুভ হওয়া।</li>
            </ul>
            <p>
              সব ক্ষেত্রে আমরা আগে প্রডাক্ট রিপ্লেসমেন্ট অফার করতে পারি; যদি
              রিপ্লেসমেন্ট সম্ভব না হয়, তখন রিফান্ড প্রসেস করা হবে।
            </p>
          </section>

          <section>
            <h2>৩. কোন কোন ক্ষেত্রে রিফান্ড প্রযোজ্য নয়</h2>
            <p>
              কিছু ক্যাটাগরির পণ্য কনজিউমার সেফটি ও নীতিমালার কারণে রিফান্ড বা
              রিটার্নের আওতায় থাকে না:
            </p>
            <ul>
              <li>ব্যবহৃত বা স্পষ্টভাবে ক্ষতিগ্রস্ত করা পণ্য।</li>
              <li>ট্যাগ/সিল/প্যাকেজিং ইচ্ছাকৃতভাবে নষ্ট করা হয়েছে এমন পণ্য।</li>
              <li>
                ইন্টিমেট, পার্সোনাল কেয়ার বা হাইজিন পণ্য (নীতিমালা অনুযায়ী)।
              </li>
              <li>ডিজিটাল প্রডাক্ট বা ই‑সার্ভিস যা একবার ডেলিভার্ড হয়েছে।</li>
              <li>“ফাইনাল সেল” বা নন‑রিফান্ডেবল হিসেবে মার্ক করা অফার পণ্য।</li>
            </ul>
          </section>

          <section>
            <h2>৪. রিটার্নের শর্ত ও প্রডাক্টের অবস্থা</h2>
            <p>
              রিটার্ন গ্রহণ করার জন্য সাধারণত নিচের কন্ডিশনগুলো পূরণ করতে হয়:
            </p>
            <ul>
              <li>প্রডাক্ট যতটা সম্ভব মূল অবস্থায় রাখতে হবে।</li>
              <li>
                অরিজিনাল বক্স, ট্যাগ, ম্যানুয়াল এবং এক্সেসরিজ থাকলে সাথে দিতে
                হবে।
              </li>
              <li>অর্ডার ইনভয়েস/স্লিপের কপি দিতে হতে পারে।</li>
              <li>
                ফ্রি গিফট থাকলে প্রযোজ্য ক্ষেত্রে সেটাও ফেরত দিতে হতে পারে।
              </li>
            </ul>
          </section>

          <section>
            <h2>৫. রিফান্ড প্রক্রিয়া ও কতদিনে টাকা পাবেন</h2>
            <p>
              রিটার্ন প্রডাক্ট আমাদের টিম বা পার্টনার দ্বারা চেক সম্পন্ন হওয়ার
              পর রিফান্ড প্রসেস শুরু হয়।
            </p>
            <ul>
              <li>
                ক্যাশ অন ডেলিভারি অর্ডারের ক্ষেত্রে ব্যাংক/মোবাইল ব্যাংকিং এ
                রিফান্ড দেওয়া হতে পারে।
              </li>
              <li>অনলাইন পেমেন্ট হলে সাধারণত একই পেমেন্ট মেথডে রিফান্ড যায়।</li>
              <li>
                রিফান্ড সম্পূর্ণ হতে সাধারণত ৭–১০ কর্মদিবস সময় লাগতে পারে।
              </li>
              <li>
                ব্যাংক/পেমেন্ট গেটওয়ের প্রসেসিং ডিলে আমাদের নিয়ন্ত্রণে থাকে না।
              </li>
            </ul>
          </section>

          <section>
            <h2>৬. রিটার্ন শিপিং চার্জ</h2>
            <p>
              রিটার্ন শিপিং চার্জ কে বহন করবে তা কন্ডিশন অনুযায়ী ভিন্ন হতে
              পারে:
            </p>
            <ul>
              <li>
                ভুল প্রডাক্ট বা ড্যামেজড পণ্য হলে সাধারণত শিপিং চার্জ আমরা বহন
                করি।
              </li>
              <li>
                মাইন্ড‑চেঞ্জ বা পছন্দ না হওয়ার কারণে রিটার্ন হলে কেস‑বাই‑কেস
                নীতিমালা প্রযোজ্য।
              </li>
              <li>ডিটেইল্ড শিপিং চার্জ নীতি সময় সময় আপডেট হতে পারে।</li>
            </ul>
          </section>

          <section>
            <h2>৭. পার্শিয়াল রিফান্ড ও অ্যাডজাস্টমেন্ট</h2>
            <p>
              কিছু ক্ষেত্রে পুরো টাকার পরিবর্তে পার্শিয়াল রিফান্ড বা
              অ্যাডজাস্টমেন্ট হতে পারে:
            </p>
            <ul>
              <li>
                বক্স/অ্যাক্সেসরিজ না থাকলে ভ্যালু থেকে কিছুটা কেটে নেওয়া হতে
                পারে।
              </li>
              <li>
                প্রডাক্ট আংশিক ব্যবহার করা হলে পার্শিয়াল রিফান্ড প্রযোজ্য হতে
                পারে।
              </li>
              <li>
                ফিউচার অর্ডারে ভাউচার/ক্রেডিট হিসেবে অ্যাডজাস্ট করার সুযোগ থাকতে
                পারে।
              </li>
            </ul>
          </section>

          <section>
            <h2>৮. প্রডাক্ট টাইপ অনুযায়ী রিফান্ড উদাহরণ</h2>
            <p>
              বিভিন্ন ধরনের পণ্যের ক্ষেত্রে রিফান্ড নীতিমালা বাস্তবে কিছুটা
              ভিন্ন হতে পারে। নিচে কিছু সাধারণ প্রডাক্ট টাইপ অনুযায়ী বাস্তব
              উদাহরণ দেওয়া হলো:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-4">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-900 mb-1">
                  ইলেকট্রনিক্স / গ্যাজেট
                </p>
                <ul className="text-xs text-gray-700 list-disc list-inside space-y-1">
                  <li>
                    ডেলিভারির পর স্বল্প সময়ের মধ্যে ডেড/ডিফেক্টিভ হলে
                    রিফান্ড/রিপ্লেস।
                  </li>
                  <li>
                    বক্স, চার্জার, কেবল, ওয়ারেন্টি কার্ড ইত্যাদি থাকলে সঙ্গে
                    দিতে হবে।
                  </li>
                  <li>
                    শরীরের সাথে ব্যবহৃত ইয়ারফোন/হেডফোনের ক্ষেত্রে আলাদা নীতি
                    প্রযোজ্য হতে পারে।
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-900 mb-1">
                  ফ্যাশন / পোশাক / জুতা
                </p>
                <ul className="text-xs text-gray-700 list-disc list-inside space-y-1">
                  <li>
                    ট্যাগ কাটা না থাকলে এবং ব্যবহার না করলে সাইজ সমস্যা হলে
                    রিটার্ন সম্ভব।
                  </li>
                  <li>
                    স্পষ্ট দাগ, ক্ষতি বা ব্যবহারের চিহ্ন থাকলে রিফান্ড নাও
                    প্রযোজ্য হতে পারে।
                  </li>
                  <li>
                    লিমিটেড এডিশন বা কাস্টমাইজড আইটেমে নন‑রিফান্ডেবল নীতি থাকতে
                    পারে।
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-900 mb-1">
                  বিউটি / কসমেটিকস / হাইজিন
                </p>
                <ul className="text-xs text-gray-700 list-disc list-inside space-y-1">
                  <li>
                    সিল/সিকিউরিটি সিল ভাঙা থাকলে সাধারণত রিটার্ন গ্রহণ করা হয়
                    না।
                  </li>
                  <li>
                    ডেলিভারির সময় ড্যামেজড বা লিকেজ থাকলে প্রমাণসহ দ্রুত জানাতে
                    হবে।
                  </li>
                  <li>
                    পার্সোনাল কেয়ার পণ্যে স্বাস্থ্যবিধি অনুযায়ী কড়া নন‑রিফান্ড
                    নীতি থাকতে পারে।
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs font-semibold text-gray-900 mb-1">
                  হোম ও ডেকর / অন্যান্য
                </p>
                <ul className="text-xs text-gray-700 list-disc list-inside space-y-1">
                  <li>
                    ডেলিভারির সময় ব্রেকেবল আইটেম ইমিডিয়েটলি চেক করে সমস্যা
                    থাকলে সঙ্গে সঙ্গে জানাতে হবে।
                  </li>
                  <li>
                    কাস্টম‑মেড বা প্রি‑অর্ডার আইটেমে অগ্রিম পেমেন্ট আংশিক
                    নন‑রিফান্ডেবল হতে পারে।
                  </li>
                  <li>
                    প্রয়োজনমতো ক্যাটাগরি স্পেসিফিক এক্সট্রা শর্ত প্রডাক্ট
                    ডিটেইলে উল্লেখ থাকতে পারে।
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2>৯. পলিসি পরিবর্তন ও আপডেট</h2>
            <p>
              আইনগত আপডেট, পার্টনার চেঞ্জ বা সার্ভিস মডিফিকেশনের কারণে আমাদের
              রিফান্ড এবং রিটার্ন পলিসি সময় সময় আপডেট হতে পারে। গুরুত্বপূর্ণ
              পরিবর্তন হলে আমরা ওয়েবসাইট, নোটিফিকেশন বা অন্য যেকোনো উপায়ে আপনাকে
              জানাব।
            </p>
          </section>

          <section>
            <h2>১০. সাহায্য প্রয়োজন?</h2>
            <p>
              রিফান্ড বা রিটার্ন নিয়ে কোনো প্রশ্ন, অভিযোগ বা বিশেষ পরিস্থিতি
              থাকলে আমাদের কাস্টমার সাপোর্ট টিমের সাথে সরাসরি যোগাযোগ করুন। আমরা
              চেষ্টা করি প্রতিটি কেস ন্যায্যভাবে এবং দ্রুত হ্যান্ডেল করতে।
            </p>
          </section>
        </article>
      </section>
    </main>
  );
};

export default RefundPolicyPage;
