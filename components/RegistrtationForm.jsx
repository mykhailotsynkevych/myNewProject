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
} from "react-native";

const RegistrationForm = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (text) => setLogin(text);
  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onRegistration = () => {
    Alert.alert("Credentials", `${login} + ${email} + ${password}`);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={s.container}>
        <Text style={s.text}>Регистрация</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <TextInput
            value={login}
            onChangeText={loginHandler}
            placeholder="Логин"
            style={s.input}
          />
          <TextInput
            value={email}
            onChangeText={emailHandler}
            placeholder="Адрес электронной почты"
            style={s.input}
          />
          <TextInput
            value={password}
            onChangeText={passwordHandler}
            placeholder="Пароль"
            secureTextEntry={true}
            style={s.input}
          />
          <View style={s.button}>
            <Button title={"Зарегистрироваться"} onPress={onRegistration} />
          </View>

          <Text style={s.bala}>
            Уже есть аккаунт?
            <Button title={"Войти"} onPress={onRegistration} />
          </Text>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const s = StyleSheet.create({
  container: {
    width: 375,
    height: 550,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginLeft: 130,
    marginRight: 70,
    marginBottom: 32,
  },
  input: {
    fontSize: 16,
    width: 343,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 16,
    marginLeft: 34,
    marginRight: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    color: "#BDBDBD",
  },
  button: {
    backgroundColor: "#FF6C00",
    color: "#fff",
    borderRadius: 100,
    width: 343,
    marginTop: 43,
    marginLeft: 34,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 32,
    paddingRight: 32,
  },
});

export default RegistrationForm;
