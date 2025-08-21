import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all users
export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const res = await axios.get("http://localhost:5000/api/users");
  console.log("Fetched Users:", res.data); // debug
  return res.data; // backend ka JSON array
});

// Update user
export const updateUser = createAsyncThunk("user/updateUser", async (user) => {
  const res = await axios.put(`http://localhost:5000/api/users/${user.id}`, user);
  return res.data.user; 
});

// Delete user
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  await axios.delete(`http://localhost:5000/api/users/${id}`);
  return id;
});
