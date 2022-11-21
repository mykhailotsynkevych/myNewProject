import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
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
  Button,
  TouchableOpacity,
  Image,
} from "react-native";

const RegistrationForm = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onRegistration = () => {
    Alert.alert("Credentials", `${login} + ${email} + ${password}`);
    setIsShowKeyboard(false);
    Keyboard.dismiss();
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
          <Image
            source={{ uri: "https://reactjs.org/logo-og.png" }}
            style={s.avatar}
          />
          <Text style={s.text}>Регистрация</Text>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <TextInput
              value={login}
              onChangeText={loginHandler}
              placeholder="Логин"
              style={s.input}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              value={email}
              onChangeText={emailHandler}
              placeholder="Адрес электронной почты"
              style={s.input}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              value={password}
              onChangeText={passwordHandler}
              placeholder="Пароль"
              secureTextEntry={true}
              style={s.input}
              onFocus={() => setIsShowKeyboard(true)}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={s.button}
              onPress={onRegistration}
            >
              <Text style={s.btnTitle}>Зарегистрироваться</Text>
            </TouchableOpacity>

            <View
              style={{ ...s.loginView, marginBottom: isShowKeyboard ? 10 : 78 }}
            >
              <Text style={s.loginText}>
                Уже есть аккаунт?
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={s.loginButton}
                  onPress={onRegistration}
                >
                  <Text style={s.loginButton}>Войти</Text>
                </TouchableOpacity>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const s = StyleSheet.create({
  container: {
    borderTopStartRadius: 50,
    borderTopEndRadius: 50,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    marginBottom: 32,
    marginTop: -60,
  },
  text: {
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 32,
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    width: 343,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    color: "#BDBDBD",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FF6C00",
    color: "#fff",
    borderRadius: 100,
    marginTop: 43,
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    // marginBottom: 78,
  },
  loginText: {
    fontSize: 18,
  },
  loginButton: {
    color: "#1B4371",
    fontSize: 18,
    marginLeft: 5,
  },
});

export default RegistrationForm;
