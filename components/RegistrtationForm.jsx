// import * as Font from "expo-font";
// import { AppLoading } from "expo";

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

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const initialState = {
  login: "",
  email: "",
  password: "",
};

// const loadFonts = async () => {
//   await Font.loadAsync({
//       'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
//       'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
//   });
// };

const RegistrationForm = () => {
  const [state, setstate] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [isReady, setIsReady] = useState(false);
  const [dimensions, setdimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();

    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;

      setdimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    // return () => {
    //   Dimensions.remove("change", onChange);
    // };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const onRegistration = () => {
    Alert.alert(
      "Credentials",
      `${state.login} + ${state.email} + ${state.password}`
    );
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    console.log(state);
    setstate(initialState);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  //   if (!isReady) {
  //     return <AppLoading startAsync={loadFonts} onFinish={() => setIsReady(true)}/>
  // }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={s.container} onLayout={onLayoutRootView}>
          <Image
            source={{ uri: "https://reactjs.org/logo-og.png" }}
            style={s.avatar}
          />
          <Text style={s.title}>Регистрация</Text>
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
              placeholder="Логин"
              style={s.input}
              onFocus={() => setIsShowKeyboard(true)}
            />
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
              onPress={onRegistration}
            >
              <Text style={s.btnTitle}>Зарегистрироваться</Text>
            </TouchableOpacity>

            <View
              style={{
                ...s.loginView,
                marginBottom: isShowKeyboard ? 10 : 78,
                width: dimensions,
              }}
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
          </View>
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
