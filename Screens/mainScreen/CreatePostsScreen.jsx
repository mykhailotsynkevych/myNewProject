import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
} from "react-native";
import * as MediaLibrary from "expo-media-library";

import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
  AntDesign,
  Feather,
  EvilIcons,
} from "@expo/vector-icons";

const initialState = {
  photo: null,
  name: "",
  location: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [state, setstate] = useState(initialState);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);

  const [cameraOn, setcameraOn] = useState(false);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }

  const btnPublicate = () => {
    // console.log("navigation", navigation);
    navigation.navigate("Публикации", {state});
  };

  return (
    <View style={styles.container}>
      {!cameraOn && (
        <View>
          <View style={styles.fotoContainer}>
            {state.photo && (
              <Image source={{ uri: state.photo }} style={styles.photo} />
            )}
          </View>

          <View style={styles.iconConatiner}>
            <TouchableOpacity
              activeOpacity={0.8}
              // style={styles.toggleCamera}
              // onPress={toggleCameraType}
            >
              <MaterialIcons name="photo-library" size={28} color="#ACB3BF" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              // style={styles.toggleCamera}
              onPress={() => {
                setcameraOn(true);
              }}
            >
              <Feather name="camera" size={28} color="#ACB3BF" />
            </TouchableOpacity>
          </View>

          <View style={styles.form}>
            <TextInput
              value={state.name}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, name: value }))
              }
              placeholder="Название..."
              style={styles.input}
              // onFocus={() => setIsShowKeyboard(true)}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.iconLocation}
              // onPress={toggleCameraType}
            >
              <EvilIcons name="location" size={35} color="#BDBDBD" />
            </TouchableOpacity>
            <TextInput
              value={state.location}
              onChangeText={(value) =>
                setstate((prevState) => ({ ...prevState, location: value }))
              }
              placeholder="Местность..."
              style={styles.inputLocation}
              // onFocus={() => setIsShowKeyboard(true)}
            />

            {state.photo === null ||
            state.location === "" ||
            state.location === "" ? (
              <TouchableOpacity
                // enabled={false}
                activeOpacity={0.8}
                style={styles.button}
                // onPress={btnPublicate}
              >
                <Text style={styles.btnTitle}>Опубликовать</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                // enabled={false}
                activeOpacity={0.8}
                style={styles.activeButton}
                onPress={btnPublicate}
              >
                <Text style={styles.activeBtnTitle}>Опубликовать</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.deleteIcon}
              onPress={() => {
                setstate(initialState);
              }}
            >
              <AntDesign name="delete" size={28} color="#ACB3BF" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {cameraOn && (
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => {
            setCameraRef(ref);
          }}
        >
          <View style={styles.photoView}>
            <TouchableOpacity
              style={styles.takePhotoButton}
              onPress={async () => {
                if (cameraRef) {
                  const { uri } = await cameraRef.takePictureAsync();
                  // console.log(uri)
                  // setPhoto(uri);
                  setstate((prevState) => ({ ...prevState, photo: uri }));
                  setcameraOn(false);
                  await MediaLibrary.createAssetAsync(uri);
                }
              }}
            >
              <View style={styles.takePhotoOut}>
                <View style={styles.takePhotoInner}></View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toggleCamera}
              onPress={toggleCameraType}
            >
              <Ionicons
                name="ios-camera-reverse-outline"
                size={35}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  camera: { flex: 1, margin: 10, borderRadius: 10 },
  fotoContainer: {
    height: "50%",
    margin: 10,
    backgroundColor: "#E8E8E8",
    borderRadius: 5,
    border: 5,
    borderColor: "black",
  },
  iconConatiner: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  photoView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    margin: 15,
  },

  // toggleCamera: {
  //   alignSelf: "flex-end",
  // },

  takePhotoButton: {
    marginRight: 115,
  },

  photo: {
    flex: 1,
    resizeMode: "contain",
  },

  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 60,
    width: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },

  takePhotoInner: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    backgroundColor: "white",
    borderRadius: 50,
  },
  form: {
    justifyContent: "center",
    marginHorizontal: 10,
    marginTop: 30,
  },
  input: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    height: 50,
    paddingLeft: 3,
    // padding: 10,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    // backgroundColor: "#F6F6F6",
    // borderRadius: 8,
    color: "#BDBDBD",
  },
  inputLocation: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    height: 50,
    // padding: 10,
    paddingLeft: 35,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    color: "#BDBDBD",
  },
  iconLocation: {
    marginBottom: -40,
    marginLeft: -5,
  },
  button: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    // marginTop: 10,
    // marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    // marginTop: 10,
    // marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    color: "#BDBDBD",
    fontSize: 18,
  },
  activeBtnTitle: {
    color: "#fff",
    fontSize: 18,
  },
  deleteIcon: {
    marginTop: 55,
    alignSelf: "center",
  },
});

export default CreatePostsScreen;