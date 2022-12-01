import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CommentsScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: route.params }} style={styles.photo} />
      <View>
        <TextInput
          placeholder="Комментировать..."
          style={styles.inputComments}
        />

        <TouchableOpacity activeOpacity={0.8} style={styles.btnComments}>
          <AntDesign
            name="arrowup"
            size={32}
            color="#fff"
            style={styles.arrowup}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
    justifyContent: "space-between",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  photo: {
    width: 380,
    height: 240,
    alignSelf: "center",
    borderRadius: 15,
    marginBottom: 5,
  },
  inputComments: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
    fontSize: 18,
  },
  btnComments: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: "#FF6C00",
    alignSelf: "flex-end",
    marginTop: -45,
    marginRight: 8,
  },
  arrowup: {
    alignSelf: "center",
    paddingTop: 4,
  },
});

export default CommentsScreen;
