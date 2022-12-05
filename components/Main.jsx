import React, { useState, useEffect } from "react";
// import { useRoute } from "../router";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { currentUser, logoutUser } from "../redux/auth/authOperations";
import { getIsAuth } from "../redux/auth/authSelectors";

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

import RegistrationScreen from "../Screens/auth/RegistrationScreen";
import LoginScreen from "../Screens/auth/LoginScreen";
import PostsScreen from "../Screens/mainScreen/PostsScreen";
import CreatePostsScreen from "../Screens/mainScreen/CreatePostsScreen";
import ProfileScreen from "../Screens/mainScreen/ProfileScreen";

const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
  const isAuth = useSelector(getIsAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentUser());
  }, []);

  return (
    <NavigationContainer>
      {isAuth ? (
        <Tab.Navigator
          initialRouteName="Публикации"
          screenOptions={{
            tabBarActiveTintColor: "#FF6C00",
            tabBarShowLabel: false,
            headerRight: () => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => dispatch(logoutUser())}
              >
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
      ) : (
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
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Main;
