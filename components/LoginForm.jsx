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
  Dimensions,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = ({ navigation }) => {
  const [state, setstate] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;

      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    // return () => {
    //   Dimensions.remove("change", onChange);
    // };
  }, []);

  const onHome = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    console.log(state);
    setstate(initialState);
    navigation.navigate("Home");
  };

  const toRegistrationScreen = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    console.log(state);
    setstate(initialState);
    navigation.navigate("RegistrationScreen");
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
          <Text style={s.title}>Войти</Text>
          <View
            style={{
              ...s.form,
              marginBottom: isShowKeyboard ? 10 : 144,
              width: dimensions,
            }}
          >
            <TextInput
              value={state.email}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, email: value }))
              }
              placeholder="Адрес электронной почты"
              style={s.input}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              value={state.password}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, password: value }))
              }
              placeholder="Пароль"
              secureTextEntry={true}
              style={s.input}
              onFocus={() => setIsShowKeyboard(true)}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={s.button}
              onPress={onHome}
            >
              <Text style={s.btnTitle}>Войти</Text>
            </TouchableOpacity>

            <View style={s.loginView}>
              <Text style={s.loginText}>
                Нет аккаунта?
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={s.loginButton}
                  onPress={toRegistrationScreen}
                >
                  <Text style={s.loginButton}>Зарегистрироваться</Text>
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
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 32,
    marginTop: 32,
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

export default LoginForm;
