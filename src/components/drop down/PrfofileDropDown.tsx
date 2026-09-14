"use client";
import { useAuth } from "../../context/AuthContext";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import {
  IoCartOutline,
  IoLocationOutline,
  IoLogInOutline,
  IoHeartOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { MdOutlineManageAccounts } from "react-icons/md";
import { useRouter } from "next/navigation";

const ProfileDropDown: React.FC = () => {
  const { userSession, logout } = useAuth();
  const router = useRouter();

  const userName = userSession?.user?.name || "Guest user";
  const userEmail = (userSession as { user?: { email?: string } } | undefined)
    ?.user?.email;
  const initials =
    userName
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-3 px-1 py-1.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 text-xs font-semibold text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {userName}
            </p>
            {userEmail && (
              <p className="text-xs text-gray-500 truncate">{userEmail}</p>
            )}
          </div>
        </div>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      icon: <MdOutlineManageAccounts size={20} />,
      label: "Manage Account",
    },
    {
      key: "3",
      icon: <IoCartOutline size={20} />,
      label: "My Orders",
    },
    {
      key: "4",
      icon: <IoLocationOutline size={20} />,
      label: "Address",
    },
    {
      key: "5",
      icon: <IoHeartOutline size={20} />,
      label: "Wishlist",
    },
    {
      key: "6",
      icon: <IoSettingsOutline size={20} />,
      label: "Settings",
    },
    {
      key: "7",
      icon: <IoLogInOutline size={20} style={{ color: "#dc2626" }} />,
      label: "Log out",
      danger: true,
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "2":
        router.push("/my-account/dashboard");
        break;
      case "3":
        router.push("/my-account/orders");
        break;
      case "4":
        router.push("/my-account/address");
        break;
      case "5":
        router.push("/my-account/wishlist");
        break;
      case "6":
        router.push("/my-account/settings");
        break;
      case "7":
        if (window.confirm("Are you sure you want to log out?")) {
          logout();
        }
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleMenuClick,
        className:
          "rounded-2xl border border-pink-50 bg-white/95 px-1 py-1 shadow-lg",
      }}
      placement="bottomRight"
      trigger={["click"]}
      overlayStyle={{
        marginTop: "14px",
        minWidth: "220px",
        maxWidth: "260px",
      }}
    >
      <button
        type="button"
        className="flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1.5 text-xs md:text-sm text-gray-700 hover:border-pink-200 hover:bg-pink-50 transition-colors duration-200 ease-linear"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-500 text-[11px] font-semibold text-white">
          {initials || <FaRegUser size={14} />}
        </div>
        <span className="hidden md:inline-block max-w-[120px] truncate">
          {userName}
        </span>
      </button>
    </Dropdown>
  );
};

export default ProfileDropDown;
