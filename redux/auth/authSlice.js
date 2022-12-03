import { createSlice } from "@reduxjs/toolkit";
import {
  addToStore,
  // loginUser,
  // logoutUser,
  // currentUser,
} from "./authOperations";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    id: "",
    name: "",
    email: "",
    photo: "",
    isAuth: false,
    isLoading: false,
    error: "",
  },
  reducers: {
    changeError(state) {
      state.error = null;
    },
    // changePhoto(state, { payload }) {
    //   state.photo = payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(registerUser.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(registerUser.fulfilled, (state, { payload }) => {
      //   // const { userId, name, email, photo } = payload;
      //   // state.id = userId;
      //   // state.name = name;
      //   // state.email = email;
      //   // state.photo = photo;
      //   // state.isAuth = true;
      //   state.isLoading = false;
      // })
      // .addCase(registerUser.rejected, (state, { payload }) => {
      //   state.error = payload;
      //   state.isLoading = false;
      // })
      .addCase(addToStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToStore.fulfilled, (state, { payload }) => {
        const { userId, name, email, photo } = payload;
        state.id = userId;
        state.name = name;
        state.email = email;
        state.photo = photo;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(addToStore.rejected, (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      });
    // .addCase(loginUser.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(loginUser.fulfilled, (state, { payload }) => {
    //   const { userId, name, email, photo } = payload;
    //   state.id = userId;
    //   state.name = name;
    //   state.email = email;
    //   state.photo = photo;
    //   state.isAuth = true;
    //   state.isLoading = false;
    // })
    // .addCase(loginUser.rejected, (state, { payload }) => {
    //   state.error = payload;
    //   state.isLoading = false;
    // })
    // .addCase(logoutUser.fulfilled, (state) => {
    //   state.id = "";
    //   state.name = "";
    //   state.email = "";
    //   state.photo = "";
    //   state.isAuth = false;
    // })
    // .addCase(currentUser.fulfilled, (state, { payload }) => {
    //   const { userId, name, email, photo, isAuth } = payload;
    //   state.id = userId;
    //   state.name = name;
    //   state.email = email;
    //   state.photo = photo;
    //   state.isAuth = isAuth;
    // });
  },
});

export const { changeError } = authSlice.actions;
export default authSlice.reducer;
