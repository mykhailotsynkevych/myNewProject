import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

import RegistrationForm from "../components/RegistrtationForm";

const RegistrationScreen = () => {
  return (
    <View style={s.container}>
      <ImageBackground
        style={s.image}
        source={require("../assets/images/bg-image.jpg")}
      >
        
      <RegistrationForm />
      </ImageBackground>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
        
  },
  image: {
    flex: 1,
    resizeMode: "cover",
justifyContent: "flex-end",
  },
});

export default RegistrationScreen;
