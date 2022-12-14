import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";

import { registerUser } from "../redux/auth/authOperations";
import { useDispatch, useSelector } from "react-redux";
import { getAuthError } from "../redux/auth/authSelectors";
import { changeError } from "../redux/auth/authSlice";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationForm = ({ navigation }) => {
  const [state, setstate] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const error = useSelector(getAuthError);
  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;

      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!error) return;
    alert(error);
    console.log(error);
  }, [error]);

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    dispatch(registerUser(state));
    setstate(initialState);
  };

  const toLoginScreen = () => {
        if (error) {
      dispatch(changeError());
    }

    setIsShowKeyboard(false);
    Keyboard.dismiss();

    setstate(initialState);
    navigation.navigate("LoginScreen");
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={s.container}>
          <View style={s.avatarContainer}>
            <EvilIcons
              name="plus"
              size={38}
              color="#FF6C00"
              style={s.avatarPlusIcon}
            />
          </View>
          <Text style={s.title}>??????????????????????</Text>
          <View
            style={{
              ...s.form,
              marginBottom: isShowKeyboard ? 10 : 78,
              width: dimensions,
            }}
          >
            <TextInput
              value={state.login}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, login: value }))
              }
              placeholder="??????????"
              style={s.input}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              value={state.email}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, email: value }))
              }
              placeholder="?????????? ?????????????????????? ??????????"
              style={s.input}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              value={state.password}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, password: value }))
              }
              placeholder="????????????"
              secureTextEntry={true}
              style={s.input}
              onFocus={() => setIsShowKeyboard(true)}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={s.button}
              onPress={handleSubmit}
            >
              <Text style={s.btnTitle}>????????????????????????????????????</Text>
            </TouchableOpacity>

            <View
              style={{
                ...s.loginView,
                marginBottom: isShowKeyboard ? 10 : 78,
                width: dimensions,
              }}
            >
              <Text style={s.loginText}>
                ?????? ???????? ???????????????
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={s.loginButton}
                  onPress={toLoginScreen}
                >
                  <Text style={s.loginButton}>??????????</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const s = StyleSheet.create({
  container: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 32,
    marginTop: -60,
    backgroundColor: "#F6F6F6",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 32,
    marginTop: -60,
  },
  avatarPlusIcon: {
    marginBottom: 12,
    marginRight: -18,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 32,
  },
  form: {
    justifyContent: "center",
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    color: "#BDBDBD",
  },
  button: {
    backgroundColor: "#FF6C00",
    color: "#fff",
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    color: "#f0f8ff",
    fontSize: 18,
  },
  loginView: {
    alignItems: "center",
  },
  loginText: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    color: "#1B4371",
  },
  loginButton: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 18,
    marginLeft: 5,
  },
});

export default RegistrationForm;
