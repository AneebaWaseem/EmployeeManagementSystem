import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("token");

// Fetch all users (any authenticated user)
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const token = getToken();
  const res = await axios.get("http://localhost:5000/api/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("Fetched Users:", res.data);
  return res.data; // backend JSON array
});

// Update user (authenticated)
export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  const token = getToken();
  const res = await axios.put(
    `http://localhost:5000/api/users/${user.id}`,
    user,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data.user;
});

// Delete user (admin only)
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  const token = getToken();
  await axios.delete(`http://localhost:5000/api/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return id;
});
