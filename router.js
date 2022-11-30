import React, { useState } from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";


import RegistrationScreen from "./Screens/auth/RegistrationScreen";
import LoginScreen from "./Screens/auth/LoginScreen";
// import MapScreen from "./Screens/MapScreen";

import PostsScreen from "./Screens/mainScreen/PostsScreen";
import CreatePostsScreen from "./Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "./Screens/mainScreen/ProfileScreen";

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const useRoute = () => {
  const [isAuth, setIsAuth] = useState(true);
  const toLoginScreen = () => {
    setIsAuth(false);
    // isAuth=false
  };

  if (!isAuth) {
    return (
      <AuthStack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <AuthStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
        {/* <AuthStack.Screen name="MapScreen" component={MapScreen} /> */}
      </AuthStack.Navigator>
    );
  }
  return (
    <Tab.Navigator
      initialRouteName="Публикации"
      screenOptions={{
        tabBarActiveTintColor: "#FF6C00",
        tabBarShowLabel: false,
        headerRight: () => (
          <TouchableOpacity activeOpacity={0.8} onPress={toLoginScreen}>
            <MaterialIcons
              name="logout"
              size={28}
              color="#BDBDBD"
              style={{ paddingRight: 10 }}
            />
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name="Публикации"
        component={PostsScreen}
        options={{
          tabBarLabel: "Posts",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="grid-view" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Создать публикацию"
        component={CreatePostsScreen}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-sharp" size={36} color={color} />
          ),
          // tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Профиль"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
