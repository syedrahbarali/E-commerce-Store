import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: false,
    userData: [],
  },
  reducers: {
    login: (state, actions) => {
      state.status = true;
      state.userData = actions.payload.userData;
      return state;
    },

    logout: (state) => {
      state.status = false;
      state.userData = [];
      return state;
    },
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;
