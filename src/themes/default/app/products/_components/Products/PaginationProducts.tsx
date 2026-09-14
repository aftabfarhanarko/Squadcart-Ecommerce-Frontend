"use client";

import { Pagination } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const PaginationProducts: React.FC<{ total: number }> = ({ total }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const onPageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Pagination
      current={currentPage}
      total={total}
      pageSize={20} // Change based on items per page
      onChange={onPageChange}
      showSizeChanger={false}
    />
  );
};

export default PaginationProducts;
