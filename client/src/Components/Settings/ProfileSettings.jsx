import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser, fetchUserById } from "../../features/users/userThunks";
import { Card, CardContent } from "../../@/components/ui/card";
import { Button } from "../../@/components/ui/button";
import dummy from "../../assets/dummy.png";
import { setUser } from "../../features/auths/authSlice";

const ProfileSettings = () => {
  const dispatch = useDispatch();
  const { selectedUser: user, loading } = useSelector((state) => state.user);
  const authUser = useSelector((state) => state.auth.user);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    profilePic: null,
    cv: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (authUser?.id) {
      dispatch(fetchUserById(authUser.id));
    }
  }, [authUser, dispatch]);

  useEffect(() => {
    if (user) {
      setForm({
        fullName: user.fullName || "",
        email: user.email || "",
        password: "",
        role: user.role || "",
        profilePic: null,
        cv: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    const errs = {};

    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (form.password && form.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }

    if (form.profilePic) {
      const validImgTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validImgTypes.includes(form.profilePic.type)) {
        errs.profilePic = "Only JPG or PNG images allowed.";
      }
      if (form.profilePic.size > 2 * 1024 * 1024) {
        errs.profilePic = "Profile picture must be under 2MB.";
      }
    }

    if (form.cv) {
      const validDocTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validDocTypes.includes(form.cv.type)) {
        errs.cv = "Only PDF, DOC, DOCX files allowed.";
      }
      if (form.cv.size > 5 * 1024 * 1024) {
        errs.cv = "CV must be under 5MB.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    data.append("id", user.id);
    data.append("fullName", form.fullName);
    data.append("email", form.email);
    if (form.password) data.append("password", form.password);
    if (form.role) data.append("role", form.role);
    if (form.profilePic) data.append("profilePic", form.profilePic);
    if (form.cv) data.append("cv", form.cv);

    try {
    const updatedUser = await dispatch(
      updateUser({ id: user.id, formData: data })
    ).unwrap();

    // sync auth.user + localStorage immediately
    dispatch(setUser(updatedUser));

    alert("Profile updated successfully");
  } catch (err) {
    console.error(err);
    alert("Failed to update profile ");
  }

  };

  if (loading || !user) return <p>Loading profile...</p>;

  return (
    <Card className="w-[70vw] mx-auto p-6 mb-3  mt-10">
      <CardContent>
        <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Profile Picture */}
          <div className="flex flex-col items-center gap-2">
            <img
              src={
                user.profilePic
                  ? `http://localhost:5000/${user.profilePic.replace("\\", "/")}`
                  : dummy
              }
              alt={user.fullName}
              className="rounded-full w-32 h-32 object-cover"
            />

            <div className="flex items-center border-2 border-gray-300 rounded-sm p-3 cursor-pointer w-full">
              <input
                type="file"
                id="profilePic"
                name="profilePic"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor="profilePic"
                className="flex justify-between items-center w-full cursor-pointer"
              >
                <span className="text-gray-600">
                  {form.profilePic ? form.profilePic.name : "Choose a profile picture..."}
                </span>
                <span className="bg-gray-400 text-white px-4 py-1 rounded-sm ml-2">
                  Browse
                </span>
              </label>
            </div>
            {errors.profilePic && <p className="text-red-500 text-sm">{errors.profilePic}</p>}
          </div>

          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="border rounded p-2"
          />
          {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded p-2"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="New Password (leave blank to keep old)"
            value={form.password}
            onChange={handleChange}
            className="border rounded p-2"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

          {/* Only Admins can change role */}
          {authUser?.role === "Admin" && (
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border rounded p-2"
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          )}

          {/* CV Upload */}
          <div>
            <label className="block font-semibold mb-1">Upload CV:</label>
            <div className="flex items-center border-2 border-gray-300 rounded-sm p-3 cursor-pointer w-full">
              <input
                type="file"
                id="cv"
                name="cv"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor="cv"
                className="flex justify-between items-center w-full cursor-pointer"
              >
                <span className="text-gray-600">
                  {form.cv ? form.cv.name : "Choose a file..."}
                </span>
                <span className="bg-gray-400 text-white px-4 py-1 rounded-sm ml-2">
                  Browse
                </span>
              </label>
            </div>
            {errors.cv && <p className="text-red-500 text-sm">{errors.cv}</p>}

            {user.cv && (
              <a
                href={`http://localhost:5000/${user.cv.replace("\\", "/")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline block mt-1"
              >
                Current CV
              </a>
            )}
          </div>

          <Button type="submit" className="mt-4 w-fit">
            Save Changes
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
