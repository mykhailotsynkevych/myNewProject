import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkApi) => {
    try {
      console.log("start");

      const { login, email, password } = userData;

      console.log("email, password", email, password);

      await createUserWithEmailAndPassword(auth, email, password);

      console.log("finish");
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
