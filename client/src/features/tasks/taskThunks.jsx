import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("token");

// Fetch all tasks assigned to current user
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async () => {
    const token = getToken();
    const res = await axios.get("http://localhost:5000/api/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched tasks: ", res.data);
    return res.data;
  }
);

// Create new task (only admin)
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task) => {
    const token = getToken();
    const res = await axios.post("http://localhost:5000/api/tasks", task, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  }
);

// Update task 
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, ...updates }) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      updates,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  }
);

// Fetch tasks NOT assigned to admin
export const fetchOtherTasks = createAsyncThunk(
  "tasks/fetchOtherTasks",
  async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/tasks/others", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Fetched other tasks: ", res.data);
    return res.data;
  }
);

