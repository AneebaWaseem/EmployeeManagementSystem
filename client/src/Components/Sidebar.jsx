import React from "react";
import { Card, CardContent, CardHeader } from "../@/components/ui/card";
import dummy from "../assets/dummy.png";
import { Icon } from "@iconify/react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../features/auths/authSlice";

const Sidebar = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fallback profile picture
  const profilePic = user?.profilePic
    ? `http://localhost:5000/${user.profilePic.replace("\\", "/")}`
    : dummy;

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (loading || !user) return <p>Loading current user...</p>;

  return (
    <Card className="w-[25vw] lg:[20vw] xl:w-[15vw] h-[80vh] hidden md:flex flex-col justify-around mt-10">
      {/* User Info */}
      <div>
        <CardHeader className="flex flex-col justify-center items-center border-b-2 border-gray-300 pb-2">
          <Link to={`/settings`} className="flex flex-col items-center">
            <img
              src={profilePic}
              alt={user?.fullName || "User"}
              className="rounded-full w-[8vw] cursor-pointer hover:opacity-80 transition"
            />
            <p className="mt-2 font-semibold hover:underline cursor-pointer">
              {user?.fullName || "Guest User"}
            </p>
          </Link>
          <p className="text-base">{user?.role || "No role"}</p>
          <p className="text-sm text-gray-600">{user?.email || "No email"}</p>
        </CardHeader>

        {/* Sidebar Links */}
        <CardContent>
          <Link
            to="/users"
            className="flex items-center gap-3 border-b-2 border-gray-200 py-2 hover:bg-gray-100 rounded-md px-2 transition"
          >
            <Icon icon="mdi:account-group" className="w-5 h-5" />
            Users
          </Link>
          <Link
            to="/tasks"
            className="flex items-center gap-3 border-b-2 border-gray-200 py-2 hover:bg-gray-100 rounded-md px-2 transition"
          >
            <Icon icon="mdi:check-circle-outline" className="w-5 h-5" />
            Tasks
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 border-b-2 border-gray-200 py-2 hover:bg-gray-100 rounded-md px-2 transition"
          >
            <Icon icon="mdi:cog-outline" className="w-5 h-5" />
            Settings
          </Link>
        </CardContent>
      </div>

      {/* Logout Button at bottom */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 text-red-500 hover:text-red-400 border-t-2 border-gray-200 py-3 px-4 transition w-full justify-start"
      >
        <Icon icon="mdi:logout" className="w-5 h-5" />
        Logout
      </button>
    </Card>
  );
};

export default Sidebar;
