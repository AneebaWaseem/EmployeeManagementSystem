import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/auths/authThunks"; 
import { useNavigate } from "react-router-dom";

export default function JoinForm({ type, setFormType }) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: null,
    cv: null,
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // input handler
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // validation
  const validateStep = () => {
    let newErrors = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
    }
    if (step === 2) {
      if (!formData.password.trim()) newErrors.password = "Password is required";
      else if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters";
      if (formData.confirmPassword !== formData.password)
        newErrors.confirmPassword = "Passwords do not match";
    }
    if (step === 3) {
      if (!formData.profilePic) newErrors.profilePic = "Profile pic required";
      if (!formData.cv) newErrors.cv = "CV is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("role", type);
      data.append("password", formData.password);
      if (formData.profilePic) data.append("profilePic", formData.profilePic);
      if (formData.cv) data.append("cv", formData.cv);

      dispatch(registerUser(data))
        .unwrap()
        .then(() => {
          console.log("Form submitted!", formData);
          navigate("/users");
        })
        .catch((err) => console.error("Registration error:", err));
    }
  };

  return (
    <div className="flex flex-col justify-evenly w-[75vw] md:w-[40vw] lg:w-[28vw] h-[70vh] px-2 md:px-6">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => setFormType(null)}
        className="text-gray-500 mr-auto"
      >
        ← Back to Getting Started
      </button>

      <h2 className="text-xl font-bold text-center">
        {type === "engineer"
          ? "Software Engineer Sign Up Form"
          : "Internee Sign Up Form"}
      </h2>

      {/* Steps */}
      <div className="flex flex-row my-5 items-center justify-center">
        {[1, 2, 3].map((s, index) => (
          <div key={index} className="flex flex-row items-center justify-center">
            {index !== 0 && (
              <div className="border-b-3 border-gray-300 h-0 w-[5vw]"></div>
            )}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
              ${s <= step ? "bg-blue-500" : "bg-gray-400"}`}
            >
              {s}
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="h-[40vh]">
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="border-gray-400 border-2 p-2 w-full rounded mb-1"
              placeholder="Full Name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}

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

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const valid = validateStep();
                  if (valid) {
                    setStep(2);
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="h-[40vh]">
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

            {/* Confirm Password */}
            <div className="relative w-full mb-4">
              <label>Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border-gray-400 border-2 p-2 w-full rounded mb-1 pr-10"
                placeholder="Confirm Password"
              />
              <span
                className="absolute right-3 top-9 cursor-pointer text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <Icon icon="mdi:eye-off" width="22" />
                ) : (
                  <Icon icon="mdi:eye" width="22" />
                )}
              </span>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setStep(1);
                }}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Back
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const valid = validateStep();
                  if (valid) {
                    setStep(3);
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="h-[40vh]">
            <label className="block mb-2">Profile Picture</label>
            <div className="flex items-center border-2 border-gray-300 rounded-sm p-3 cursor-pointer w-full mb-2">
              <input
                type="file"
                name="profilePic"
                accept="image/*"
                id="profilePic"
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor="profilePic"
                className="flex justify-between items-center w-full cursor-pointer"
              >
                <span className="text-gray-600">
                  {formData.profilePic
                    ? formData.profilePic.name
                    : "Choose a file..."}
                </span>
                <span className="bg-gray-400 text-white px-4 py-1 rounded-sm ml-2">
                  Browse
                </span>
              </label>
            </div>
            {errors.profilePic && (
              <p className="text-red-500 text-sm">{errors.profilePic}</p>
            )}

            <label className="block mb-2">Upload CV</label>
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
                  {formData.cv ? formData.cv.name : "Choose a file..."}
                </span>
                <span className="bg-gray-400 text-white px-4 py-1 rounded-sm ml-2">
                  Browse
                </span>
              </label>
            </div>
            {errors.cv && <p className="text-red-500 text-sm">{errors.cv}</p>}

            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Back
              </button>

              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded ml-auto"
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
