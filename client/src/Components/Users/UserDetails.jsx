import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import dummy from "../../assets/dummy.png";
import { Card, CardContent } from "../../@/components/ui/card";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${id}`);
        setUser(res.data);
      } catch (err) {
        setError("User not found");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return null;

  return (
    <Card key={user.id} className="w-[80vw] p-4">
      <CardContent className="flex flex-col items-center justify-center gap-2">
        <img
          src={
            user.profilePic
              ? `http://localhost:5000/${user.profilePic.replace("\\", "/")}`
              : dummy
          }
          alt={user.fullName}
          className="rounded-full w-40"
        />
        <h2 className="text-2xl font-bold mt-4">{user.fullName}</h2>
        <p className="font-semibold">{user.role}</p>
        <p className="text-gray-500">{user.email}</p>
        {user.cv && (
          <a
            href={`http://localhost:5000/${user.cv.replace("\\", "/")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline mt-2"
          >
            Download CV
          </a>
        )}
      </CardContent>
    </Card>
  );
};

export default UserDetails;
