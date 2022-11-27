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
} from "@expo/vector-icons";

const initialState = {
  photo: null,
  name: "",
  location: "",
};

const CreatePostsScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(initialState.photo);

  const [state, setstate] = useState(initialState);
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

  return (
    <View style={styles.container}>
      {!cameraOn && (
        <View>
          <View style={styles.fotoContainer}>
            {photo && <Image source={{ uri: photo }} style={styles.photo} />}
          </View>

          <View style={styles.iconConatiner}>
            <TouchableOpacity
              activeOpacity={0.8}
              // style={styles.toggleCamera}
              onPress={toggleCameraType}
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
              // onChangeText={(value) =>
              //   setstate((prevState) => ({ ...prevState, email: value }))
              // }
              placeholder="Название..."
              style={styles.input}
              // onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              value={state.location}
              // onChangeText={(value) =>
              //   setstate((prevState) => ({ ...prevState, location: value }))
              // }
              placeholder="Местность..."
 
              style={styles.input}
              // onFocus={() => setIsShowKeyboard(true)}
            />

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.button}
              // onPress={onHome}
            >
              <Text style={styles.btnTitle}>Опубликовать</Text>
            </TouchableOpacity>
                        <TouchableOpacity
              activeOpacity={0.8}
              // style={styles.toggleCamera}
              onPress={() => {
                setcameraOn(true);
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
                  setPhoto(uri);
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
    padding: 10,
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 16,
    // backgroundColor: "#F6F6F6",
    // borderRadius: 8,
    color: "#BDBDBD",
  },
  button: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    marginTop: 27,
    marginBottom: 16,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    color: "#BDBDBD",
    fontSize: 18,
  },
});

export default CreatePostsScreen;
