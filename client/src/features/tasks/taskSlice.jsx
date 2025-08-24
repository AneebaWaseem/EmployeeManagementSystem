import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks, createTask, updateTask, fetchOtherTasks } from "./taskThunks";

const taskSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [], otherTasks: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      // Fetch assigned tasks
      .addCase(fetchTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch other tasks
      .addCase(fetchOtherTasks.pending, (state) => { state.loading = true; })
      .addCase(fetchOtherTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.otherTasks = action.payload;
      })
      .addCase(fetchOtherTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create task
      .addCase(createTask.fulfilled, (state, action) => { state.tasks.push(action.payload); })

      // Update task
      .addCase(updateTask.fulfilled, (state, action) => {
        const idx = state.tasks.findIndex(t => t.id === action.payload.id);
        if (idx !== -1) state.tasks[idx] = action.payload;

        // Also update in otherTasks if exists there
        const otherIdx = state.otherTasks.findIndex(t => t.id === action.payload.id);
        if (otherIdx !== -1) state.otherTasks[otherIdx] = action.payload;
      });
  },
});

export default taskSlice.reducer;
