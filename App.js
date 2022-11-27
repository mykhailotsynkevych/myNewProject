import React, { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const routing = useRoute(false);

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

  return <NavigationContainer>{routing}</NavigationContainer>;
}
