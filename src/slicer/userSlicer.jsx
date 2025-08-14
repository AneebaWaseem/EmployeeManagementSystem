import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-hot-toast'

const loadUsers = () => {
  try {
    const usersFromStorage = localStorage.getItem("users");
    return usersFromStorage ? JSON.parse(usersFromStorage) : [];
  } catch (e) {
    console.warn("Failed to parse users from localStorage:", e);
    localStorage.removeItem("users");
    return [];
  }
};
const initialState = {
  users: loadUsers()
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state, action) => {
      const user = action.payload
      state.users.push(user)
      
      localStorage.setItem("users", JSON.stringify(state.users))
      
      toast("User Added Successfully!")
    },
    update: (state, action) => {
      const user = action.payload
      const ind = state.users.findIndex((item) => item.id == user.id)
      if(ind >= 0) {
        state.users[ind] = user

        localStorage.setItem("users", JSON.stringify(state.users))
      
        toast("User Updated Successfully!")
      }
    },
    remove: (state, action) => {
      const user = action.payload
      const ind = state.users.findIndex((item) => item.id == user.id)
      if(ind >= 0) {
        state.users.splice(ind, 1)

        localStorage.setItem("users", JSON.stringify(state.users))
      
        toast("User Deleted Successfully!")
      }
    },
    // reset: (state) => {
    //   state.notes = []
    //   localStorage.removeItem("notes")
    //   toast("All Notes Cleared!")
    // },
  },
})

export const selectUserByEmail = (state, email) =>
  state.user.users.find((user) => user.email === email);

export const { add, update, remove } = userSlice.actions

export default userSlice.reducer