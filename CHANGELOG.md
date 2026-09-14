# SquadCart Themes — Change Log

> বিস্তারিত প্রজেক্ট হিস্ট্রি — সর্বশেষ থেকে সর্বপ্রথম

---

## v1.2.0 — Build Crash Fixes (2026-02-28)

**বাগ ফিক্স:**

- **Apollo GraphQL Build Issue:** `src/themes/default/app/flashSell/all/page.tsx` এবং `FlashSaleProduct.tsx` এ `client.query` গুলোকে `try/catch` ব্লকের মাঝে wrap করা হয়েছে।
- _কারণ:_ Next.js build-এর সময় GraphQL সার্ভার এভেইলেবল না থাকার কারণে `ECONNREFUSED` error থ্রো করে বিল্ড ফেইল হচ্ছিল।

---

## v1.1.0 — Multi-Theme & Server-side Tenancy (2026-02-27)

**নতুন আর্কিটেকচার:**

- **`src/themes` Directory:** প্রজেক্টের কোর আর্কিটেকচার রিফ্যাক্টর করে সব থিম `src/themes/` ফোল্ডারে নিয়ে আসা হয়েছে।
- **Server Components Multi-Tenancy:**
  - `getSystemUserByCompanyId(companyId)` ফাংশন যোগ করা হয়েছে।
  - প্রতিটি page-route অনুযায়ী ডাইনামিকভাবে থিম লোড করানো হচ্ছে।
- **Global Headers (Axios):** Backend request-এর সময় globally `x-tenant-domain` হেডার যুক্ত করার লজিক ইমপ্লিমেন্ট করা হয়েছে।

---

## v1.0.0 — Basic Store Frontend (2026-02-25)

**প্রধান আপডেট:**

- বেসিক ই-কমার্স থিম স্ট্রাকচার, checkout page error resolution, এবং লিন্টিং ইশ্যু ফিক্স করা হয়েছে।
- Checkout পেইজে Variable redeclaration (`let name ...`) জনিত সমস্যা সমাধান করা হয়েছে।
- `node:22-alpine` Dockerfile base-image এবং `output: 'standalone'` কনফিগার করা হয়েছে।
