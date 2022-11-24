import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

const Home = () => {
  return (
    <View style={s.container}>
      <ImageBackground
        style={s.image}
        source={require("../assets/images/bg-image.jpg")}
      ></ImageBackground>
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

export default Home;
