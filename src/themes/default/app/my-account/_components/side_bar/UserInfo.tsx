"use client";
import Man_Avatar from "../../../../../../../public/images/avatar/man.png";
import Image, { StaticImageData } from "next/image";
import { useState, useEffect, useCallback } from "react";
import { RiImageEditLine } from "react-icons/ri";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { getApiUrl, getApiHeaders } from "@/lib/api-config";

const UserInfo = () => {
  const { userSession } = useAuth();
  const [avatar, setAvatar] = useState<StaticImageData | string>(Man_Avatar);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axios.get(getApiUrl("/users/me"), {
        headers: getApiHeaders(userSession?.accessToken),
      });
      const userData = response.data.data;
      setUserName(userData.name || "");
      setUserEmail(userData.email || "");
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Fallback to session data
      if (userSession?.name) setUserName(userSession.name);
      if (userSession?.email) setUserEmail(userSession.email);
    }
  }, [userSession?.accessToken, userSession?.name, userSession?.email]);

  useEffect(() => {
    if (userSession?.accessToken) {
      fetchUserProfile();
    } else if (userSession?.name && userSession?.email) {
      setUserName(userSession.name);
      setUserEmail(userSession.email);
    }
  }, [userSession, fetchUserProfile]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
      // TODO: Upload avatar to backend when endpoint is available
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="relative w-12 h-12">
        <label className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={avatar}
              className="rounded-full object-cover"
              alt="User Avatar"
              width={48}
              height={48}
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
              <RiImageEditLine className="w-5 h-5 text-white" />
            </div>
          </div>
        </label>
      </div>
      <div>
        <h3 className="font-medium">{userName || "User"}</h3>
        <p className="text-sm line-clamp-1 text-gray-700">
          {userEmail || "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
