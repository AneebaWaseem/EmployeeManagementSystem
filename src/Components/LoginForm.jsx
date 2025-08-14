import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { selectUserByEmail } from "../slicer/userSlicer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ setFormType }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const user = useSelector((state) => selectUserByEmail(state, formData.email));
  const validate = () => {
    let newErrors = {};

    // email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // password
    if (!formData.password.trim()) newErrors.password = "Password is required";

    // password validate
    if (formData.email && !user) {
      newErrors.email = "Invalid email";
    } else if (user && user.password !== formData.password) {
      newErrors.password = "Invalid password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted!", formData);
      navigate("/users");
    }
  };

  return (
    <div className=" flex flex-col justify-evenly w-[25vw] h-[70vh] px-6">
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
          <label className="block mb-2 mt-3">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-gray-400 border-2 p-2 w-full rounded mb-1"
            placeholder="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

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
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
