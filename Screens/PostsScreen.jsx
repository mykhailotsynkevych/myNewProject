import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

const PostsScreen = ({ route }) => {
console.log("route.params", route.params);
  return (
    <View style={s.container}>
      <Text>Публикации</Text>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PostsScreen;