// loginSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwtUserToken: null,
  orderList: null,
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const {
        data: { jwtToken },
      } = action.payload;
      state.loading = false;
      state.jwtUserToken = jwtToken;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.jwtUserToken = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  loginSlice.actions;
export default loginSlice.reducer;
