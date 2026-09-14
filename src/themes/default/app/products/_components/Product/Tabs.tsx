"use client";

import type { TabsProps } from "antd";
import { Tabs } from "antd";
import Description from "./Description";
import ReturnPolicies from "./ReturnPolicies";
import Reviews from "./Reviews";
import { Review } from "@/types/review";

interface CategoryProps {
  name: string;
  slug: string;
}
interface List {
  id: string;
  item: string;
}

interface ListItems {
  id: string;
  title: string;
  list: List[];
}
interface DescriptionProps {
  id: string;
  summary: string;
  list_items: ListItems[];
}
interface ImageProps {
  name: string;
  url: string;
}
interface VariantProps {
  available_quantity: number;
  id: string;
  price: number;
  size: string;
  stock_status: string;
}
interface ProductProps {
  product: {
    id?: number | string;
    SKU: string;
    documentId: string;
    off: number;
    title: string;
    total_sale: number;
    categories: CategoryProps[];
    description: DescriptionProps;
    images: ImageProps[];
    reviews: Review[];
    variant: VariantProps[];
    companyId?: string;
  };
  returnPolicyContent?: string;
}
const Tab: React.FC<ProductProps> = ({ product, returnPolicyContent }) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Description",
      children: <Description description={product?.description} />,
    },

    {
      key: "2",
      label: "Reviews",
      children: (
        <Reviews
          reviews={product?.reviews}
          productId={Number(product?.documentId || product?.id)}
          companyId={product?.companyId}
        />
      ),
    },
    {
      key: "3",
      label: "Return Policies",
      children: <ReturnPolicies content={returnPolicyContent} />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} />;
};

export default Tab;
