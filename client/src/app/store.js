import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auths/authSlice";
import userReducer from "../features/users/userSlice";
import taskReducer from "../features/tasks/taskSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tasks: taskReducer,
  },
});

export default store;
