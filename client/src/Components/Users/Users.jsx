import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent } from "../../@/components/ui/card";
import { Button } from "../../@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";
import { Icon } from "@iconify/react";
import dummy from "../../assets/dummy.png";
import {
  fetchUsers,
  updateUser,
  deleteUser,
} from "../../features/users/userThunks";
import { Link } from "react-router-dom";

const Users = () => {
  const { users, loading, error } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleMakeAdmin = (user) => {
    dispatch(updateUser({ id: user.id, role: "Admin" }));
  };

  return (
    <div className="flex flex-row flex-wrap gap-5 w-[90vw] md:w-[80vw] mt-10">
      {users?.map((item) => {
        const u = item.dataValues || item;

        return (
          <Card key={u.id} className="w-[42vw] md:w-[30vw] lg:w-[25vw] xl:w-[20vw] p-4 h-[350px] relative">
            {/* 3 dots menu */}
            {user?.role === "Admin" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="absolute top-2 right-2 p-1 rounded-full"
                >
                  <Icon icon="mdi:dots-vertical" className="w-10 h-10" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => handleMakeAdmin(u)}
                  disabled={u.role === "Admin"} // disable if already admin
                >
                  {u.role === "Admin" ? "Already Admin" : "Make Admin"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => dispatch(deleteUser(u.id))}
                  className="text-red-600"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            )}

            <CardContent className="flex flex-col items-center justify-center gap-2">
              <Link to={`/users/${u.id}`}>
                <img
                  src={
                    u.profilePic
                      ? `http://localhost:5000/${u.profilePic.replace(
                          "\\",
                          "/"
                        )}`
                      : dummy
                  }
                  alt={u.fullName}
                  className="rounded-full w-[8vw] cursor-pointer"
                />
              </Link>

              <p className="font-semibold">
                <Link
                  to={`/users/${u.id}`}
                  className="hover:underline text-dark text-xl"
                >
                  {u.fullName}
                </Link>
              </p>
              <p className="font-semibold">{u.role || "No Role"}</p>
              <p className="text-gray-500">{u.email || "No Email"}</p>

              <a
                href={
                  u.cv
                    ? `http://localhost:5000/${u.cv.replace("\\", "/")}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                Download CV
              </a>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Users;
