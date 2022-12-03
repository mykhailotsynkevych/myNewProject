import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const registerUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("error.message from registerUser", error.message);
    }
  };

export const addLogin = (login) => async (dispatch, getState) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: login,
      photoURL: "https://reactjs.org/logo-og.png",
    });
  } catch (error) {
    console.log("error.message from addLogin", error.message);
  }
};

export const addToStore = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      // console.log(userData)
      const user = auth.currentUser;
      console.log("addToStore User", user);
      return {
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

// export const authSignInUser =
//   ({ email, password }) =>
//   async (dispatch, getState) => {
//     try {
//       const user = await signInWithEmailAndPassword(auth, email, password);
//       console.log("login", user);
//     } catch (error) {
//       throw error;
//     }
//   };
// const authSignOutUser = () => async (dispatch, getSatte) => {};
