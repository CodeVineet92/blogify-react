import { createSlice } from "@reduxjs/toolkit";
const savedUser = localStorage.getItem("auth-user")
  ? JSON.parse(localStorage.getItem("auth-user"))
  : null;

const userSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser,
  },
  reducers: {
    addUser: (state, action) => {
      const { id, token } = action.payload;
      state.user = { id, token };
      localStorage.setItem("auth-user", JSON.stringify(state.user));
    },
    removeUser: (state, action) => {
      state.user = null;
      localStorage.removeItem("auth-user");
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
