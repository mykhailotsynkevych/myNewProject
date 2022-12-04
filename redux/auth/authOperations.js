import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

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
