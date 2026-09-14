"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdOutlineFeed,
  MdOutlineLocationOn,
  MdOutlineReviews,
} from "react-icons/md";
import { RiHome5Line } from "react-icons/ri";

const menuItems = [
  {
    id: 1,
    name: "Dashboard",
    icon: <RiHome5Line size={20} />,
    link: "dashboard",
  },
  {
    id: 2,
    name: "My Orders",
    icon: <MdOutlineFeed size={20} />,
    link: "orders",
  },
  {
    id: 3,
    name: "Saved Address",
    icon: <MdOutlineLocationOn size={20} />,
    link: "address",
  },
  {
    id: 4,
    name: "Reviews",
    icon: <MdOutlineReviews size={20} />,
    link: "reviews",
  },
];

const Menu = () => {
  const path = usePathname().split("/").pop();
  console.log(path);
  return (
    <div className=" flex flex-col gap-3">
      {menuItems.map((item) => (
        <Link
          href={`/my-account/${item.link}`}
          key={item.id}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer hover:bg-pink-50 hover:text-primary",
            path === item.link ? "bg-pink-100 text-primary shadow-sm" : "text-gray-700"
          )}
        >
          <div>{item.icon}</div>
          <div>{item.name}</div>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
