import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("userInfo")),
    loading: false,
    error: false,
    success: false,
  },
  reducers: {
    userRequest(state) {
      state.loading = true;
      state.deleteSuccess = false;
    },
    userSuccess(state, action) {
      state.loading = false;
      state.success = true;

      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    userFail(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    userReset(state) {
      state.success = false;
      state.error = false;
      state.loading = false;
    },
    userLogout(state) {
      localStorage.removeItem("userInfo");
      state.userInfo = null;
    },
  },
});

export const userActions = UserSlice.actions;
export default UserSlice.reducer;
