import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

const RegistrationForm = () => {
  return (
    <View style={s.container}>
      <Text style={s.text}>Регистрация</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    width: 375,
    height: 550,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "Roboto",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginLeft: 130,
    marginRight: 70,
  },
});

export default RegistrationForm;
