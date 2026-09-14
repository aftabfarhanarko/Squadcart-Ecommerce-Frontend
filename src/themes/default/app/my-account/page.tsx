"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const MyAccount = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/my-account/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <p>Redirecting...</p>
    </div>
  );
};

export default MyAccount;
