import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const AuthStack = createStackNavigator();

import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
import Home from "./Screens/Home";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <AuthStack.Screen name="LoginScreen" component={LoginScreen}/>
        <AuthStack.Screen name="Home" component={Home} />
      </AuthStack.Navigator>
    );
  }
  // return <Home isAuth={isAuth} />;
};
