import React from "react";
import { Card, CardContent, CardHeader } from "../@/components/ui/card";
import dummy from "../assets/dummy.png";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);

  // Fallback profile picture
  const profilePic = user?.profilePic
    ? `http://localhost:5000/${user.profilePic.replace("\\", "/")}`
    : dummy;

  return (
    <Card className="w-[15vw] h-[80vh]">
      <CardHeader className="flex flex-col justify-center items-center border-b-2 border-gray-300 pb-2">
        <img
          src={profilePic}
          alt={user?.fullName || "User"}
          className="rounded-full w-[8vw]"
        />
        <p>{user?.fullName || "Guest User"}</p>
        <p>{user?.role || "No role"}</p>
        <p>{user?.email || "No email"}</p>
      </CardHeader>
      <CardContent>
        <p className="flex items-center gap-3 border-b-2 border-gray-200 py-2">
          <Icon icon="mdi:check-circle-outline" className="w-5 h-5" /> Tasks
        </p>

        <p className="flex items-center gap-3 border-b-2 border-gray-200 py-2">
          <Icon icon="mdi:cog-outline" className="w-5 h-5" /> Settings
        </p>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
