// import React from "react";
// import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

// import PostsScreen from "./mainScreen/PostsScreen";
// import CreatePostsScreen from "./mainScreen/CreatePostsScreen";
// import ProfileScreen from "./mainScreen/ProfileScreen";

// const Tab = createBottomTabNavigator();

// const Home = ({ navigation }) => {

//     const toLoginScreen = () => {
//     navigation.navigate("LoginScreen");
//   };

//   return (
//     <Tab.Navigator
//       initialRouteName="Публикации"
//       screenOptions={{
//         tabBarActiveTintColor: "#FF6C00",
//         tabBarShowLabel: false,
//         headerRight: () => (
//           <TouchableOpacity activeOpacity={0.8} onPress={toLoginScreen}>
//             <MaterialIcons
//               name="logout"
//               size={28}
//               color="#BDBDBD"
//               style={{ paddingRight: 10 }}
//             />
//           </TouchableOpacity>
//         ),
//       }}
//     >
//       <Tab.Screen
//         name="Публикации"
//         component={PostsScreen}
//         options={{
//           tabBarLabel: "Posts",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="grid-view" size={30} color={color} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Создать публикацию"
//         component={CreatePostsScreen}
//         options={{
//           tabBarLabel: "Create",
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="add-sharp" size={36} color={color} />
//           ),
//           // tabBarBadge: 3,
//         }}
//       />
//       <Tab.Screen
//         name="Профиль"
//         component={ProfileScreen}
//         options={{
//           tabBarLabel: "Profile",
//           tabBarIcon: ({ color, size }) => (
//             <Feather name="user" size={28} color={color} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// const s = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "black",
//   },
// });

// export default Home;
