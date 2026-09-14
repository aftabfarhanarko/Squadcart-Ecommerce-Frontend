import { Breadcrumb } from "antd";
import Link from "next/link";

const BreadCrumb = ({ title }: { title: string }) => {
  return (
    <div>
      <Breadcrumb
        items={[
          {
            title: <Link href="/">Home</Link>,
          },
          {
            title: <Link href="/products">Products</Link>,
          },
          {
            title: <p className=" line-clamp-1">{title}</p>,
          },
        ]}
      />
    </div>
  );
};

export default BreadCrumb;
