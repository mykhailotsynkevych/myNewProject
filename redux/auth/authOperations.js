import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

// {"email": "test@mail.com", "login": "test", "password": "qwerty"}
// {"email": "tes@mail.ua", "login": "tes", "password": "qwertyu"}

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));

      console.log("user", user);
      console.log("user.uid", user.uid);

      await updateProfile(user, {
        displayName: login,
        // photoURL: photo,
      });
    } catch (error) {
      throw error;
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("login", user);
    } catch (error) {
      throw error;
    }
  };
const authSignOutUser = () => async (dispatch, getSatte) => {};
