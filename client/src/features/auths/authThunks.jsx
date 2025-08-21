import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
