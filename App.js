import { View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen name="RegistrationScreen" component={RegistrationScreen} />
        <MainStack.Screen name="LoginScreen" component={LoginScreen} />
                <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20,
            },
            headerRight: () => (
              <Button
                onPress={() => alert("This is a button!")}
                title="Press me"
                color="#fff"
              />
            ),
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
