import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      const { login, email, password } = userData;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: login,
        photoURL: "https://reactjs.org/logo-og.png",
      });

      const { uid, email: userEmail, displayName, photoURL } = user;

      return {
        name: displayName,
        userId: uid,
        email: userEmail,
        photo: photoURL,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkApi) => {
    try {
      const { email, password } = userData;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const {
        uid,
        email: userEmail,
        displayName,
        photoURL,
      } = userCredential.user;

      return {
        name: displayName,
        userId: uid,
        email: userEmail,
        photo: photoURL,
      };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
// const authSignOutUser = () => async (dispatch, getSatte) => {};
