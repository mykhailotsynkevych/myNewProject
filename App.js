import { Provider } from "react-redux";
import { store } from "./redux/store";
import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import Main from "./components/Main";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  // const [user, setUser] = useState(null);
  // auth.onAuthStateChanged((user) => setUser(user));


  // console.log(user)

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      setIsReady(true);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  if (!isReady) {
    return <View onLayout={onLayoutRootView}></View>;
  }

  return (
    <Provider store={store}>
        <Main />
    </Provider>
  );
}
