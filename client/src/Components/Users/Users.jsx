import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardContent } from "../../@/components/ui/card";
import dummy from "../../assets/dummy.png";
import {
  fetchUsers,
  updateUser,
  deleteUser,
} from "../../features/users/userThunks";
import { Link } from "react-router-dom";

const Users = () => {
  const { users, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-row flex-wrap gap-5 w-[80vw]">
      {users?.map((item) => {
        // Extract dataValues safely
        const user = item.dataValues || item;

        return (
          <Card key={user.id} className="w-[20vw] p-4 h-[350px]">
            <CardContent className="flex flex-col items-center justify-center gap-2">
              <Link to={`/users/${user.id}`}>
                <img
                  src={
                    user.profilePic
                      ? `http://localhost:5000/${user.profilePic.replace(
                          "\\",
                          "/"
                        )}`
                      : dummy
                  }
                  alt={user.fullName}
                  className="rounded-full w-[8vw] cursor-pointer"
                />
              </Link>

              <p className="font-semibold">
                <Link
                  to={`/users/${user.id}`}
                  className="hover:underline text-dark text-xl"
                >
                  {user.fullName}
                </Link>
              </p>
              <p className="font-semibold">{user.role || "No Role"}</p>
              <p className="text-gray-500">{user.email || "No Email"}</p>

              <a
                href={
                  user.cv
                    ? `http://localhost:5000/${user.cv.replace("\\", "/")}`
                    : "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
              >
                Download CV
              </a>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() =>
                    dispatch(
                      updateUser({
                        ...user,
                        fullName: user.fullName,
                      })
                    )
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => dispatch(deleteUser(user.id))}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Users;
