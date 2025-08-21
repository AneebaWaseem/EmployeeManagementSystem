import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auths/authThunks";

const LoginForm = ({ setFormType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // redux state
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/users"); // login success → redirect
      }
    });
  };

  return (
    <div className="flex flex-col justify-evenly w-[25vw] h-[70vh] px-6">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => setFormType(null)}
        className="text-gray-500 mr-auto"
      >
        ← Back to Getting Started
      </button>

      <h2 className="text-xl font-bold text-center">Login Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="h-[40vh]">
          {/* Email */}
          <label className="block mb-2 mt-3">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-gray-400 border-2 p-2 w-full rounded mb-1"
            placeholder="Email"
            required
          />

          {/* Password */}
          <div className="relative w-full mb-4">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border-gray-400 border-2 p-2 w-full rounded mb-1 pr-10"
              placeholder="Password"
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-600"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Icon icon="mdi:eye-off" width="22" />
              ) : (
                <Icon icon="mdi:eye" width="22" />
              )}
            </span>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded ml-auto disabled:bg-blue-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
